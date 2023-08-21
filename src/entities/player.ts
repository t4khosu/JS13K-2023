import {
    GameObjectClass, keyMap,
    keyPressed,
    Sprite, Vector,
} from "kontra";
import {getSpriteById} from "../utils";
import {Dagger, Weapon} from "./weapon";

export class Player extends GameObjectClass {
    characterSprite: Sprite;
    weapon: Weapon;
    dir: number = 1;
    speed: number = 3;

    z: number = 0;
    zMax: number = 1.5;
    zSpeed: number = 0.30;
    zDir: number = 1;

    dashing: boolean = false;
    attacking: boolean = false;
    dashingMaxTimer: number = 70;
    dashingTimeout: number = 80;
    dashingTimeoutTimer: number = 0;
    dashingTimer: number = 0;
    dashingSpeed: number = 10;
    dashingDirection: Vector = Vector(0, 0);

    constructor() {
        super({x: 5, y: 5, anchor: {x: 0.5, y: 0.5}, scaleX: 5, scaleY: 5});

        this.characterSprite = getSpriteById(4);
        this.weapon = new Dagger(this, 1, 0, getSpriteById(6));
        this.addChild(this.characterSprite);
        this.addChild(this.weapon);
    }

    update() {
        super.update();

        let vx = 0;
        let vy = 0;
        let dash = false;
        let attack = false;

        if (keyPressed('w')) vy = -1;
        if (keyPressed('a')) vx = -1;
        if (keyPressed('d')) vx = 1;
        if (keyPressed('s')) vy = 1;
        if (keyPressed(keyMap.space)) dash = !this.dashing && this.dashingTimeoutTimer === 0;
        if(keyPressed('j')) attack = !this.weapon.attacking;

        this.moving = vx != 0 || vy != 0;

        if (!this.moving || this.dashing) {
            this.z = 0;
            this.zDir = 1;
        } else {
            this.z += this.zSpeed * this.zDir;
            if (this.z <= 0 || this.z >= this.zMax) this.zDir *= -1;
        }

        this.characterSprite.y = -this.z;

        let vec = Vector(vx, vy);
        vec = vec.normalize();

        if (vx != 0 && vx !== this.dir) {
            this.dir = vx
            this.scaleX *= -1;
        }

        if (dash) {
            this.dashing = true;
            this.dashingDirection = vec;
            this.dashingTimer = this.dashingMaxTimer;
            this.dashingTimeoutTimer = this.dashingTimeout;
        }

        if(attack){
            this.weapon.attack();
        }

        if(!this.dashing){
            this.move(vec, this.speed);
        } else {
            this.move(this.dashingDirection, this.dashingSpeed);
            this.dashingTimer = Math.max(this.dashingTimer - 5, 0);
            if (this.dashingTimer === 0) {
                this.dashing = false;
            }
        }

        this.dashingTimeoutTimer = Math.max(0, this.dashingTimeoutTimer - 2)
    }

    move(vec: Vector, speed: number) {
        this.x += vec.x * speed
        this.y += vec.y * speed
    }

    attack(): void {

    }

    /**
     * Reset initial player state
     */
    reset() {
        this.invincibleTime = 0
        this.health = this.maxHealth
    }

    /**
     * Call on enemy or bullet collision
     */
    hit() {
        //TODO
    }
}