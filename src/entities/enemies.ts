import {Character} from "./character";
import {centeredAnchor, getRandomVecDir, getSpriteById, randNumAround} from "../utils";
import {Sprite, Vector} from "kontra";
import {Player} from "./player";
import {Weapon} from "./weapon";
import {Timer} from "./timer";

export class Enemy extends Character {
    player!: Player;
    healthBar: Sprite;
    healthBarWidth: number = 6;
    seeDistance: number = 100;
    aggro: boolean = false;
    attackDistance: number = 60;

    idleTimer = new Timer(randNumAround(200), () => {
        const destination = this.getNextPosition(getRandomVecDir(), randNumAround(60));
        this.moveTo(destination.x, destination.y);
        this.idleTimer.setMax(randNumAround(200));
    }, true).start();

    attackTimer = new Timer(60, () => {
        if(this.getDistanceToPlayer() <= this.attackDistance){
            this.attack();
        }
    }, true).start();

    constructor(x: number, y: number, sprite: Sprite) {
        super(x, y, sprite, 20);
        this.healthBar = Sprite({anchor: centeredAnchor, x: 0, y: -5, width: 0, height: 1, color: "#ff000099"})
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

    updateIdle(){
        this.idleTimer.update();
        if(this.getDistanceToPlayer() <= this.seeDistance){
            this.aggro = true;
        }
    }

    updateAggro(){
        this.attackTimer.update();
        if(this.getDistanceToPlayer() <= this.seeDistance){
            this.moveToPlayer();
        }
        if(this.getDistanceToPlayer() >= this.seeDistance && !this.moving){
            this.idleTimer.start();
            this.aggro = false;
        }
    }

    getDistanceToPlayer = () => this.distanceTo(this.player!);

    getTargets(): Character[] {
        return [this.player!]
    }

    moveToPlayer(){
        let followX = this.player?.dashing ? this.player!.x : this.player!.x + this.posToPlayer() * 40
        this.moveTo(followX, this.player!.y)
    }

    posToPlayer(){
        return this.x - this.player!.x >= 0 ? 1 : -1;
    }

    getTargetDir(){
        if(this.aggro){
            return Math.sign(this.x - this.player!.x) < 0 ? 1 : -1;
        }else{
            return this.moveToDir;
        }
    }

    onGettingAttackedBy(weapon: Weapon){
        super.onGettingAttackedBy(weapon);
        this.healthBar.width = (this.health / this.maxHealth) * this.healthBarWidth
    }
}
export class Villager extends Enemy {
    speed: number = randNumAround(1.4);
    constructor(x: number, y: number) {
        super(x, y, getSpriteById(0));
        this.seeDistance = randNumAround(160);
    }
}

export class Mage extends Enemy {
    speed: number = randNumAround(1.1);
    rangeToPlayer: number;

    constructor(x: number, y: number) {
        super(x, y, getSpriteById(2));
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