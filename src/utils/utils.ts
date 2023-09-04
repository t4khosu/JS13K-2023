import {Vector} from "kontra";


import {Spell} from "../entities/weapons/spells/spell";

function getRandomVecDir(){
    return Vector(Math.random() * 2 - 1, Math.random() * 2 - 1);
}

const randNumber = (num: number) => 0.7 * num + Math.random() * 0.6 * num;

export {getRandomVecDir, randNumber}