import {Character} from "./character";
import Room from "../rooms/room";
import {getSpriteById} from "../utils/sprite";

class Npc extends Character{
    monolog: string[] = [
        "I seems like the catholics fled Toulouse seeing their leader die.",
        "Today, you saved many Cathars.",
    ]
    constructor(x: number, y: number, room?: Room) {
        super(x, y, getSpriteById(3), room);
    }

}

export default Npc;