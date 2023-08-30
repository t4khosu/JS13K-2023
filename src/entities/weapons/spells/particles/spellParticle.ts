import {Damageable} from "../../damageable";
import {Spell} from "../spell";
import {Sprite, Vector} from "kontra";
import {centeredAnchor} from "../../../../utils/sprite";

export class SpellParticle extends Damageable {
    spell: Spell;
    lifeTime: number;

    isAttacking = true;
    destroyOnCollision = true;

    width = 1;
    height = 1;
    speed = 0.5;


    constructor(x: number, y: number, color: string, spell: Spell) {
        super(x, y, Sprite({width: 1, height: 1, color: color, anchor: centeredAnchor}))
        this.lifeTime = spell.particleLifeTime();
        this.spell = spell;
        this.owner = spell.staff.owner;
    }

    update() {
        super.update();
        if (--this.lifeTime == 0) this.removeFlag = true;
    }

    activate() {
        this.moveToTarget();
    }

    moveToTarget() {
        this.moveTo(this.vectorToTarget(), 2000);
    }

    vectorToTarget() {
        return Vector(this.spell.staff.target!.world.x - this.world.x, this.spell.staff.target!.world.y - this.world.y);
    }
}