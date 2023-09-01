import {GameObjectClass} from "kontra";
import {Player} from "../entities/player";
import PlayerHealthBar from "./components/playerHealthBar";

class Gui extends GameObjectClass{
    constructor(player: Player) {
        super({player: player});
        this.addChild(new PlayerHealthBar(player))
    }
}

export default Gui;