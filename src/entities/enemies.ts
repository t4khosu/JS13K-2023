import {Character} from "./character";
import {getSpriteById} from "../utils";

export class Villager extends Character {
    constructor(x: number, y: number) {
        super(x, y, getSpriteById(0));
    }
}