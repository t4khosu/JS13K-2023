import {Vector} from "kontra";


import {Spell} from "../entities/weapons/spells/spell";

function getRandomVecDir() {
    return Vector(Math.random() * 2 - 1, Math.random() * 2 - 1);
}

let canvasWidth: number;
const getCanvasWidth: () => number = () => canvasWidth;

let canvasHeight: number = 0;
const getCanvasHeight: () => number = () => canvasHeight;
function setCanvasBoundaries(canvas: HTMLCanvasElement){
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
}

const wallHeight = 60;

const randNumber = (num: number) => 0.7 * num + Math.random() * 0.6 * num;

export {getRandomVecDir, randNumber, setCanvasBoundaries, getCanvasWidth, getCanvasHeight, wallHeight}