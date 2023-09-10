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

class StartRoom extends GameRoom{
    teleporter: Teleporter
    nextRoom!: Room
    constructor(player: Player) {
        super(player);

        this.teleporter = new Teleporter(getCanvasWidth()/2, this.nextRoom, player);
        this.components.backgroundObjects.push(this.teleporter);
        this.components.backgroundObjects.push(Text({x: 12, y: 72, text: "Move: WASD\n\nAttack: Leftclick\n\nDash: Space\n\nTake: e", font: '16px Arial', color: "white"}))
        
    }

    init(){
        super.init();
        this.addInteractable(new Interactable(getCanvasWidth()/2, getCanvasHeight()/2, new SmallDagger()))
        this.nextRoom = new BattleRoom(this.player!, getRewards(0, 1)[0]);
    }

    update(){
        super.update();
        if(collides(this.player!, this.teleporter)){
            Game.getInstance().goToRoom(this.nextRoom)
        }
    }
}


export default StartRoom;