import {getSpriteById} from "../../utils/sprite";
import {Weapon} from "./weapon";
import {Character} from "../character";
import {Timer} from "../timer";
import {Spell} from "./spells/spell";
import SimpleSpell from "./spells/simpleSpell";
import SpellCaster from "./spells/spellCaster";

export class Staff extends Weapon {
    postCastTimer?: Timer;
    currentSpell?: Spell;
    width = 1;
    height = 4;
    standardDamage = 0;
    spellCaster?: SpellCaster
    constructor(spells: any[]) {
        super(5, 0, getSpriteById(7));
    }

    setOwner(owner: Character) {
        super.setOwner(owner);
        this.spellCaster = new SpellCaster(-1.5, -3, this.owner, [SimpleSpell])
        this.addChild(this.spellCaster);
    }

    startAttack(target?: Character) {
        if(this.spellCaster === undefined) return;

        super.startAttack(target);
        const spell = this.spellCaster.cast();
        this.postCastTimer = new Timer(spell.getCastTimeout(), () => this.endAttack()).start()
    }

    isCasting = () => this.currentSpell?.isCasting ?? false;

    runAttack() {
        this.postCastTimer?.update();
    }

    endAttack(){
        super.endAttack();
        this.currentSpell = undefined;
    }
}