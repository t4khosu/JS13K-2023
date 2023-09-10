import {getSpriteById} from "../../utils/sprite";
import {Staff} from "../weapons/staffs";
import {Mage} from "./mage";
import ShotgunSpell from "../weapons/spells/shotgunSpell";
import SpellCaster from "../weapons/spells/spellCaster";
import {holyParticleType, iceParticleType} from "../weapons/spells/particles/particleTypes";
import {CircularSpell} from "../weapons/spells/circularSpell";
import SpawnSpell from "../weapons/spells/spawnSpell";
import {Villager} from "./villager";

class Pope extends Mage{
    name: string = "Pope Innocent III"
    speed: number = 2.3
    constructor(x: number, y: number) {
        super(x, y, getSpriteById(1));
        this.handWeapon(new Staff([
            (spellCaster: SpellCaster) => new ShotgunSpell(spellCaster, iceParticleType, 5, 0.2),
            (spellCaster: SpellCaster) => new CircularSpell(spellCaster, holyParticleType, 20, 20, 2),
            (spellCaster: SpellCaster) => {
                return new SpawnSpell(spellCaster, this.room!, () => new Villager(0, 0, 0));
            }
        ]))
        this.initHealth(1)
        this.healthBar.opacity = 0;
    }

    inAttackRange = () => this.distanceToPlayer() <= 300 && this.distanceToPlayer() >= 30;

}

export default Pope;