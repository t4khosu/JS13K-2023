import {GameObjectClass, Sprite, Vector} from "kontra";
import {Weapon} from "./weapon";

export class Character extends GameObjectClass {
    sprite: Sprite;
    weapon: Weapon | undefined = undefined;

    dir: number = 1;
    speed: number = 2;

    // states
    moving: boolean = false;

    // hopping
    z: number = 0;
    zMax: number = 1.5;
    zSpeed: number = 0.25;
    zDir: number = 1;

    constructor(x: number, y: number, sprite: Sprite, weapon: Weapon) {
        super({x: x, y: y, anchor: {x: 0.5, y: 0.5}, scaleX: 5, scaleY: 5});
        this.sprite = sprite;
        this.weapon = weapon;

        this.addChild(this.sprite);
        this.addChild(this.weapon);
    }

    move(vec: Vector, speed: number) {
        this.x += vec.x * speed
        this.y += vec.y * speed
    }

    attack(){
        this.weapon?.attack();
    }

    doHop = () => this.moving;

    hop(){
        if(this.doHop()){
            this.z += this.zSpeed * this.zDir;
            if (this.z <= 0 || this.z >= this.zMax) this.zDir *= -1;
        }else{
            this.z = 0;
            this.zDir = 1;
        }

        this.sprite.y = -this.z;
    }
}