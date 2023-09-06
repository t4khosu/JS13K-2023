import {
    keyMap,
    keyPressed, Text,
    Vector,
} from "kontra";
import {Character} from "./character";
import {mousePosition, mousePressed} from "../utils/mouse";
import {centeredAnchor, getSpriteById} from "../utils/sprite";
import {HOP, playSound, STAB} from "../utils/sound";
import Interactable from "./interactable";
import {Weapon} from "./weapons/weapon";
import {getVectorBetweenGameObjects} from "../utils/vectors";

export class Player extends Character {
    interactText: Text;
    constructor(x: number, y: number) {
        super(x, y, getSpriteById(4));
        this.interactText = Text({x: 1, y: -7, text: "!", color: "red", font: "5px Arial", textAlign: "center", opacity: 0, anchor: centeredAnchor});
        this.addChild(this.interactText)
        this.reset();
    }

    reset(){
        this.speed = 2.5
        this.armCanRotate = true;
        this.strength = 1;
        this.attackSpeed = 30;
        this.dashTimeout = 60;
        this.dashDistance = 60;
        this.initHealth(20);
    }

    update() {
        super.update();
        this.updateInteractables();
        this.updatePlayerMovement();
        if(mousePressed(0) && this.canAttack()) {
            this.attack();
            if(this.weapon !== undefined) playSound(STAB)
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

        this.moveTo(direction)

        if (keyPressed([keyMap.space, 'space'])) this.dashTo(direction)
    }

    pointDaggerDirection(){
        if(!this.armCanRotate) return super.pointDaggerDirection()
        const mouse = mousePosition();
        return Vector(mouse.x - this.world.x, mouse.y - this.world.y).normalize();
    }

    updateInteractables(){
        this.interactText.opacity = 0;
        this.room.interactables.forEach(i => {
            if(getVectorBetweenGameObjects(this, i).length() > 30) return;

            this.interactText.opacity = 1;
            if (keyPressed("e")) i.interactWith(this);
        })
    }

    getLookingDirection(){
        if(this.weapon?.isAttacking && !this.armCanRotate) return 0;
        return this.x - mousePosition().x < 0 ? 1 : -1;
    }
}