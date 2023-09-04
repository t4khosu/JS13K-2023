import {getSpriteById} from "../../utils/sprite";
import {Weapon} from "./weapon";
import {Character} from "../character";
import {Timer} from "../timer";
import {addSpell} from "../../utils/utils";
import {Spell} from "./spells/spell";
import {CircularSpell} from "./spells/circularSpell";
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
        this.addChild(this.spellCaster)
    }

    startAttack(target?: Character) {
        if(this.spellCaster === undefined) return;

        super.startAttack(target);
        this.spellCaster.cast();
        this.postCastTimer = new Timer(30, () => this.endAttack()).start()
    }

    createSpell(){
    }

    isCasting = () => this.currentSpell !== undefined && !this.currentSpell.finishedCasting;

    tipX = () => this.world.x - 7 * this.owner!.lookingDirection;

    tipY = () => this.world.y - 14;

    runAttack() {
        this.postCastTimer?.update();
    }

    endAttack(){
        super.endAttack();
        this.currentSpell = undefined;
    }
}