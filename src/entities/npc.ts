import {Character} from "./character";
import Room from "../rooms/room";
import {getSpriteById} from "../utils/sprite";

class Npc extends Character{
    constructor(x: number, y: number, room?: Room) {
        super(x, y, getSpriteById(3), room);
    }

}

export default Npc;