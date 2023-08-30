import {Enemy} from "./enemy";
import {randNumber} from "../../utils/utils";
import {getSpriteById} from "../../utils/sprite";
import {Staff} from "../weapons/staffs";
import {imageAssets, Sprite} from "kontra";
import {colorizeImage} from "../../utils/colorize";

export class Mage extends Enemy {
    speed: number = randNumber(1.1);
    rangeToPlayer: number

    constructor(x: number, y: number) {
        super(x, y, getSpriteById(2), 10);
        this.seeDistance = randNumber(350);
        this.rangeToPlayer = this.seeDistance * 0.6;
        this.attackDistance = this.rangeToPlayer + 5
        this.attackTimeoutTimer.setMax(100);
    }

    canMove = () => !(this.weapon as Staff).isCasting();

    inAttackRange = () => this.distanceToPlayer() <= this.attackDistance && this.distanceToPlayer() >= this.attackDistance * 0.5;

    moveToPlayer() {
        let v = this.vectorTo(this.player.x, this.player.y)
        let distance = v.length() - this.rangeToPlayer
        if (Math.abs(distance) > 12) this.moveTo(v, distance)
    }
}