import {GameObjectClass, Sprite} from "kontra";
import {Player} from "./player";

export class Weapon extends GameObjectClass{
    originX: number;
    originY: number;
    sprite: Sprite;
    player: Player;
    attacking: boolean = false;

    constructor(player: Player, originX: number, originY: number, sprite: Sprite) {
        super({x: originX, y: originY});
        this.player = player;
        this.originX = originX;
        this.originY = originY;
        this.sprite = sprite;

        this.addChild(this.sprite);
    }

    attack(){
        if(!this.attacking){
            this.attacking = true;
        }
    }
}

export class Dagger extends Weapon{
    attackMaxTime: number = 4;
    attackTime: number = 0;
    attackSpeed: number = 0.5;

    update(){
        super.update();
        if(!this.attacking) return;

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
            this.attacking = false;
        }
    }
}