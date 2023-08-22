import {
    keyMap,
    keyPressed,
    Vector,
} from "kontra";
import {getSpriteById} from "../utils";
import {Dagger} from "./weapons";
import {Character} from "./character";


export class Player extends Character {
    dashing: boolean = false;
    dashingMaxTimer: number = 70;
    dashingTimeout: number = 80;
    dashingTimeoutTimer: number = 0;
    dashingTimer: number = 0;
    dashingSpeed: number = 10;
    dashingDirection: Vector = Vector(0, 0);

    constructor() {
        super(60, 60, getSpriteById(4));
    }

    update() {
        super.update();

        let vx = 0;
        let vy = 0;
        let dash = false;

        if (keyPressed('w')) vy = -1;
        if (keyPressed('a')) vx = -1;
        if (keyPressed('d')) vx = 1;
        if (keyPressed('s')) vy = 1;
        if (keyPressed([keyMap.space, 'space'])) dash = !this.dashing && this.dashingTimeoutTimer === 0;
        if(keyPressed('j')) this.attack();

        this.moving = vx != 0 || vy != 0;

        this.hopOnCondition();

        let vec = Vector(vx, vy);
        vec = vec.normalize();

        if (dash) {
            this.dashing = true;
            this.dashingDirection = vec;
            this.dashingTimer = this.dashingMaxTimer;
            this.dashingTimeoutTimer = this.dashingTimeout;
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

        this.dashingTimeoutTimer = Math.max(0, this.dashingTimeoutTimer - 2)
    }

    doHop = () => this.moving && !this.dashing;

    /**
     * Reset initial player state
     */
    reset() {
        this.invincibleTime = 0
        this.health = this.maxHealth
    }
}