import {Text} from "kontra";
import {Player} from "../entities/player";
import HealthBar from "./healthBar";

class PlayerHealthBar extends HealthBar{
    text: Text

    constructor(x: number, y: number, player: Player) {
        super(x, y, 132, 12, player);
        this.text = Text({width: this.width, text: '', font: '11px Verdana', color: "white", textAlign: "center"})
        this.addChild(this.text)
    }

    update(){
        super.update();
        this.text.text = `${this.character.health} / ${this.character.maxHealth}`
    }
}

export default PlayerHealthBar;