import {GameObjectClass, Sprite} from "kontra";
import {Character} from "../../character";
import {Spell} from "./spell";
import {addSpell} from "../../../utils/spellsCollection";

class SpellCaster extends GameObjectClass{
    constructor(x: number, y: number, owner: Character, spellClasses: any[]) {
        super({x: x, y: y, owner: owner, spellClasses: spellClasses});
    }

    cast(): Spell{
        const spell = new this.spellClasses[0](this);
        addSpell(spell)
        return spell;
    }
}

export default SpellCaster