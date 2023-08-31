import {SpellParticle} from "./spellParticle";
import {Spell} from "../spell";

export class HolySpellParticle extends SpellParticle {
    speed = 0.6;

    constructor(x: number, y: number, spell: Spell) {
        super(x, y, "#ffffcc", spell)
    }
}