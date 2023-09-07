import {Text} from "kontra";
import {Player} from "../entities/player";
import {SmallDagger} from "../entities/weapons/daggers";
import Interactable from "../entities/interactable";
import Room from "./room";

class StartRoom extends Room{
    constructor(player: Player) {
        super(player);
        this.addChild(Text({x: 12, y: 12
            , text: "Move: WASD\n\nAttack: Leftclick\n\nDash: Space\n\nTake: e", font: '16px Arial', color: "white"}))
        this.addChild(player);
        this.addInteractable(new Interactable(player.x, player.y - 200, new SmallDagger()))
    }

    update(dt: number){
        this.interactables = this.interactables.filter(i => {
            i.update();
            return !i.removeFlag
        })
        super.update(dt);
    }

    render(){
        this.interactables.forEach(i => i.render())
        super.render();
    }
}


export default StartRoom;