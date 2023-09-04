import {Damageable} from "../../damageable";
import {Spell} from "../spell";
import {Sprite, Vector} from "kontra";
import {centeredAnchor} from "../../../../utils/sprite";
import {Character} from "../../../character";

export class SpellParticle extends Damageable {
    spell: Spell;
    lifeTime: number;

    isAttacking = false;
    destroyOnCollision = false;

    width = 1;
    height = 1;
    speed = 0.5;

    standardDamage = 1;

    constructor(x: number, y: number, color: string, spell: Spell) {
        super(x, y, Sprite({width: 1, height: 1, color: color, anchor: centeredAnchor}))
        this.lifeTime = spell.particleLifeTime();
        this.spell = spell;
        this.owner = spell.owner;
    }

    update() {
        super.update();
        if (--this.lifeTime == 0) this.removeFlag = true;
    }

    activate(target?: Character) {
        this.isAttacking = true;
        this.destroyOnCollision = true;
    }
}