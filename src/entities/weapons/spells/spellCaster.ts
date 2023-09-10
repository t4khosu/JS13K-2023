import {GameObjectClass, randInt, Sprite} from "kontra";
import {Character} from "../../character";
import {Spell} from "./spell";
import Game from "../../../game";

class SpellCaster extends GameObjectClass{
    constructor(x: number, y: number, owner: Character, spellFactories: any[]) {
        super({x: x, y: y, owner: owner, spellFactories: spellFactories});
    }

    cast(): Spell{
        const spell = this.spellFactories[randInt(0, this.spellFactories.length-1)](this).start();
        Game.getInstance().currentRoom.addSpell(spell);
        return spell;
    }
}

export default SpellCaster