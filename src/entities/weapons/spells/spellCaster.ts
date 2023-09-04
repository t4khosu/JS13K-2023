import {GameObjectClass} from "kontra";
import {Character} from "../../character";
import {addSpell} from "../../../utils/utils";

class SpellCaster extends GameObjectClass{
    constructor(x: number, y: number, owner: Character, spells: any[]) {
        super({x: x, y: y, owner: owner, spells: spells});
    }

    cast(){
        const spell = new this.spells[0](this);
        addSpell(spell)
    }
}

export default SpellCaster