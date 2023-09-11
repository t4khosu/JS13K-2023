import {Vector} from "kontra";
import {PenColor} from "./colorize";

function getRandomVecDir() {
    return Vector(Math.random() * 2 - 1, Math.random() * 2 - 1);
}

let canvasWidth: number;
const getCanvasWidth: () => number = () => canvasWidth;

let canvasHeight: number = 0;
const getCanvasHeight: () => number = () => canvasHeight;

const getCanvasCenter: () => Vector = () => Vector(canvasWidth/2, canvasHeight/2)

function setCanvasBoundaries(canvas: HTMLCanvasElement){
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
}

const wallHeight = 60;

const randNumber = (num: number) => 0.9 * num + Math.random() * 0.1 * num;

function levelToColor(lvl: number){
    if(lvl <= 3) return PenColor.Green;
    if(lvl <= 6) return PenColor.Blue;
    return PenColor.Red;
}

export {getRandomVecDir, randNumber, setCanvasBoundaries, getCanvasWidth, getCanvasHeight, getCanvasCenter, wallHeight, levelToColor}