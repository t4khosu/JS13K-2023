import {Character} from "./character";
import {getRandomVecDir, randNumber} from "../utils/utils";
import {Sprite, Vector} from "kontra";
import {Player} from "./player";
import {Damageable} from "./weapon";
import {Timer} from "./timer";
import {centeredAnchor, getSpriteById} from "../utils/sprite";

export class Enemy extends Character {
    player!: Player;
    healthBar: Sprite;
    healthBarWidth: number = 6;
    seeDistance: number = 100;
    aggro: boolean = false;
    attackDistance: number = 60;

    idleTimer = new Timer(randNumber(200), () => {
        this.moveTo(getRandomVecDir(), randNumber(60));
        this.idleTimer.setMax(randNumber(200));
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

        if(this.canAttack()){
            this.attack(this.player);
        }

        if(this.distanceToPlayer() <= this.seeDistance){
            this.moveToPlayer();
        }
    }

    canAttack(){
        return this.distanceToPlayer() <= this.attackDistance;
    }

    updateIdle(){
        this.idleTimer.update();
        if(this.distanceToPlayer() <= this.seeDistance){
            this.aggro = true;
        }
    }

    distanceToPlayer = () => this.distanceTo(this.player);

    targets(): Character[] {
        return [this.player!]
    }

    moveToPlayer(){
        this.movingTo = Vector(this.player.x - this.playerDirection() * 38, this.player.y)
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
    speed: number = randNumber(1.4);
    seeDistance: number = randNumber(160);
    constructor(x: number, y: number) {
        super(x, y, getSpriteById(0), 15);
    }
}

export class Mage extends Enemy {
    speed: number = 0;
    rangeToPlayer: number

    constructor(x: number, y: number) {
        super(x, y, getSpriteById(2), 50);
        this.seeDistance = randNumber(350);
        this.rangeToPlayer = this.seeDistance * 0.6;
        this.attackDistance = this.rangeToPlayer + 5
        this.attackTimeoutTimer.setMax(100);
    }

    update(){
        super.update();
    }

    canAttack(){
        return super.canAttack() && this.distanceToPlayer() >= this.attackDistance * 0.4
    }

    moveToPlayer(){
        let v = this.vectorTo(this.player.x, this.player.y)
        let distance = v.length() - this.rangeToPlayer
        if(Math.abs(distance) > 12) this.moveTo(v, distance)
    }
}