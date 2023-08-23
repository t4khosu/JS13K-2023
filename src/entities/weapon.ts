import {collides, GameObjectClass, Sprite} from "kontra";
import {getSpriteById} from "../utils";
import {Character} from "./character";
import {Enemy} from "./enemies";
import {Player} from "./player";

export class Weapon extends GameObjectClass{
    originX: number;
    originY: number;
    sprite: Sprite;
    isIdle: boolean = true;
    targetClass: any;
    owner: Character | undefined;
    damageOnContact: boolean = true;

    constructor(originX: number, originY: number, sprite: Sprite) {
        super({x: originX, y: originY});
        this.originX = originX;
        this.originY = originY;
        this.sprite = sprite;

        this.addChild(this.sprite);
    }

    tryToAttack(){
        if(this.isIdle) this.isIdle = false;
    }

    setOwner(owner: Character) {
        this.owner = owner;
        this.targetClass = owner instanceof Enemy ? Player : Enemy;
    }

    checkForHit(){
        if(this.isIdle) return;
        this.owner?.targets().forEach(target => {
            collides(this, target) && target.hitBy(this);
        });
    }

    update(){
        super.update();
        this.checkForHit();
    }
}

export class Dagger extends Weapon{
    attackMaxTime: number = 4;
    attackTime: number = 0;
    attackSpeed: number = 0.5;
    damageOnContact: boolean = false;

    update(){
        super.update();
        if(this.isIdle) return;

        this.attackTime += this.attackSpeed;
        let relX;

        if(this.attackTime < this.attackMaxTime){
            relX = this.attackTime;
        }else{
            relX = this.attackMaxTime - this.attackTime + this.attackMaxTime;
        }

        relX = Math.max(0, relX);
        this.sprite.x = relX;

        if(relX === 0){
            this.attackTime =  0;
            this.isIdle = true;
        }
    }
}

export class BigDagger extends Dagger{
    constructor() {
        super(3, 0, getSpriteById(6));
        this.width = 4;
        this.height = 2;
    }
}

export class SmallDagger extends Dagger {
    constructor() {
        super(1, 0, getSpriteById(8));
    }
}