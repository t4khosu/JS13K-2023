import {GameObjectClass, Sprite} from "kontra";
import Room from "../rooms/room";

class Teleporter extends GameObjectClass{
    constructor(toRoom: Room) {
        super({toRoom: toRoom});
        this.addChild(Sprite({x: 300, y: 100, width: 20, height: 20, color: "white"}));
    }
}

export default Teleporter;