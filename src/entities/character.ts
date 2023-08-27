import {GameObjectClass, Sprite, Vector} from "kontra";
import {Weapons} from "./weapons";
import Room from "./room";

export class Character extends GameObjectClass {
    sprite: Sprite;
    room: Room | undefined
    weapon: Weapons | undefined = undefined;

    dir: number = 1;
    speed: number = 2;

    // states
    moving: boolean = false;

    // hopping
    z: number = 0;
    zMax: number = 1.5;
    zSpeed: number = 0.25;
    zDir: number = 1;

    constructor(x: number, y: number, sprite: Sprite, room: Room | undefined) {
        super({x: x, y: y, anchor: {x: 0.5, y: 0.5}, scaleX: 5, scaleY: 5});
        this.sprite = sprite;
        this.room = room
        this.addChild(this.sprite);
    }

    move(vec: Vector, speed: number) {
        let collision = false
        const prevX = this.x
        const prevY = this.y
        this.x += vec.x * speed
        this.y += vec.y * speed

        if (this.room) {
            collision = this.room.tileEngine.layerCollidesWith('walls', this)
        }
        if (collision) {
            this.x = prevX
            this.y = prevY
        } else {
            let newDir = vec.x >= 0 ? 1 : -1;
            if (newDir != this.dir) {
                this.dir *= -1;
                this.scaleX *= -1;
            }
        }
    }

    attack() {
        this.weapon?.attack();
    }

    setWeapon(weapon: Weapons) {
        this.weapon && this.removeChild();
        this.weapon = weapon;
        this.addChild(this.weapon);
    }

    doHop = () => this.moving;

    hopOnCondition() {
        if (this.doHop()) {
            this.z += this.zSpeed * this.zDir;
            if (this.z <= 0 || this.z >= this.zMax) this.zDir *= -1;
        } else {
            this.z = 0;
            this.zDir = 1;
        }

        this.sprite.y = -this.z;
    }
}