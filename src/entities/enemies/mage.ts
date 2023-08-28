import {Enemy} from "./enemy";
import {randNumber} from "../../utils/utils";
import {getSpriteById} from "../../utils/sprite";

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

    canAttack() {
        return super.canAttack() && this.distanceToPlayer() >= this.attackDistance * 0.4
    }

    moveToPlayer() {
        let v = this.vectorTo(this.player.x, this.player.y)
        let distance = v.length() - this.rangeToPlayer
        if (Math.abs(distance) > 12) this.moveTo(v, distance)
    }
}