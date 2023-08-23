import {
    keyMap,
    keyPressed,
    Vector,
} from "kontra";
import {getSpriteById, mousePosition, mousePressed} from "../utils";
import {Character} from "./character";
import {Timer} from "./timer";


export class Player extends Character {
    dashingTimeoutTimer: Timer;

    dashing: boolean = false;
    dashingMaxTimer: number = 70;
    dashingTimer: number = 0;
    dashingSpeed: number = 10;
    dashingDirection: Vector = Vector(0, 0);

    constructor() {
        super(60, 60, getSpriteById(4));
        this.dashingTimeoutTimer = new Timer(60);
    }

    update() {
        super.update();
        this.dashingTimeoutTimer.update();

        let vx = 0;
        let vy = 0;
        let dash = false;

        if (keyPressed('w')) vy = -1;
        if (keyPressed('a')) vx = -1;
        if (keyPressed('d')) vx = 1;
        if (keyPressed('s')) vy = 1;
        if (keyPressed([keyMap.space, 'space'])) dash = !this.dashing && !this.dashingTimeoutTimer.running;
        if(mousePressed(0)) this.attack();

        this.moving = vx != 0 || vy != 0;

        let vec = Vector(vx, vy);
        vec = vec.normalize();

        if (dash) {
            this.dashing = true;
            this.dashingDirection = vec;
            this.dashingTimer = this.dashingMaxTimer;
            this.dashingTimeoutTimer.restart();
        }

        if(!this.dashing){
            this.moving && this.move(vec, this.speed);
        } else {
            this.move(this.dashingDirection, this.dashingSpeed);
            this.dashingTimer = Math.max(this.dashingTimer - 5, 0);
            if (this.dashingTimer === 0) {
                this.dashing = false;
            }
        }
    }

    getNewDir = () => {
        return this.x - mousePosition().x < 0 ? 1 : -1;
    };

    doHop = () => this.moving && !this.dashing;
}