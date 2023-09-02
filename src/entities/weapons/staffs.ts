import {getSpriteById} from "../../utils/sprite";
import {Weapon} from "./weapon";
import {Character} from "../character";
import {Timer} from "../timer";
import {addSpell} from "../../utils/utils";
import {Spell} from "./spells/spell";
import {CircularSpell} from "./spells/circularSpell";
import NormalSpell from "./spells/normalSpell";

export class Staff extends Weapon {
    postCastTimer?: Timer;
    currentSpell?: Spell;
    width = 1;
    height = 4;
    standardDamage = 0;
    constructor() {
        super(5, 0, getSpriteById(7));
    }

    startAttack(target?: Character) {
        super.startAttack(target);
        this.currentSpell = new NormalSpell(this);
        this.currentSpell.startCasting();
        addSpell(this.currentSpell)
        this.postCastTimer = new Timer(this.currentSpell.getCastTimeout(), () => this.endAttack()).start()
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