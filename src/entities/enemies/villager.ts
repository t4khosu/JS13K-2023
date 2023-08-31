import {Enemy} from "./enemy";
import {randNumber} from "../../utils/utils";
import {getSpriteById} from "../../utils/sprite";

export class Villager extends Enemy {
    speed: number = randNumber(1.6);
    seeDistance: number = randNumber(160);

    constructor(x: number, y: number) {
        super(x, y, getSpriteById(0));
        this.attackTimeoutTimer.setMax(90);
        this.initHealth(10);
    }
}