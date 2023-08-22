import {Character} from "./character";
import {getSpriteById} from "../utils";
import {Vector} from "kontra";
import {Player} from "./player";

export class Enemy extends Character {
    moveToDestination: Vector | undefined;
    player: Player | undefined;

    setPlayer(player: Player){
        this.player = player;
    }

    moveTo(x: number, y: number){
        this.moveToDestination = Vector(x, y);
    }

    moveToPlayer(){
        this.moveTo(this.player!.x, this.player!.y)
    }

    update(){
        this.hopOnCondition();
        if(this.moveToDestination){
            if(this.moveToDestination.distance(Vector(this.x, this.y)) > this.speed){
                this.moving = true;
                let goTo = Vector(this.moveToDestination.x - this.x, this.moveToDestination.y - this.y).normalize()
                this.move(goTo, this.speed);
            }else{
                this.x = this.moveToDestination.x;
                this.y = this.moveToDestination.y;
                this.moving = false;
            }
        }
    }
}
export class Villager extends Enemy {
    speed: number = 1.6;
    constructor(x: number, y: number) {
        super(x, y, getSpriteById(0));
    }

    update(){
        super.update();
        this.moveToPlayer();
    }
}