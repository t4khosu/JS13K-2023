import {imageAssets, Sprite, SpriteSheet, Vector} from "kontra";

function getSpriteById(id: number, additional: object = {}): Sprite {
    return Sprite({
        anchor: centeredAnchor,
        ...additional,
        animations: SpriteSheet({
            frameHeight: 8,
            frameWidth: 8,
            image: imageAssets['characters'],
            animations: {
                i: {
                    frames: id
                }
            }
        }).animations
    });
}

function getRandomVecDir(){
    return Vector(Math.random() * 2 - 1, Math.random() * 2 - 1);
}

function getElementPosition(el: any) {
    var xPos = 0;
    var yPos = 0;

    while (el) {
        xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
        yPos += (el.offsetTop - el.scrollTop + el.clientTop);
        el = el.offsetParent;
    }

    return {
        x: xPos,
        y: yPos
    };
}

let mouseX = 0;
let mouseY = 0;
let buttonPressed = -1;

function initMouse(canvas: HTMLCanvasElement){
    canvas.addEventListener("mousemove", (e) => {
        mouseX = e.clientX - getElementPosition(canvas).x;
        mouseY = e.clientY - getElementPosition(canvas).y;

    }, false);

    canvas.addEventListener("mousedown", (e) => {
        buttonPressed = e.button;
    }, false);

    canvas.addEventListener("mouseup", () => {
        buttonPressed = -1;
    }, false);
}

function mousePosition(){
    return {x: mouseX, y: mouseY}
}

function mousePressed(button: number){
    return buttonPressed === button;
}

const randNumber = (num: number) => 0.7 * num + Math.random() * 0.6 * num;

const centeredAnchor = {x: 0.5, y: 0.5}


export {getSpriteById, getElementPosition, initMouse, mousePosition, mousePressed, centeredAnchor, getRandomVecDir, randNumber}