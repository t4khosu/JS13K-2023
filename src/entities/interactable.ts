import {Entity} from "./entity";
import {centeredAnchor} from "../utils/sprite";
import {Player} from "./player";
import {Weapon} from "./weapons/weapon";

class Interactable extends Entity{
    constructor(x: number, y: number, entity: Entity) {
        super({x: x, y: y, entity: entity, anchor: centeredAnchor, scaleX: 5, scaleY: 5});
        this.addChild(entity);
    }

    interactWith(player: Player){
        if(this.entity instanceof Weapon){
            player.handWeapon(this.entity)
            this.removeFlag = true;
        }
    }
}

export default Interactable;