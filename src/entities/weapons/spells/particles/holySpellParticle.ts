import {SpellParticle} from "./spellParticle";
import {Spell} from "../spell";
import {Vector} from "kontra";
import {Character} from "../../../character";

export class HolySpellParticle extends SpellParticle {
    speed = 0.5;
    getDirection: () => Vector;
    rotation: number;

    constructor(x: number, y: number, spell: Spell, getDirection: () => Vector, rotation: number = 0) {
        super(x, y, "#ffffcc", spell)
        this.getDirection = getDirection;
        this.rotation = rotation;
    }

    activate(target?: Character) {
        super.activate(target);
        const direction = this.getDirection()
        const newX = Math.cos(this.rotation)*direction.x - Math.sin(this.rotation)*direction.y;
        const newY = Math.sin(this.rotation)*direction.x + Math.cos(this.rotation)*direction.y;
        this.moveTo(Vector(newX, newY), 2000);
    }
}