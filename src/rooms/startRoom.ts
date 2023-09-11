import {collides, Text} from "kontra";
import {Player} from "../entities/player";
import {SmallDagger} from "../entities/weapons/daggers";
import Interactable from "../entities/interactable";
import Room from "./room";
import {getCanvasHeight, getCanvasWidth} from "../utils/utils";
import Teleporter from "../entities/teleporter";
import BattleRoom from "./battleRoom";
import {getRewards} from "../utils/reward-util";
import GameRoom from "./gameRoom";
import Game from "../game";
import CatharPerfect from "../entities/npcs/catharPerfect";

class StartRoom extends GameRoom{
    teleporter: Teleporter
    nextRoom!: Room
    constructor() {
        super();

        this.teleporter = new Teleporter(getCanvasWidth()/2, this.nextRoom);
        this.backgroundObjects.push(this.teleporter);
        this.backgroundObjects.push(Text({x: 12, y: 72, text: "Move: WASD\n\nAttack: Leftclick\n\nDash: Space\n\nInteract: e", font: '16px Arial', color: "white"}))
        this.interactables.push(new Interactable(getCanvasWidth()/2.5, getCanvasHeight()/4, new CatharPerfect(0, 0, this)))
    }

    init(){
        super.init();
        this.addInteractable(new Interactable(getCanvasWidth()/2, getCanvasHeight()/2, new SmallDagger()))
        this.nextRoom = new BattleRoom(getRewards(0, 1)[0]);
    }

    update(){
        super.update();
        if(collides(Player.getInstance(), this.teleporter)){
            Game.getInstance().goToRoom(this.nextRoom)
        }
    }
}


export default StartRoom;