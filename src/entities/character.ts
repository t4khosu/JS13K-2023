import {GameObjectClass, Sprite, Vector} from "kontra";
import {Weapon} from "./weapon";
import {centeredAnchor} from "../utils";
import {Timer} from "./timer";

export class Character extends GameObjectClass {
    sprite: Sprite;

    // health
    maxHealth: number = 30;
    health: number = 0;

    // timers
    invicibleTimer: Timer;

    weapon: Weapon | undefined = undefined;

    dir: number = 1;
    speed: number = 2;

    // states
    moving: boolean = false;

    // hopping
    z: number = 0;
    zMax: number = 1.5;
    zSpeed: number = 0.25;
    zDir: number = 1;

    dummyTargets: Character[] = [];

    constructor(x: number, y: number, sprite: Sprite) {
        super({width: 8, height: 8, x: x, y: y, anchor: centeredAnchor, scaleX: 5, scaleY: 5});
        this.sprite = sprite;
        this.health = this.maxHealth;
        this.invicibleTimer = new Timer(60);
        this.addChild(this.sprite);
    }

    giveWeapon(weapon: Weapon){
        this.weapon && this.removeChild();
        this.weapon = weapon;
        this.weapon.setOwner(this);
        this.addChild(weapon);
    }

    hitBy(weapon: Weapon){
        if(this.invicibleTimer.running) return;

        this.health = Math.max(0, this.health - weapon.damage);
        if(this.health <= 0) this.die();
        this.invicibleTimer.restart();
    }

    die(){

    }

    update(){
        super.update();
        this.invicibleTimer.update();
        this.hopOnCondition();
    }

    hopOnCondition(){
        if(this.doHop()){
            this.z += this.zSpeed * this.zDir;
            if (this.z <= 0 || this.z >= this.zMax) this.zDir *= -1;
        }else{
            this.z = 0;
            this.zDir = 1;
        }
        this.sprite.y = -this.z;
    }

    doHop = () => this.moving;

    move(vec: Vector, speed: number) {
        this.x += vec.x * speed
        this.y += vec.y * speed

        if(this.doChangeDir(vec.x)){
            this.dir *= -1;
            this.scaleX *= -1;
        }
    }

    doChangeDir = (xx: number) => !this.isAttacking() && xx != 0 && this.dirRelativeTo(xx) != this.dir

    attack(){
        this.weapon?.tryToAttack();
    }

    isAttacking = () => this.weapon ? !this.weapon.isIdle : false;

    getDistanceTo = (character: Character) => Vector(this.x, this.y).distance(Vector(character.x, character.y));

    getTargets(): Character[] {
        return this.dummyTargets;
    }
}