import {
    GameObjectClass,
    keyPressed,
    Sprite, Vector,
} from "kontra";
import {getSpriteById} from "../utils";

export class Player extends GameObjectClass {
    characterSprite: Sprite;
    rightHandWeaponSprite: Sprite;
    leftHandWeaponWprite: Sprite;
    dir: number = 1;
    speed: number = 3;

    z: number = 0;
    zMax: number = 2;
    zSpeed: number = 0.45;
    zDir: number = 1;

    constructor() {
        super({x: 5, y: 5, anchor: {x: 0.5, y: 0.5}, scaleX: 5, scaleY: 5});

        this.characterSprite = getSpriteById(4);
        this.rightHandWeaponSprite = getSpriteById(6);
        this.leftHandWeaponWprite = getSpriteById(7);
        this.rightHandWeaponSprite.x += 4;
        this.leftHandWeaponWprite.x -= 3;
        this.addChild(this.characterSprite);
        this.addChild(this.rightHandWeaponSprite);
        this.addChild(this.leftHandWeaponWprite);
    }

    update() {
        super.update();

        let vx = 0;
        let vy = 0;
        if (keyPressed('w')) vy = -1;
        if (keyPressed('a')) vx = -1;
        if (keyPressed('d')) vx = 1;
        if (keyPressed('s')) vy = 1;

        this.moving = vx != 0 || vy != 0;

        if(!this.moving){
            this.z = 0;
            this.zDir = 1;
        }else{
            this.z += this.zSpeed * this.zDir;
            if(this.z <= 0 || this.z >= this.zMax) this.zDir *= -1;
        }

        this.characterSprite.y = -this.z;

        let vec = Vector(vx, vy);
        vec = vec.normalize();

        if(vx != 0 && vx !== this.dir){
            this.dir = vx
            this.scaleX *= -1;
        }

        this.x += vec.x * this.speed
        this.y += vec.y * this.speed
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