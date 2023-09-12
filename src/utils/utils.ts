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

const imageSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAflBMVEUAAADw2LeKazjgrHebWTj3v4IfGhXbvadcXFxAQECzNjgJDizr5sJNTU2+OTv159Dr3saKLDLUrI7/6QCZiXWUVADe185CQWFXVYA+PGZwQQDEvrXRysC9t6////9jm/+sMjLZV2Puw5pfzeQyPDlmOTGPVjtSSySbrbfZoGaoLlLzAAAAAXRSTlMAQObYZgAAATdJREFUeNqVkAWCwyAURKdGqJC6GyXV+19w/58IrNmLDPJQJLRaIO023tERNLsC+3s02F4KpmM0M5MZjjc9E9sTMxMkbK+cwdbtfSv0gcFwlI0GUnfWth3grOBSIc9HeSVYCm7sVOio0AGyXMiAXt851xPBjScTFWD4YmqmU02ooCn9k+rYbXwL+2ezGb5gXgszMzP4ggUqZgIiy+Vq9U5YbzbbzRqR3X6/pxmFA4WUVJgdDvvDDD9gjkeDf3DCN5y9h7/gdDoxhRBwTvrP54v3angmBWlMZ2APfJkh0Egvxit1noIYKkXYEzMQfDCgnJhU/nTGoijSszZ5rUic2+2mx7qVZ24E6aRzv4uAs3pxhgdneNIphYa4xOv1VChQ8TxPFFA8oUSBgPMLINyDAHyeoSD4SCO8Ad51KMGPQVQGAAAAAElFTkSuQmCC\n"
const img = document.createElement("img");
img.src = imageSrc;

export {getRandomVecDir, randNumber, setCanvasBoundaries, getCanvasWidth, getCanvasHeight, getCanvasCenter, wallHeight, levelToColor, img}