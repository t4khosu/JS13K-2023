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

const imageSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAABEhJREFUWIXNV19IW1cc/o7zYWyTiBCo0S5Spq2sjiVha+xSNO6piqVgSOkIdJ1NXtL9K6tS9jCY64oRXLfWjSVz0yfXEulDcHmp1aKjsmEyloKKo6SamY2C885WH0b57SE7N+fe3Htj3B72gZw/3znn+87v/M65ESgBG4tx2liMkx4fCjopFHTq8lpgvJKO9iom1nn6mdiOnFQu7B+bU/ChoJPe9LTjSvQ7AEDPkJIvtj7S0V6yWszES7XT5ckxslrMxEu1eCjoJKvFTNtTH2rO11t/xxFYnhxT8PWvnpR5n89Hke4GANCMgM/no4+O1ygM8fUZALS2tlJtba1iQCaTwfT0NAOA2MtO8i4+xMri59hY+BWVjTWYO96Dzh/m5PkVFRUwmUwAgBdMv2BmxYxYLMYAoLOzkzjHIUkSYrEYK1OHSg8Tz5uQ6rqAysYapLouGI79WXpOs1+SJHw58B4kSZL7ygBg5OyhgsFi34FLb8t1Li72xT9ow+bmJiRJkv+un3upQPzbcB+2trfw9af5DcjnZLWY6f7aA6auA0DooJ2G1lcRrNoLABhaX4XIA/lj4ODh53iU/Ym2trfktnnf4XwOALlM5nX1FVLD2pJL2Pu3+w3H7QRloni724t2txd3o4O6j4m1pZd2I0y/Q3NNOQnb3V50vHUJAORSxJ6Wi7Sn5eKuxAEgPHJes78MyId84rNccvBSjd9uv68pftUDuuoB3VtI0L2FRElPcTkAtLlPU9+1PwEA2ewaqqstaHOfpltT32gKVjYcU4icjYK94watZbMAgNlbE+Rq61DM/evHAX0DIq4MvoaPB6aLOpeyC4r25Smwy1MdReepwQDgbnSQHj9rBwBsPnyEimeexhMrCRz0nGNAbsdPVh/SPYL/BFaLmSbjN2gyfqPgY1LZcIzUYf9fgYh2bW5H34LuCFHUbqeo3U4AELXbaelEN4niRKTJi1ifCdP6TJj4moDwEhqJ83rPzTNILSdlrqnehv3XhhkR0bjDgaZ6myYvGgCA84v+nUdg2M8YABz9woHUchJN9TaZ42LjDofcVvPirquOBBgADByIyGszIPeQAEB7XwIAsK/RXhAZHl4RnkSCGfFd8/P4YzYit6uOBJjaTEnXShQRxY14LqgGN1AytHYK5JNRj+dHoWeoZPybqyei/NR8Rl5o1FG747Cc+cqY744QDfsZs7uaDY0qBI3MBJptMvf4jYTcP+xnLNBso/CdpDxevLrJ0cOGRhkXVQvy/hf7TwAAFlbzP6fCd5KM71A0pzahF4E60wOkJXPOAO+MjMdptq6pYPefeF8hLQOG2xJQ7AjKlkYCtDQSIABwpVNwpVOIjMcpMq7/P2Cg2UbikWhlvt5tUKN8/+thdmo+Q650Cv6uo7v+3BYTFMOuMADkQj6qIuSE/CcHGvc+JXPvXv++wKj6YVIb0hIHhCRUo5QraYRiOfA3Ufo5lrAcWIwAAAAASUVORK5CYII="
const img = document.createElement("img");
img.src = imageSrc;

const imageSrc2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAAXNSR0IArs4c6QAAACVJREFUGJVjYKAPKHBk+I9LjmVKCETy3vVzGIqUNI0YCZpAOQAAe4QJTDUodxAAAAAASUVORK5CYII="
const img2 = document.createElement("img");
img2.src = imageSrc2;
export {getRandomVecDir, randNumber, setCanvasBoundaries, getCanvasWidth, getCanvasHeight, getCanvasCenter, wallHeight, levelToColor, img, img2}