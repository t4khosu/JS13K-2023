import {GameObjectClass, Text} from "kontra";
import BattleRoom from "../rooms/battleRoom";

export default class StageDisplay extends GameObjectClass {
    text: Text

    constructor(room: BattleRoom) {
        super({room: room, x: 700, y: 20});
        this.text = Text({text: `Stage ${room.level}`, font: '17px Verdana', color: "black"})

        this.addChild(this.text)
    }

    update() {
        super.update();
        this.text.text = `Stage ${this.room.level}`
    }
}
