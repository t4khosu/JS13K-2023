import {
    keyMap,
    keyPressed,
    Vector,
} from "kontra";
import {Character} from "./character";
import {mousePosition, mousePressed} from "../utils/mouse";
import {getSpriteById} from "../utils/sprite";
import {HOP, playSound, STAB} from "../utils/sound";
import Room from "./room";


export class Player extends Character {
    constructor(room: Room) {
        super(60, 60, getSpriteById(4), 100, room);
        this.speed = 2.5
    }

    update() {
        super.update();
        this.updatePlayerMovement();
        if(mousePressed(0) && this.canAttack()) {
            this.attack();
            playSound(STAB)
        }
    }

    playHopSound = () => playSound(HOP)

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

    pointDaggerDirection(){
        if(!this.armCanRotate) return super.pointDaggerDirection()
        const mouse = mousePosition();
        return Vector(mouse.x - this.world.x, mouse.y - this.world.y).normalize();
    }

    getLookingDirection(){
        if(this.weapon?.isAttacking && !this.armCanRotate) return 0;
        return this.x - mousePosition().x < 0 ? 1 : -1;
    }
}