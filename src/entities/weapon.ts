import {Sprite, Vector} from "kontra";
import {addSpell} from "../utils/utils";
import {Character} from "./character";
import {Entity} from "./entity";
import {centeredAnchor, getSpriteById} from "../utils/sprite";
import {collidesWithRotation} from "../utils/collision";

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
    stabbingDistance: number = 3;
    holdingDistance: number = 5;
    speed: number = 0.5;
    returnDagger: boolean = false;

    update(){
        super.update();
        if(!this.isAttacking) return;

        if(this.returnDagger){
            this.movingTo = Vector(this.attackFromX, this.attackFromY)
            if(this.x == this.attackFromX && this.y == this.attackFromY){
                this.isAttacking = false;
                this.returnDagger = false;
            }
        }else{
            if(this.attackFromX != this.originX || this.attackFromY != this.originY){
                const direction = Vector(this.attackFromX - this.originX, this.attackFromY - this.originY).normalize();
                const distance = Vector(this.attackFromX, this.attackFromY).distance(Vector(this.x, this.y));

                if(distance < this.stabbingDistance){
                    this.moveTo(direction, this.speed)
                }else{
                    this.returnDagger = true;
                }
            }
        }
    }

    pointInDirection(direction: Vector){
        if(this.isAttacking) return;
        this.rotation = Vector(0, -1).angle(direction) - 0.5 * Math.PI
        this.x = this.owner!.lookingDirection * direction.x * this.holdingDistance
        this.y = this.originY + direction.y * this.holdingDistance
    }

    getLookingDirection(): number{
        return 0;
    }
}

export class BigDagger extends Dagger{
    constructor() {
        super(0, 0, getSpriteById(6));
        this.width = 4;
        this.height = 2;
        this.damage = 5;
        this.addChild(Sprite({width: this.width, height: this.height, anchor: this.anchor, color: "#00ffff88"}))
    }

    update(){
        super.update();

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