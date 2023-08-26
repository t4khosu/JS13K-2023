import {collides, GameObjectClass, Sprite, Vector} from "kontra";
import {centeredAnchor, getSpriteById} from "../utils";
import {Character} from "./character";
import {Entity} from "./entity";

export class Damageable extends Entity{
    damage: number = 0;
    sprite: Sprite;

    constructor(x: number, y: number, sprite: Sprite) {
        super({x: x, y: y, anchor: centeredAnchor});
        this.sprite = sprite;
        this.addChild(this.sprite);
    }
}

export class Weapon extends Damageable{
    originX: number;
    originY: number;

    isAttacking: boolean = false;
    owner: Character | undefined;

    constructor(x: number, y: number, sprite: Sprite) {
        super(x, y, sprite);
        this.originX = x;
        this.originY = y;
    }

    attack(){
        this.isAttacking = true;
    }

    checkForHit(){
        if(!this.isAttacking) return;
        this.owner?.targets().forEach(target => {
            collides(this, target) && target.getsHitBy(this);
        });
    }

    update(){
        super.update();
        this.checkForHit();
    }
}

export class Dagger extends Weapon{
    maxDistance: number = 6;
    speed: number = 0.5;

    update(){
        super.update();
        if(!this.isAttacking){
            this.movingTo = Vector(this.originX, this.originY)
        }else{
            if(this.x < this.maxDistance){
                this.movingTo = Vector(this.x + this.maxDistance, this.y)
            }else{
                this.isAttacking = false;
            }
        }
    }

    getLookingDirection(): number{
        return 0;
    }
}

export class BigDagger extends Dagger{
    constructor() {
        super(3, 2, getSpriteById(6));
        this.width = 4;
        this.height = 2;
        this.damage = 5;
    }
}

export class SmallDagger extends Dagger {
    constructor() {
        super(2, 1, getSpriteById(8, {y: -0.5}));
        this.width = 4;
        this.height = 1;
        this.damage = 4;
    }
}

export class Staff extends Weapon {
    constructor() {
        super(6, 0, getSpriteById(7));
        this.width = 4;
        this.height = 1;
        this.damage = 0;

    }

    update(){
        super.update();
        if(!this.isAttacking){
            this.addChild(new StaffMagic(
                Vector(1, 1).normalize()
            ));
            this.isAttacking = true;
        }
    }
}

export class StaffMagic extends Weapon {
    speed: number = 1;
    direction: Vector;

    constructor(direction: Vector){
        super(-2, -3, Sprite({width: 1, height: 1, color: "red"}))
        this.direction= direction;
    }

    update(){
        this.x += this.direction.x * this.speed;
        this.y += this.direction.y * this.speed;
    }
}