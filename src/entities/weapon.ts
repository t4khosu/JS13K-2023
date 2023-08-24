import {collides, GameObjectClass, Sprite} from "kontra";
import {centeredAnchor, getSpriteById} from "../utils";
import {Character} from "./character";

export class Weapon extends GameObjectClass{
    originX: number;
    originY: number;
    sprite: Sprite;
    isIdle: boolean = true;
    owner: Character | undefined;
    damage: number = 0;

    constructor(originX: number, originY: number, sprite: Sprite) {
        super({x: originX, y: originY, anchor: centeredAnchor});
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
    }

    checkForHit(){
        if(this.isIdle) return;
        this.owner?.getTargets().forEach(target => {
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
        this.x = this.originX + relX;

        if(relX === 0){
            this.attackTime =  0;
            this.isIdle = true;
        }
    }
}

export class BigDagger extends Dagger{
    constructor() {
        super(1, 2, getSpriteById(6));
        this.width = 4;
        this.height = 2;
        this.damage = 5;
        this.addChild(Sprite({width: 5, height: 2, color: "#00ff0088", anchor: centeredAnchor}))

    }
}

export class SmallDagger extends Dagger {
    constructor() {
        super(1, 2, getSpriteById(8, {y: -0.5}));
        this.width = 4;
        this.height = 1;
        this.damage = 4;
        this.addChild(Sprite({width: 4, height: 1, color: "#00ff0088", anchor: centeredAnchor}))
    }
}