import {Character} from "./character";
import {centeredAnchor, getRandomVecDir, getSpriteById, randNumAround} from "../utils";
import {Sprite, Vector} from "kontra";
import {Player} from "./player";
import {Damageable, Weapon} from "./weapon";
import {Timer} from "./timer";

export class Enemy extends Character {
    player!: Player;
    healthBar: Sprite;
    healthBarWidth: number = 6;
    seeDistance: number = 100;
    aggro: boolean = false;
    attackDistance: number = 60;

    idleTimer = new Timer(randNumAround(200), () => {
        this.moveTo(getRandomVecDir(), randNumAround(60));
        this.idleTimer.setMax(randNumAround(200));
    }, true).start();


    constructor(x: number, y: number, sprite: Sprite, health: number) {
        super(x, y, sprite, health);
        this.healthBar = Sprite({anchor: centeredAnchor, y: -5, height: 1, color: "#ff000099"})
        this.addChild(this.healthBar)
    }

    update(){
        super.update();
        if(this.aggro){
            this.updateAggro();
        }else{
            this.updateIdle();
        }
    }

    updateAggro(){
        if(this.distanceToPlayer() >= this.seeDistance && !this.moving){
            this.idleTimer.start();
            this.aggro = false;
        }

        if(this.distanceToPlayer() <= this.attackDistance){
            this.attack();
        }

        if(this.distanceToPlayer() <= this.seeDistance){
            this.moveToPlayer();
        }
    }

    updateIdle(){
        this.idleTimer.update();
        if(this.distanceToPlayer() <= this.seeDistance){
            this.aggro = true;
        }
    }

    distanceToPlayer = () => this.distanceTo(this.player!);

    targets(): Character[] {
        return [this.player!]
    }

    moveToPlayer(){
        let xDestination
        let followX = this.player?.dashing ? this.player!.x : this.player!.x + this.playerDirection() * 40
        this.moveTo(Vector(followX, this.player!.y))
    }

    playerDirection(){
        return Math.sign(this.player!.x - this.x);
    }

    getLookingDirection(){
        return this.aggro ? this.playerDirection() : super.getLookingDirection();
    }

    getsHitBy(damageable: Damageable){
        super.getsHitBy(damageable);
        this.healthBar.width = (this.health / this.maxHealth) * this.healthBarWidth;
    }
}
export class Villager extends Enemy {
    speed: number = randNumAround(1.4);
    seeDistance: number = randNumAround(160);
    constructor(x: number, y: number) {
        super(x, y, getSpriteById(0), 20);
    }
}

export class Mage extends Enemy {
    speed: number = randNumAround(1.1);
    rangeToPlayer: number;

    constructor(x: number, y: number) {
        super(x, y, getSpriteById(2), 20);
        this.seeDistance = randNumAround(300);
        this.rangeToPlayer = this.seeDistance * 0.6;
        this.attackDistance = this.rangeToPlayer
    }

    update(){
        super.update();
        console.log(this.aggro)
    }

    moveToPlayer(){
        let v = Vector(this.player.x - this.x, this.player.y - this.y)
        let goalDistToPlayer = v.length() - this.rangeToPlayer
        let p = this.getNextPosition(v.normalize(), goalDistToPlayer)

        this.moveTo(p.x, p.y)
    }
}