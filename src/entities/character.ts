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
    removeFlag: boolean = false;

    moving: boolean = false;
    moveToDestination: Vector;
    moveToDir: number = 1;

    dashing: boolean = false;
    dashingDistance: number = 60;
    dashingWaitTimer: Timer = new Timer(60);

    // hopping values
    z: number = 0;
    zDir: number = 1;

    // timers
    invincibleTimer: Timer = new Timer(60);
    deathTimer: Timer = new Timer(60, () => {this.removeFlag = true;});

    weapon: Weapon | undefined = undefined;

    // TODO replace
    dummyTargets: Character[] = [];

    constructor(x: number, y: number, sprite: Sprite, health: number) {
        super({width: 5, height: 8, x: x, y: y, anchor: centeredAnchor, scaleX: 5, scaleY: 5});
        this.sprite = sprite;
        this.sprite.x += 0.5;
        this.maxHealth = health;
        this.health = health;
        this.moveToDestination = Vector(x, y);

        this.addChild(this.sprite);
    }

    update(){
        super.update();
        this.invincibleTimer.update();
        this.dashingWaitTimer.update();

        this.tryToHop();
        this.tryToTurn();

        this.moveUpdate();
    }

    handWeapon(weapon: Weapon){
        if(this.weapon) this.removeChild();
        this.weapon = weapon;
        this.weapon.owner = this;
        this.addChild(weapon);
    }

    onGettingAttackedBy(weapon: Weapon){
        if(this.invincibleTimer.isActive) return;
        this.invincibleTimer.start();

        this.takeDamage(weapon.damage);
        if(this.health <= 0) this.die();
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

    moveUpdate(){
        const distance = this.moveToDestination!.distance(Vector(this.x, this.y));
        const speed = this.dashing ? this.speed * 4 : this.speed;
        this.moving = distance > 0.1;

        const goTo = distance >= speed ? this.getNextPosition(Vector(this.moveToDestination!.x - this.x, this.moveToDestination!.y - this.y), speed) : this.moveToDestination;
        this.x = goTo.x;
        this.y = goTo.y;

        if(!this.moving){
            this.dashing = false;
        }
    }

    tryToHop(){
        if(this.moving && !this.dashing){
            this.z += 0.25 * this.zDir;
            if (this.z <= 0 || this.z >= 1.5) this.zDir *= -1;
        }else{
            this.z = 0;
            this.zDir = 1;
        }
        this.sprite.y = -this.z;
    }

    tryToTurn(){
        if(!this.isAttacking() && this.getTargetDir() != this.dir){
            this.dir *= -1;
            this.scaleX *= -1;
        }
    }

    moveTo(x: number, y: number){
        this.moveToDestination = Vector(x, y);
        this.moveToDir = this.x - x <= 0 ? 1 : -1;
    }

    dashTo(x: number, y: number){
        if(!this.dashingWaitTimer.isActive){
            this.dashing = true;
            this.dashingWaitTimer.start();
            this.moveTo(x, y);
        }
    }

    getNextPosition(direction: Vector, distance: number){
        direction = direction.normalize();
        return Vector(
            this.x + direction.x * distance,
            this.y + direction.y * distance,
        )
    }

    getTargetDir(){
        return 1;
    }

    attack(){
        this.weapon?.tryToAttack();
    }

    isAttacking = () => this.weapon ? !this.weapon.isIdle : false;

    distanceTo = (character: Character) => Vector(this.x, this.y).distance(Vector(character.x, character.y));

    getTargets(): Character[] {
        return this.dummyTargets;
    }
}