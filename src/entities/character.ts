import {GameObjectClass, Sprite, Vector} from "kontra";
import {Weapon} from "./weapon";
import {centeredAnchor} from "../utils";
import {Timer} from "./timer";

export class Character extends GameObjectClass {
    sprite: Sprite;

    // general
    maxHealth: number = 30;
    health: number = 0;
    dir: number = 1;
    speed: number = 2;
    remove: boolean = false;

    moving: boolean = false;
    moveToDestination: Vector | undefined;
    moveToDir: number = 1;

    // hopping values
    z: number = 0;
    zMax: number = 1.5;
    zSpeed: number = 0.25;
    zDir: number = 1;

    // timers
    invicibleTimer: Timer = new Timer(60);
    deathTimer: Timer = new Timer(60, () => {this.remove = true;});

    weapon: Weapon | undefined = undefined;


    // TODO replace
    dummyTargets: Character[] = [];

    constructor(x: number, y: number, sprite: Sprite, health: number) {
        super({width: 5, height: 8, x: x, y: y, anchor: centeredAnchor, scaleX: 5, scaleY: 5});
        this.sprite = sprite;
        this.sprite.x += 0.5;
        this.addChild(this.sprite);
        this.setHealth(health)
    }

    setHealth(health: number){
        this.maxHealth = health;
        this.health = health;
    }

    giveWeapon(weapon: Weapon){
        if(this.weapon) this.removeChild();
        this.weapon = weapon;
        this.weapon.setOwner(this);
        this.addChild(weapon);
    }

    isInvincible = () => this.invicibleTimer.isActive;

    hitBy(weapon: Weapon){
        if(this.isInvincible()) return;

        this.takeDamage(weapon.damage);
        if(this.health <= 0) this.die();
        this.invicibleTimer.start();
    }

    takeDamage(damage: number){
        this.health = Math.max(0, this.health - damage);
    }

    die(){
        this.sprite.rotation = -0.5 * Math.PI;
        this.weapon && this.removeChild(this.weapon)
        this.weapon = undefined;
        this.deathTimer.start();
        this.update = () => {
            this.deathTimer.update();
        };
    }

    update(){
        super.update();
        this.invicibleTimer.update();

        this.hopOnCondition();
        this.tryToChangeDir();
        this.moveToUpdate();
    }

    hopOnCondition(){
        if(this.isHopping()){
            this.z += this.zSpeed * this.zDir;
            if (this.z <= 0 || this.z >= this.zMax) this.zDir *= -1;
        }else{
            this.z = 0;
            this.zDir = 1;
        }
        this.sprite.y = -this.z;
    }

    isHopping = () => this.moving;

    tryToChangeDir(){
        if(!this.isAttacking() && this.getNewDir() != this.dir){
            this.dir *= -1;
            this.scaleX *= -1;
        }
    }

    moveTo(x: number, y: number){
        this.moveToDestination = Vector(x, y);
        this.moveToDir = this.x - x <= 0 ? 1 : -1;
    }

    moveToUpdate(){
        if(!this.moveToDestination) return;
        this.moving = this.moveToDestination.distance(Vector(this.x, this.y)) > this.speed;

        if(this.moving){
            let goTo = Vector(this.moveToDestination.x - this.x, this.moveToDestination.y - this.y).normalize()
            this.move(goTo, this.speed);
        }else{
            this.x = this.moveToDestination.x;
            this.y = this.moveToDestination.y;
            this.moveToDestination = undefined;
        }
    }

    move(vec: Vector, speed: number) {
        this.x += vec.x * speed
        this.y += vec.y * speed
    }

    getNewDir(){
        return 1;
    }

    attack(){
        this.weapon?.tryToAttack();
    }

    isAttacking = () => this.weapon ? !this.weapon.isIdle : false;

    getDistanceTo = (character: Character) => Vector(this.x, this.y).distance(Vector(character.x, character.y));

    getTargets(): Character[] {
        return this.dummyTargets;
    }
}