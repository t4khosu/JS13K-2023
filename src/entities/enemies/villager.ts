import {Enemy} from "./enemy";
import {randNumber} from "../../utils/utils";
import {getSpriteById} from "../../utils/sprite";
import {PenColor} from "../../utils/colorize";
import {BigDagger, SmallDagger} from "../weapons/daggers";

const levelToColor: any = {
    0: PenColor.Green,
    1: PenColor.Blue,
    2: PenColor.Red,
}

export class Villager extends Enemy {
    params: any = {
        speed: [2.1, 2.3, 2.5],
        attackTimeout: [90, 70, 50],
        health: [15, 20, 30],
        seeDistance: [160, 180, 250]
    }

    constructor(x: number, y: number, level: number = 0) {
        super(x, y, getSpriteById(0, levelToColor[level]));

        this.speed = randNumber(this.params.speed[level]);
        this.seeDistance = randNumber(this.params.seeDistance[level]);

        this.attackTimeoutTimer.setMax(this.params.attackTimeout[level]);
        this.initHealth(this.params.health[level]);

        this.armCanRotate = level > 0;

        const weapon = level == 2 ? new BigDagger() : new SmallDagger();

        if(level > 0) {
            weapon.holdingDistance = 5;
            weapon.stabbingDistance = 8;
        }

        this.handWeapon(weapon)
    }
}