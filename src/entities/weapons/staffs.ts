import {getSpriteById} from "../../utils/sprite";
import {addSpell} from "../../utils/utils";
import {Weapon} from "./weapon";
import {Spell} from "./spells";
import {Timer} from "../timer";
import {Character} from "../character";

export class Staff extends Weapon {
    castTimer: Timer;
    constructor(castTime: number) {
        super(5, 0, getSpriteById(7));
        this.width = 1;
        this.height = 4;
        this.damage = 0;

        this.castTimer = new Timer(castTime)
    }

    startAttack(target?: Character) {
        super.startAttack(target);
        this.castTimer.start();
    }

    runAttack() {
        this.castTimer.update();
        if(this.castTimer.isActive) return;

        this.castSpell();
        this.endAttack();
    }

    castSpell(){
        addSpell(new Spell(this.world.x - this.owner!.lookingDirection * 6 * this.scaleX, this.world.y - 12, this.owner!, this.target!));
    }
}