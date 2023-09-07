import {GameObjectClass, Sprite, Text} from "kontra";
import {Player} from "../../entities/player";
import Room from "../../rooms/room";

export default class StageDisplay extends GameObjectClass {
    text: Text

    constructor(room: Room) {
        super({room: room, x: 700, y: 470});
        this.text = Text({text: `Stage ${room.level}`, font: '17px Verdana', color: "Black"})

        this.addChild(this.text)
    }

    update() {
        super.update();
        this.text.text = `Stage ${this.room.level}`
    }
}
