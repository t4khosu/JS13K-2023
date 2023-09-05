import {Vector} from "kontra";


import {Spell} from "../entities/weapons/spells/spell";

function getRandomVecDir() {
    return Vector(Math.random() * 2 - 1, Math.random() * 2 - 1);
}

const randNumber = (num: number) => 0.7 * num + Math.random() * 0.6 * num;

let spells: Spell[] = []
const getSpells = () => spells;
const addSpell = (spell: Spell) => {
    spells.push(spell)
}

const cleanSpells = () => {
    spells = spells.filter(s => !s.removeFlag)
}

export {getRandomVecDir, randNumber, addSpell, getSpells, cleanSpells}