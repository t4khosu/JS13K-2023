import {Enemy} from "./enemy";
import {getSpriteById} from "../../utils/sprite";
import {Staff} from "../weapons/staffs";
import {Mage} from "./mage";

class Pope extends Mage{
    name: string = "Pope Innocent III"
    speed: number = 2.3
    constructor(x: number, y: number) {
        super(x, y, getSpriteById(1));
        this.handWeapon(new Staff())
        this.initHealth(100)
        this.healthBar.opacity = 0;
    }

    inAttackRange = () => this.distanceToPlayer() <= 300 && this.distanceToPlayer() >= 30;

}

export default Pope;