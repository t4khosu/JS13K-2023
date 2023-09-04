import {Spell} from "./spell";
import {HolySpellParticle} from "./particles/holySpellParticle";
import SpellCaster from "./spellCaster";
import {Vector} from "kontra";

class SimpleSpell extends Spell{
    constructor(spellCaster: SpellCaster) {
        super(spellCaster);
        this.addChild(new HolySpellParticle(0, 0, this, this.getVectorToTarget, 0.0));
        this.addChild(new HolySpellParticle(0, 0, this, this.getVectorToTarget, 0.2));
        this.addChild(new HolySpellParticle(0, 0, this, this.getVectorToTarget, 1));
        this.addChild(new HolySpellParticle(0, 0, this, this.getVectorToTarget, -0.2));
        this.addChild(new HolySpellParticle(0, 0, this, this.getVectorToTarget, -1));
    }
}

export default SimpleSpell;