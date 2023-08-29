import {getSpriteById} from "../../utils/sprite";
import {Weapon} from "./weapon";
import {CircularSpell} from "./spells";
import {Character} from "../character";
import {Timer} from "../timer";
import {addSpell} from "../../utils/utils";

export class Staff extends Weapon {
    postCastTimer?: Timer;
    constructor() {
        super(5, 0, getSpriteById(7));
        this.width = 1;
        this.height = 4;
        this.damage = 0;
    }

    startAttack(target?: Character) {
        super.startAttack(target);
        const spell = new CircularSpell(this);
        spell.start();
        addSpell(spell)
        this.postCastTimer = new Timer(spell.getCastTimeout(), () => this.endAttack()).start()
    }

    tipX = () => this.world.x - 7 * this.owner!.lookingDirection;

    tipY = () => this.world.y - 14;

    runAttack() {
        this.postCastTimer?.update();
    }
}