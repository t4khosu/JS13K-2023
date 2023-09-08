import {collides, Sprite, Text, Vector} from "kontra";
import {Player} from "../entities/player";
import {SmallDagger} from "../entities/weapons/daggers";
import Interactable from "../entities/interactable";
import Room from "./room";
import {getCanvasHeight, getCanvasWidth} from "../utils/utils";
import Teleporter from "../entities/teleporter";
import Game from "../game";
import {getVectorBetweenGameObjects} from "../utils/vectors";
import {centeredAnchor} from "../utils/sprite";
import BattleRoom from "./battleRoom";
import {getRewards} from "../utils/reward-util";

class StartRoom extends Room{
    teleporter: Sprite
    constructor(player: Player, game: Game) {
        super(player, game);
        this.components.backgroundObjects.push(Text({x: 12, y: 12
            , text: "Move: WASD\n\nAttack: Leftclick\n\nDash: Space\n\nTake: e", font: '16px Arial', color: "white"}))
        this.teleporter = Sprite({x: getCanvasWidth()/2, y: 0, width: 160, height: 8, color:" white", anchor: centeredAnchor});
        this.components.backgroundObjects.push(this.teleporter);
        this.addInteractable(new Interactable(getCanvasWidth()/2, getCanvasHeight()/2, new SmallDagger()))
    }

    update(){
        super.update();
        if(collides(this.player, this.teleporter)){
            this.game.goToRoom(new BattleRoom(this.player, this.game, getRewards(0)[0]))
        }
    }
}


export default StartRoom;