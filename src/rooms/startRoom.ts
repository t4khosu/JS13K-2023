import {collides, Sprite, Text, Vector} from "kontra";
import {Player} from "../entities/player";
import {SmallDagger} from "../entities/weapons/daggers";
import Interactable from "../entities/interactable";
import Room from "./room";
import {getCanvasHeight, getCanvasWidth, wallHeight} from "../utils/utils";
import Teleporter from "../entities/teleporter";
import Game from "../game";
import {getVectorBetweenGameObjects} from "../utils/vectors";
import {centeredAnchor} from "../utils/sprite";
import BattleRoom from "./battleRoom";
import {getRewards} from "../utils/reward-util";

class StartRoom extends Room{
    teleporter: Teleporter
    nextRoom!: Room
    constructor(player: Player, game: Game) {
        super(player, game);
        this.components.backgroundObjects.push(Text({x: 12, y: 72
            , text: "Move: WASD\n\nAttack: Leftclick\n\nDash: Space\n\nTake: e", font: '16px Arial', color: "white"}))
        this.teleporter = new Teleporter(getCanvasWidth()/2, this.nextRoom, player);
        this.components.backgroundObjects.push(this.teleporter);
        this.addInteractable(new Interactable(getCanvasWidth()/2, getCanvasHeight()/2, new SmallDagger()))
    }

    reset(){
        this.nextRoom = new BattleRoom(this.player, this.game, getRewards(0)[0]);
    }

    update(){
        super.update();
        if(collides(this.player, this.teleporter)){
            this.game.goToRoom(this.nextRoom)
        }
    }
}


export default StartRoom;