import {Spell} from "./spell";
import {HolySpellParticle} from "./particles/holySpellParticle";

class NormalSpell extends Spell{
    startSpell() {
        this.addChild(new HolySpellParticle(0, 0, this));
    }
}

export default NormalSpell;