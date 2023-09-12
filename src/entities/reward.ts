import {GameObjectClass, Sprite} from "kontra";
import {centeredAnchor, getSpriteById} from "../utils/sprite";
import {PenColor} from "../utils/colorize";
import {StatusAttributes} from "./status-attributes";
import {Entity} from "./entity";

export type StatusReward = Partial<StatusAttributes>;

export class Reward extends GameObjectClass {
    sprite?: Sprite;

    constructor(status: StatusReward, iconId: number) {
        super({status: status, iconId: iconId, anchor: centeredAnchor})
        this.addChild(getSpriteById(this.iconId, PenColor.None));
    }
}