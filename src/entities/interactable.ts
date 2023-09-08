import {Entity} from "./entity";
import {centeredAnchor} from "../utils/sprite";
import {Player} from "./player";
import {Weapon} from "./weapons/weapon";
import {Reward} from "./reward";

class Interactable extends Entity{
    constructor(x: number, y: number, entity: Entity) {
        super({x: x, y: y, entity: entity, anchor: centeredAnchor, scaleX: 4, scaleY: 4});
        this.addChild(entity);
    }

    interactWith(player: Player){
        if(this.entity instanceof Weapon){
            player.handWeapon(this.entity)
            this.removeFlag = true;
        }
        if(this.entity instanceof Reward){
            player.addReward([this.entity])
            this.removeFlag = true;
        }
    }
}

export default Interactable;