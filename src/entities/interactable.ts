import {Entity} from "./entity";
import {centeredAnchor} from "../utils/sprite";
import {Player} from "./player";
import {Weapon} from "./weapons/weapon";
import {Reward} from "./reward";
import {getVectorBetweenGameObjects} from "../utils/vectors";
import Npc from "./npc";
import Game from "../game";

class Interactable extends Entity{
    entity: Entity
    constructor(x: number, y: number, entity: Entity) {
        super({x: x, y: y, entity: entity, anchor: centeredAnchor});
        this.scaleX = entity.scaleX > 1 ? 1 : 4;
        this.scaleY = entity.scaleY > 1 ? 1 : 4;
        this.entity = entity;
        this.addChild(entity);
    }

    entityDistanceFrom(player: Player){
        return getVectorBetweenGameObjects(this.entity, player).length();
    }

    interactWith(player: Player){
        if(this.entity instanceof Weapon){
            player.handWeapon(this.entity)
            this.removeFlag = true;
        }
        if(this.entity instanceof Reward){
            player.collectReward(this.entity)
            this.removeFlag = true;
        }
        if(this.entity instanceof Npc){
            Game.getInstance().startChat(this.entity.monolog)
        }
    }
}

export default Interactable;