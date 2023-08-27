import {
    GameObject,
    keyMap,
    keyPressed, Sprite,
    Vector,
} from "kontra";
import {Character} from "./character";
import {Weapon} from "./weapon";
import {mousePosition, mousePressed} from "../utils/mouse";
import {centeredAnchor, getSpriteById} from "../utils/sprite";


export class Player extends Character {
    armPivot: GameObject = GameObject({anchor: centeredAnchor});
    constructor() {
        super(60, 60, getSpriteById(4), 100);
        this.armPivot.addChild(Sprite({width: 2, height: 2, color: "red", anchor: centeredAnchor}))
        this.addChild(this.armPivot);
    }

    handWeapon(weapon: Weapon){
        this.weapon = weapon;
        this.weapon.owner = this;
        this.armPivot.addChild(weapon);
    }

    update() {
        super.update();
        this.updatePlayerMovement();
        this.updateWeaponPosition();

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

    updateWeaponPosition(){
        const mouse = mousePosition();
        const rotation = Vector(0, -1).angle(Vector(this.x - mouse.x, this.y - mouse.y));
        this.armPivot.rotation = Math.PI * 0.5 - rotation
    }

    getLookingDirection(){
        return this.x - mousePosition().x < 0 ? 1 : -1;
    }

}