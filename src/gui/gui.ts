import {GameObjectClass} from "kontra";
import {Player} from "../entities/player";
import PlayerHealthBar from "./components/playerHealthBar";
import Room from "../entities/room";
import BossBar from "./components/bossBar";
import StageDisplay from "./components/stage-display";

class Gui extends GameObjectClass {
    constructor(player: Player, room: Room) {
        super();
        this.addChild(new PlayerHealthBar(player))
        this.addChild(new BossBar(room))
        this.addChild(new StageDisplay(room))
    }
}

export default Gui;