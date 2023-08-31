import {Sprite} from "kontra";
import {Character} from "../character";
import {Damageable} from "./damageable";

export class Weapon extends Damageable{
    originX: number;
    originY: number;
    spriteOriginY: number;
    doesWiggle: boolean = false;
    wiggleTime: number = 0;
    wiggleDir: number = 0.8;

    constructor(x: number, y: number, sprite: Sprite) {
        super(x, y, sprite);
        this.originX = x;
        this.originY = y;
        this.spriteOriginY = sprite.y;
    }

    update() {
        super.update();
        if(this.doesWiggle) this.wiggle();
        if(this.isAttacking) this.runAttack();
    }

    startWiggle(){
        this.doesWiggle = true;
        this.wiggleTime = 0;
    }

    endWiggle(){
        this.doesWiggle = false;
        this.sprite.y = this.spriteOriginY;
    }

    wiggle(){
        if(++this.wiggleTime % 7 == 0){
            this.sprite.y += this.wiggleDir;
            this.wiggleDir *= -1;
        }
    }

    tryToAttack(target?: Character){
        if(this.canAttack()) this.startAttack(target);
    }

    canAttack(): boolean {
        return !this.isAttacking;
    }

    startAttack(target?: Character){
        this.endWiggle();
        this.isAttacking = true;
        this.target = target;
    }

    endAttack(){
        this.isAttacking = false;
        this.target = undefined;
    }

    runAttack(){}
}

