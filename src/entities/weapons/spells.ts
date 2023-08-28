import {Damageable} from "./damageable";
import {Sprite, Vector} from "kontra";
import {Character} from "../character";
import {centeredAnchor} from "../../utils/sprite";

export class Spell extends Damageable {
    speed: number = 4;
    lifeTime: number = 70;

    constructor(x: number, y: number, direction: Vector, owner: Character) {
        super(x, y, Sprite({width: 1, height: 1, color: "#ffffbbdd", anchor: centeredAnchor}))
        this.destroyOnCollision = true;
        this.isAttacking = true;
        this.owner = owner;
        this.setScale(8, 8)
        this.width = 1;
        this.height = 1;
        this.moveTo(direction, this.speed * this.lifeTime)
    }

    update() {
        super.update();
        if (--this.lifeTime <= 0) this.removeFlag = true;
    }
}