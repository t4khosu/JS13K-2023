import GameRoom from "./gameRoom";
import Npc from "../entities/npc";
import {getCanvasHeight, getCanvasWidth} from "../utils/utils";
import Interactable from "../entities/interactable";

class WinRoom extends GameRoom{
    constructor() {
        super();
        this.interactables.push(new Interactable(getCanvasWidth()/2, getCanvasHeight()/2, new Npc(0, 0, this)))
    }
}

export default WinRoom;