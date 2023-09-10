import {Enemy} from "./enemy";
import {randNumber} from "../../utils/utils";
import {getSpriteById} from "../../utils/sprite";
import {Staff} from "../weapons/staffs";
import {Sprite} from "kontra";
import SpellCaster from "../weapons/spells/spellCaster";
import ShotgunSpell from "../weapons/spells/shotgunSpell";
import {holyParticleType, iceParticleType} from "../weapons/spells/particles/particleTypes";
import {CircularSpell} from "../weapons/spells/circularSpell";
import {Player} from "../player";

export class Mage extends Enemy {
    speed: number = randNumber(1.1);
    rangeToPlayer: number

    constructor(x: number, y: number, sprite?: Sprite) {
        super(x, y, sprite ?? getSpriteById(2));
        this.seeDistance = randNumber(350);
        this.rangeToPlayer = this.seeDistance * 0.6;
        this.attackDistance = this.rangeToPlayer + 5
        this.attackTimeoutTimer.setMax(100);

        this.initHealth(10);

        this.handWeapon(new Staff([
            (spellCaster: SpellCaster) => new ShotgunSpell(spellCaster, iceParticleType, 3, 0.2),
            (spellCaster: SpellCaster) => new CircularSpell(spellCaster, holyParticleType, 4, 8, 6)
        ]))
    }

    canMove(){
        return super.canMove() && !(this.weapon as Staff).isCasting();
    }

    inAttackRange = () => this.distanceToPlayer() <= this.attackDistance && this.distanceToPlayer() >= this.attackDistance * 0.5;

    moveToPlayer() {
        const v = this.vectorTo(Player.getInstance().x, Player.getInstance().y)
        const distance = v.length() - this.rangeToPlayer
        if (Math.abs(distance) > 12) this.moveTo(v, distance)
    }
}