import {Character} from "./character";
import Room from "../rooms/room";
import {getSpriteById} from "../utils/sprite";

class Npc extends Character{
    monolog: string[] = [
        "I seems like the catholics fled Toulouse seeing their leader die.",
        "With the might bestowed upon me as a Cathar Perfect",
        "I will make a great exception and hold a consolamentum for you",
        "May you achieve your deserved salvation."
    ]
    constructor(x: number, y: number, room?: Room) {
        super(x, y, getSpriteById(3), room);
    }
}

export default Npc;