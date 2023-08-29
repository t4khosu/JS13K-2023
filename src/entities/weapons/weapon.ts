import {Sprite} from "kontra";
import {Character} from "../character";
import {Damageable} from "./damageable";

export class Weapon extends Damageable{
    originX: number;
    originY: number;

    constructor(x: number, y: number, sprite: Sprite) {
        super(x, y, sprite);
        this.originX = x;
        this.originY = y;
    }

    update() {
        super.update();
        if(this.isAttacking) this.runAttack();
    }

    tryToAttack(target?: Character){
        if(this.canAttack()) this.startAttack(target);
    }

    canAttack(): boolean {
        return !this.isAttacking;
    }

    startAttack(target?: Character){
        this.isAttacking = true;
        this.target = target;
    }

    endAttack(){
        this.isAttacking = false;
        this.target = undefined;
    }

    runAttack(){}
}

