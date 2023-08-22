import {GameObjectClass, Sprite} from "kontra";
import {Player} from "./player";

export class Weapon extends GameObjectClass{
    originX: number;
    originY: number;
    sprite: Sprite;
    canAttack: boolean = true;

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
        super.update();
        if(this.canAttack) return;

        this.attackTime += this.attackSpeed;
        let relX = 0;

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