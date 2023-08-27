import {
    keyMap,
    keyPressed,
    Vector,
} from "kontra";
import {Character} from "./character";
import {Dagger, Weapon} from "./weapon";
import {mousePosition, mousePressed} from "../utils/mouse";
import {getSpriteById} from "../utils/sprite";


export class Player extends Character {
    freeArm: boolean = true;

    constructor() {
        super(60, 60, getSpriteById(4), 100);
        this.speed = 2.3
    }

    update() {
        super.update();
        this.updatePlayerMovement();

        if(this.weapon instanceof Dagger){
            this.updateDaggerPosition(this.weapon);
        }

        if(mousePressed(0)) this.attack();
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

    updateDaggerPosition(dagger: Dagger){
        const mouse = mousePosition();
        const direction = this.freeArm ? Vector(mouse.x - this.world.x, mouse.y - this.world.y).normalize() : Vector(this.lookingDirection, 0);
        dagger.pointInDirection(direction)
    }

    getLookingDirection(){
        if(this.weapon?.isAttacking) return 0;
        return this.x - mousePosition().x < 0 ? 1 : -1;
    }
}