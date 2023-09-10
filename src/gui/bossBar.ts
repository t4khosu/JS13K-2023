import {GameObjectClass, Sprite, Text} from "kontra";
import {centeredAnchor} from "../utils/sprite";
import Room from "../rooms/room";

class BossBar extends GameObjectClass {
    healthBar: Sprite;
    healthBarWidth: number = 200;
    text: Text;
    bossName?: string

    constructor(room?: Room) {
        super({room: room, x: 390, y: 16});
        this.healthBar = Sprite({anchor: centeredAnchor, y: 14, height: 4, color: "#ff000099"})
        this.text = Text({text: "", font: '16px Verdana', textAlign: 'right', anchor: centeredAnchor})
        this.addChild(this.healthBar, this.text)
    }

    update() {
        super.update()
        if (this.room.boss !== undefined) {
            this.healthBar.width = (this.room.boss.health / this.room.boss.maxHealth) * this.healthBarWidth;
            if (this.bossName === undefined) {
                this.bossName = this.room.boss.name
                this.text.text = this.room.boss.name
            }
        } else {
            this.bossName = undefined
        }
    }

    render() {
        if (this.room.boss !== undefined) super.render();
    }
}

export default BossBar;