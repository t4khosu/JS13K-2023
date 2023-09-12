import {GameObjectClass, Sprite} from "kontra";
import {centeredAnchor, getSpriteById} from "../utils/sprite";
import {PenColor} from "../utils/colorize";
import {StatusAttributes} from "./status-attributes";
import {Entity} from "./entity";
import {MAX_HEALTH_REWARD, RewardStatus} from "../utils/reward-util";
import {Character} from "./character";

export type StatusReward = Partial<StatusAttributes>;


class Reward extends GameObjectClass {
    sprite?: Sprite;
    oldGod: boolean;
    text?: string;

    constructor(status?: RewardStatus, iconId?: number, text?: string, oldGod: boolean = false) {
        super({status: status, anchor: centeredAnchor})
        this.addChild(getSpriteById(iconId!, PenColor.None));
        this.text = text;
        this.oldGod = oldGod;
    }

    getText(){
        return `A Gift from the ${this.oldGod ? "old" : "new"} God.\n\n${this.text}`
    }
}

class HealthReward extends Reward{
    constructor() {
        super(undefined, 10)
    }

    apply(character: Character){
        character.health += 50;
    }
}

export { Reward, HealthReward }