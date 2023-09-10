import {collides, GameObject, GameObjectClass, Sprite} from "kontra";
import Room from "../rooms/room";
import {Reward} from "./reward";
import {centeredAnchor} from "../utils/sprite";
import {wallHeight} from "../utils/utils";
import {Player} from "./player";

class Teleporter extends GameObjectClass{
    constructor(x: number, toRoom: Room, reward?: Reward) {
        super({toRoom: toRoom, reward: reward, x: x, y: wallHeight, anchor: centeredAnchor, width: 80, height: 4});
        this.addChild(Sprite({width: 80, height: 4, color: "white", anchor: centeredAnchor}));

        if(reward){
            const go = GameObject({y: -24, scaleX: 3, scaleY: 3, opacity: 0.7, anchor: centeredAnchor})
            go.addChild(reward)
            this.addChild(go);
        }
    }

    update(){
        super.update();
        if(collides(this, Player.getInstance())){
            this.toRoom.comeHere();
        }
    }
}

export default Teleporter;