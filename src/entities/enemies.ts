import {Character} from "./character";
import {getSpriteById} from "../utils";
import {Sprite, Vector} from "kontra";
import {Player} from "./player";
import {Weapon} from "./weapon";

export class Enemy extends Character {
    moveToDestination: Vector | undefined;
    player: Player | undefined;
    healthBar: Sprite;
    healthBarWidth: number = 6;

    constructor(x: number, y: number, sprite: Sprite) {
        super(x, y, sprite);
        this.healthBar = Sprite({anchor: {x: 0.5, y: 0.5}, x: 0, y: -6, width: 0, height: 1, color: "#ff000099"})
        this.addChild(this.healthBar)
    }

    setPlayer(player: Player){
        this.player = player;
    }

    moveTo(x: number, y: number){
        this.moveToDestination = Vector(x, y);
    }

    moveToPlayer(){
        let followX = this.player?.dashing ? this.player!.x : this.player!.x + this.posToPlayer() * 40
        this.moveTo(followX, this.player!.y)
    }

    posToPlayer(){
        return this.x - this.player!.x >= 0 ? 1 : -1;
    }

    dirRelativeTo = (xx: number) => Math.sign(this.x - this.player!.x) < 0 ? 1 : -1;

    update(){
        super.update();
        if(this.moveToDestination){
            if(this.moveToDestination.distance(Vector(this.x, this.y)) > this.speed){
                this.moving = true;
                let goTo = Vector(this.moveToDestination.x - this.x, this.moveToDestination.y - this.y).normalize()
                this.move(goTo, this.speed);
            }else{
                this.x = this.moveToDestination.x;
                this.y = this.moveToDestination.y;
                this.moving = false;
            }
        }
    }

    hitBy(weapon: Weapon){
        super.hitBy(weapon);
        this.healthBar.width = (this.health / this.maxHealth) * this.healthBarWidth
    }
}
export class Villager extends Enemy {
    speed: number = 1.6;
    constructor(x: number, y: number) {
        super(x, y, getSpriteById(0));
    }

    update(){
        super.update();
        this.moveToPlayer();

        if(this.getDistanceTo(this.player!) <= 60){
            this.attack();
        }
    }
}