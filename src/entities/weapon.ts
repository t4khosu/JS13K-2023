import {Sprite, Vector} from "kontra";
import {addSpell} from "../utils/utils";
import {Character} from "./character";
import {Entity} from "./entity";
import {centeredAnchor, getSpriteById} from "../utils/sprite";
import {collidesWithRotation} from "../utils/collision";
import {Player} from "./player";

export class Damageable extends Entity{
    damage: number = 0;
    sprite: Sprite;
    owner: Character | undefined;
    destroyOnCollision: boolean = false;
    target?: Character;

    constructor(x: number, y: number, sprite: Sprite) {
        super({x: x, y: y, anchor: centeredAnchor});
        this.sprite = sprite;
        this.addChild(this.sprite);
    }

    update(){
        super.update();
        this.checkForHit();
    }

    checkForHit(){
        if(!this.isAttacking) return;
        this.owner?.targets().forEach(target => {
            if(target.dashing) return;
            if(collidesWithRotation(this, target)){
                target.getsHitBy(this)
                this.removeFlag = this.destroyOnCollision;
            }
        });
    }
}

export class Weapon extends Damageable{
    originX: number;
    originY: number;
    isAttacking: boolean = false;
    attackFromX!: number;
    attackFromY!: number;

    constructor(x: number, y: number, sprite: Sprite) {
        super(x, y, sprite);
        this.originX = x;
        this.originY = y;
    }

    attack(target?: Character){
        this.isAttacking = true;
        this.target = target;
        this.attackFromX = this.x;
        this.attackFromY = this.y;
    }
}

export class Dagger extends Weapon{
    stabbingDistance: number = 8;
    holdingDistance: number = 5;
    currentDistance: number = 0;

    speed: number = 0.5;
    returnDagger: boolean = false;
    direction = Vector(1, 0);

    update(){
        super.update();
        this.adjust();

        if(!this.isAttacking) return;

        this.currentDistance += this.returnDagger ? -this.speed : this.speed;
        this.x += this.direction.x * this.currentDistance;
        this.y += this.direction.y * this.currentDistance;

        if(this.currentDistance >= this.stabbingDistance - this.holdingDistance){
            this.returnDagger = true;
        }

        if(this.currentDistance <= 0){
            this.isAttacking = false;
            this.returnDagger = false;
        }
    }

    adjust(){
        this.rotation = Vector(0, -1).angle(this.direction) - 0.5 * Math.PI;
        this.x = this.originY + this.direction.x * this.holdingDistance
        this.y = this.originY + this.direction.y * this.holdingDistance
    }

    pointInDirection(direction: Vector){
        direction.x *= this.owner!.lookingDirection;
        this.direction = direction.normalize();
    }

    getLookingDirection(): number{
        return 0;
    }
}

export class BigDagger extends Dagger{
    constructor() {
        super(0, 1, getSpriteById(6));
        this.width = 4;
        this.height = 2;
        this.damage = 5;
    }
}

export class SmallDagger extends Dagger {
    constructor() {
        super(0, 1, getSpriteById(8, {y: -0.5}));
        this.width = 4;
        this.height = 1;
        this.damage = 4;

        this.stabbingDistance = 6;
        this.holdingDistance = 3;
    }
}

export class Staff extends Weapon {
    constructor() {
        super(5, 0, getSpriteById(7));
        this.width = 4;
        this.height = 1;
        this.damage = 0;
    }

    update(){
        super.update();
        if(this.isAttacking){
            const spellX = this.world.x;
            const spellY = this.world.y - 6;
            const direction = Vector(this.target!.world.x - spellX, this.target!.world.y - spellY)

            const spell = new Spell(spellX, spellY, direction, this.owner!);
            addSpell(spell);
            this.isAttacking = false;
        }
    }
}

export class Spell extends Damageable {
    speed: number = 4;
    lifeTime: number = 70;

    constructor(x: number, y: number, direction: Vector, owner: Character){
        super(x, y, Sprite({width: 1, height: 1, color: "#ffffbbdd", anchor: centeredAnchor}))
        this.destroyOnCollision = true;
        this.isAttacking = true;
        this.owner= owner;
        this.setScale(8, 8)
        this.width = 1;
        this.height = 1;
        this.moveTo(direction, this.speed * this.lifeTime)
    }

    update(){
        super.update();
        if(--this.lifeTime <= 0) this.removeFlag = true;
    }
}