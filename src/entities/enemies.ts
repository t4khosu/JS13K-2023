import {Character} from "./character";
import {centeredAnchor, getSpriteById} from "../utils";
import {Sprite, Vector} from "kontra";
import {Player} from "./player";
import {Weapon} from "./weapon";
import {Timer} from "./timer";

export class Enemy extends Character {
    moveToDestination: Vector | undefined;
    moveToDir: number = 1;
    player: Player | undefined;
    healthBar: Sprite;
    healthBarWidth: number = 6;
    seeDistance: number = 100;
    attackTimer: Timer;
    aggro: boolean = false;

    constructor(x: number, y: number, sprite: Sprite) {
        super(x, y, sprite);
        this.healthBar = Sprite({anchor: centeredAnchor, x: 0, y: -5, width: 0, height: 1, color: "#ff000099"})
        this.attackTimer = new Timer(50);
        this.addChild(this.healthBar)
    }

    setPlayer(player: Player){
        this.player = player;
    }

    moveTo(x: number, y: number){
        this.moveToDestination = Vector(x, y);
        this.moveToDir = this.x - x <= 0 ? 1 : -1;
    }

    moveToPlayer(){
        let followX = this.player?.dashing ? this.player!.x : this.player!.x + this.posToPlayer() * 40
        this.moveTo(followX, this.player!.y)
    }

    posToPlayer(){
        return this.x - this.player!.x >= 0 ? 1 : -1;
    }

    getNewDir(){
        if(this.aggro){
            return Math.sign(this.x - this.player!.x) < 0 ? 1 : -1;
        }else{
            return this.moveToDir;
        }
    }

    update(){
        super.update();
        this.attackTimer.update();

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
    speed: number = 1.2 + Math.random() * 0.6;
    idleAroundTimer: Timer;
    constructor(x: number, y: number) {
        super(x, y, getSpriteById(0));
        this.seeDistance = 120 + Math.random() * 80;
        this.idleAroundTimer = new Timer(200);
    }

    update(){
        super.update();
        let distanceToPlayer = this.getDistanceTo(this.player!);

        this.aggro = distanceToPlayer < this.seeDistance;

        if(this.aggro){
            this.moveToPlayer();

            if(distanceToPlayer <= 60 && !this.attackTimer.running){
                this.attack();
                this.attackTimer.restart();
            }
        }else{
            this.idleAround();
        }
    }

    idleAround(){
        if(!this.moving){
            if(!this.idleAroundTimer.running){
                this.idleAroundTimer.restart();
            }
            this.idleAroundTimer.update();
            if(!this.idleAroundTimer.running){
                this.moveTo(this.x + 20, this.y + 20);
            }
        }
    }

    getTargets(): Character[] {
        return [this.player!]
    }
}