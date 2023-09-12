import {getSpriteById} from "../../utils/sprite";
import {Staff} from "../weapons/staffs";
import {Mage} from "./mage";
import ShotgunSpell from "../weapons/spells/shotgunSpell";
import SpellCaster from "../weapons/spells/spellCaster";
import {yellowParticleType, blueParticleType} from "../weapons/spells/particles/particleTypes";
import {CircularSpell} from "../weapons/spells/circularSpell";
import SpawnSpell from "../weapons/spells/spawnSpell";
import {Villager} from "./villager";
import BattleRoom from "../../rooms/battleRoom";

class Pope extends Mage{
    name: string = "Pope Innocent III"
    speed: number = 2.3
    constructor(x: number, y: number, room: BattleRoom) {
        super(x, y, room, getSpriteById(1));
        this.handWeapon(new Staff([
            (spellCaster: SpellCaster) => new ShotgunSpell(spellCaster, blueParticleType, 5, 0.2, 300),
            (spellCaster: SpellCaster) => new CircularSpell(spellCaster, yellowParticleType, 20, 20, 2),
            (spellCaster: SpellCaster) => {
                return new SpawnSpell(spellCaster, this.room!, () => new Villager(0, 0, room));
            }
        ]))
        this.initHealth(200)
        this.healthBar.opacity = 0;
    }

    inAttackRange = () => this.distanceToPlayer() <= 300 && this.distanceToPlayer() >= 30;

}

export default Pope;