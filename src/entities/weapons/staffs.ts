import {getSpriteById} from "../../utils/sprite";
import {Weapon} from "./weapon";
import {CircularSpell} from "./spells/spells";
import {Character} from "../character";
import {Timer} from "../timer";
import {addSpell} from "../../utils/utils";
import {Spell} from "./spells/spell";

export class Staff extends Weapon {
    postCastTimer?: Timer;
    currentSpell?: Spell;
    constructor() {
        super(5, 0, getSpriteById(7));
        this.width = 1;
        this.height = 4;
        this.damage = 0;
    }

    startAttack(target?: Character) {
        super.startAttack(target);
        this.currentSpell = new CircularSpell(this);
        this.currentSpell.start();
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

    update(){
        super.update();
        console.log(this.isAttacking)
    }
}