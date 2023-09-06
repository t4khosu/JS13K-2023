import {Spell} from "../entities/weapons/spells/spell";

let activeSpells: Spell[] = []

function addSpell(spell: Spell){
    activeSpells.push(spell);
}

function renderSpells(){
    activeSpells.forEach(s => s.render());
}

function updateSpells(){
    activeSpells = activeSpells.filter(s => {
        s.update();
        if(!s.removeFlag) return s;
    });
}

export {addSpell, renderSpells, updateSpells}