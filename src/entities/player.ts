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
        if(this.dashing) return;

        let v: Vector = Vector(0, 0);

        if (keyPressed('w')) v.y = -1;
        if (keyPressed('a')) v.x = -1;
        if (keyPressed('d')) v.x = 1;
        if (keyPressed('s')) v.y = 1;
        if (keyPressed([keyMap.space, 'space'])) this.dashing = !this.dashingWaitTimer.isActive;
        if(mousePressed(0)) this.attack();

        const destination = this.getNextPosition(v, this.dashing ? this.dashingDistance : this.speed);
        if(this.dashing){
            this.dashTo(destination.x, destination.y)
        }else{
            this.moveTo(destination.x, destination.y)
        }
    }

    takeDamage(damage: number){
        super.takeDamage(damage);
    }

    isInvincible = () => this.invincibleTimer.isActive || this.dashing;

    getTargetDir = () => {
        return this.x - mousePosition().x < 0 ? 1 : -1;
    };
}