import {Spell} from "./spell";
import {HolySpellParticle} from "./particles/holySpellParticle";
import SpellCaster from "./spellCaster";

class SimpleSpell extends Spell{
    particleNumber: number
    angle: number

    constructor(spellCaster: SpellCaster) {
        super(spellCaster);
        this.particleNumber = 3;
        this.angle = 3;
        this.addChild(new HolySpellParticle(0, 0, this));
        this.addChild(new HolySpellParticle(0, 0, this));
        this.addChild(new HolySpellParticle(0, 0, this));
    }
}

export default SimpleSpell;