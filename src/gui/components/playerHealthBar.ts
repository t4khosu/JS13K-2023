import {GameObjectClass, Sprite, Text} from "kontra";
import {Player} from "../../entities/player";

class PlayerHealthBar extends GameObjectClass{
    healthBar: Sprite
    healthBarWidth: number
    text: Text
    constructor(player: Player) {
        super({player: player, x: 18, y: 470});
        this.healthBarWidth = 132;
        this.addChild(Sprite({width: this.healthBarWidth + 4, height: 16, color: "#00000088"}))
        this.healthBar = Sprite({x: 2, y: 2, width: this.healthBarWidth, height: 12, color: "#aa0000"});
        this.text = Text({x: this.healthBarWidth / 2 - 12, y: 3, text: '', font: '10px Verdana', color: "white"})

        this.addChild(this.healthBar, this.text)
    }

    update(){
        super.update();
        this.text.text = `${this.player.health} / ${this.player.maxHealth}`
        this.healthBar.width = this.healthBarWidth * (this.player.health / this.player.maxHealth)
    }
}

export default PlayerHealthBar;