import { Sprite } from "kontra";
import { Player } from "../entities/player";
import PlayerHealthBar from "../gui/playerHealthBar";
import { getCanvasHeight, getCanvasWidth, wallHeight } from "../utils/utils";
import Room from "./room";

class GameRoom extends Room{
    player: Player

    constructor(player: Player){
        super();
        this.player = player;
        this.components.player = [player]
        this.gui.push(new PlayerHealthBar(20, getCanvasHeight() - 30, player))
        this.backgroundObjects.push(Sprite({width: getCanvasWidth(), height: wallHeight, color: "#555"}))
    }

    init(){
        this.player.setRoom(this);
        this.player.setPos(getCanvasWidth() / 2, getCanvasHeight() * 0.8)
    }
}

export default GameRoom;