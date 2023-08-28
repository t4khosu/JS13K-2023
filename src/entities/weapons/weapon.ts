import {Sprite} from "kontra";
import {Character} from "../character";
import {Damageable} from "./damageable";

export class Weapon extends Damageable{
    originX: number;
    originY: number;
    isAttacking: boolean = false;
    attackFromX!: number;
    attackFromY!: number;

    constructor(x: number, y: number, sprite: Sprite) {
        super(x, y, sprite);
        this.originX = x;
        this.originY = y;
    }

    attack(target?: Character){
        this.isAttacking = true;
        this.target = target;
        this.attackFromX = this.x;
        this.attackFromY = this.y;
    }
}

