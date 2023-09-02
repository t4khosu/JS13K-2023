import {Enemy} from "./enemy";
import {randNumber} from "../../utils/utils";
import {getSpriteById} from "../../utils/sprite";
import {Staff} from "../weapons/staffs";
import {Sprite} from "kontra";

export class Mage extends Enemy {
    speed: number = randNumber(1.1);
    rangeToPlayer: number

    constructor(x: number, y: number, sprite?: Sprite) {
        super(x, y, sprite ?? getSpriteById(2));
        this.seeDistance = randNumber(350);
        this.rangeToPlayer = this.seeDistance * 0.6;
        this.attackDistance = this.rangeToPlayer + 5
        this.attackTimeoutTimer.setMax(100);

        this.initHealth(10);
    }

    canMove = () => !(this.weapon as Staff).isCasting();

    inAttackRange = () => this.distanceToPlayer() <= this.attackDistance && this.distanceToPlayer() >= this.attackDistance * 0.5;

    moveToPlayer() {
        let v = this.vectorTo(this.player.x, this.player.y)
        let distance = v.length() - this.rangeToPlayer
        if (Math.abs(distance) > 12) this.moveTo(v, distance)
    }
}