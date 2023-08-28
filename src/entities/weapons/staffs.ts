import {getSpriteById} from "../../utils/sprite";
import {Vector} from "kontra";
import {addSpell} from "../../utils/utils";
import {Weapon} from "./weapon";
import {Spell} from "./spells";

export class Staff extends Weapon {
    constructor() {
        super(5, 0, getSpriteById(7));
        this.width = 4;
        this.height = 1;
        this.damage = 0;
    }

    update() {
        super.update();
        if (this.isAttacking) {
            const spellX = this.world.x;
            const spellY = this.world.y - 6;
            const direction = Vector(this.target!.world.x - spellX, this.target!.world.y - spellY)

            const spell = new Spell(spellX, spellY, direction, this.owner!);
            addSpell(spell);
            this.isAttacking = false;
        }
    }
}