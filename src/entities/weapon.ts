import {collides, GameObjectClass, Sprite} from "kontra";
import {getSpriteById} from "../utils";
import {Character} from "./character";

export class Weapon extends GameObjectClass{
    originX: number;
    originY: number;
    sprite: Sprite;
    canAttack: boolean = true;
    damageOnContact: boolean = true;

    constructor(originX: number, originY: number, sprite: Sprite) {
        super({x: originX, y: originY});
        this.originX = originX;
        this.originY = originY;
        this.sprite = sprite;

        this.addChild(this.sprite);
    }

    tryToAttack(){
        if(this.canAttack) this.canAttack = false;
    }

    hit(character: Character){
        if(!this.canAttack && collides(this, character)){
            character.getHitBy(this);
        }
    }
}

export class Dagger extends Weapon{
    attackMaxTime: number = 4;
    attackTime: number = 0;
    attackSpeed: number = 0.5;
    damageOnContact: boolean = false;

    update(){
        super.update();
        if(this.canAttack) return;

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
            this.canAttack = true;
        }
    }
}

export class BigDagger extends Dagger{
    constructor() {
        super(3, 0, getSpriteById(6));
    }
}

export class SmallDagger extends Dagger {
    constructor() {
        super(1, 0, getSpriteById(8));
    }
}