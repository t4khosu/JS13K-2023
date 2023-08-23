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


    constructor(x: number, y: number, sprite: Sprite) {
        super({x: x, y: y, anchor: {x: 0.5, y: 0.5}, scaleX: 5, scaleY: 5});
        this.sprite = sprite;

        this.addChild(this.sprite);
    }

    getHitBy(weapon: Weapon){
        // TODO
    }

    checkDir = (xx: number): number => xx >= 0 ? 1 : -1;

    move(vec: Vector, speed: number) {
        this.x += vec.x * speed
        this.y += vec.y * speed

        let newDir = this.checkDir(vec.x);
        if(vec.x != 0 && newDir != this.dir && !this.attacking()){
            this.dir *= -1;
            this.scaleX *= -1;
        }
    }

    attack(){
        this.weapon?.tryToAttack();
    }

    attacking = () => this.weapon ? !this.weapon.isIdle : false;

    setWeapon(weapon: Weapon){
        this.weapon && this.removeChild();
        this.weapon = weapon;
        this.addChild(this.weapon);
    }

    doHop = () => this.moving;

    hopOnCondition(){
        if(this.doHop()){
            this.z += this.zSpeed * this.zDir;
            if (this.z <= 0 || this.z >= this.zMax) this.zDir *= -1;
        }else{
            this.z = 0;
            this.zDir = 1;
        }

        this.sprite.y = -this.z;
    }

    distanceTo = (character: Character) => Vector(this.x, this.y).distance(Vector(character.x, character.y));
}