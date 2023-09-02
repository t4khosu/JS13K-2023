import {Enemy} from "./enemy";
import {getSpriteById} from "../../utils/sprite";
import {Staff} from "../weapons/staffs";

class Pope extends Enemy{
    name: string = "Pope Innocent III"
    constructor(x: number, y: number) {
        super(x, y, getSpriteById(1));
        this.handWeapon(new Staff())
        this.initHealth(100)
        this.healthBar.opacity = 0;
    }
}

export default Pope;