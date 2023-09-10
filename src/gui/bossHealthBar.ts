import {Text} from "kontra";
import HealthBar from "./healthBar";
import { Enemy } from "../entities/enemies/enemy";

class BossBar extends HealthBar {
    healthBarWidth: number = 200;
    bossName?: string

    constructor(x: number, y: number, boss: Enemy) {
        super(x, y, 200, 4, boss)
        this.addChild(Text({text: boss.name, font: '16px Verdana', textAlign: 'center', width: this.width}))
    }
}

export default BossBar;