import {GameObjectClass, Sprite} from "kontra";
import {getSpriteById} from "../utils";

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

    attack(){
        if(this.canAttack) this.canAttack = false;
    }
}

export class Dagger extends Weapon{
    attackMaxTime: number = 4;
    attackTime: number = 0;
    attackSpeed: number = 0.5;

    update(){
        console.log(this.canAttack)
        super.update();
        if(this.canAttack) return;
        console.log("update")

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