import {
    keyMap,
    keyPressed,
    Vector,
} from "kontra";
import {getSpriteById, mousePosition, mousePressed} from "../utils";
import {Character} from "./character";


export class Player extends Character {
    constructor() {
        super(60, 60, getSpriteById(4), 100);
    }

    update() {
        super.update();
        this.updatePlayerMovement();
        if(mousePressed(0)) this.attack(Vector(0, 0));
    }

    updatePlayerMovement(){
        if(this.dashing) return;

        let direction: Vector = Vector(0, 0);
        if (keyPressed('w')) direction.y = -1;
        if (keyPressed('a')) direction.x = -1;
        if (keyPressed('d')) direction.x = 1;
        if (keyPressed('s')) direction.y = 1;

        if (keyPressed([keyMap.space, 'space'])) {
            this.dashTo(direction, 60)
        }

        if(!this.dashing){
            this.moveTo(direction)
        }
    }



    getLookingDirection(){
        return this.x - mousePosition().x < 0 ? 1 : -1;
    }

    // takeDamage(damage: number){
    //     super.takeDamage(damage);
    // }
    //
    //
}