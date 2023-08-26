import {GameObjectClass, Sprite, Vector} from "kontra";
import {Damageable, Weapon} from "./weapon";
import {centeredAnchor} from "../utils";
import {Timer} from "./timer";
import {Entity} from "./entity";

export class Character extends Entity {
    sprite: Sprite;

    maxHealth: number = 30;
    health: number = 0;
    dashing: boolean = false;
    dashRefillTimer: Timer = new Timer(60);
    invincibleTimer: Timer = new Timer(60);
    attackTimeoutTimer: Timer = new Timer(30);
    weapon: Weapon | undefined = undefined;

    // hopping values
    z: number = 0;
    zDir: number = 1;

    // TODO replace
    dummyTargets: Character[] = [];

    constructor(x: number, y: number, sprite: Sprite, health: number) {
        super({width: 5, height: 8, x: x, y: y, anchor: centeredAnchor, scaleX: 5, scaleY: 5});
        this.sprite = sprite;
        this.sprite.x += 0.5;
        this.maxHealth = health;
        this.health = health;

        this.addChild(this.sprite);
    }

    update(){
        super.update();
        this.updateHopping();

        this.invincibleTimer.update();
        this.dashRefillTimer.update();
        this.attackTimeoutTimer.update();

        if(!this.moving && this.dashing){
            this.dashing = false;
        }
    }

    updateHopping(){
        if(this.moving && !this.dashing){
            this.z += 0.25 * this.zDir;
            if (this.z <= 0 || this.z >= 1.5) this.zDir *= -1;
        }else{
            this.z = 0;
            this.zDir = 1;
        }
        this.sprite.y = -this.z;
    }

    dashTo(direction: Vector, distance: number = 0){
        if(!this.dashing && !this.dashRefillTimer.isActive) {
            this.dashing = true;
            this.dashRefillTimer.start();
            this.moveTo(direction, distance);
        }
    }

    currentSpeed = () => this.dashing ? this.speed * 4 : this.speed;

    handWeapon(weapon: Weapon){
        this.weapon = weapon;
        this.weapon.owner = this;
        this.addChild(weapon);
    }

    attack(){
        if(!this.attackTimeoutTimer.isActive && !this.weapon?.isAttacking){
            this.weapon?.attack();
            this.attackTimeoutTimer.start();
        }
    }

    getsHitBy(damageable: Damageable){
        if(this.isInvincible()) return;
        this.invincibleTimer.start();
        this.health = Math.max(0, this.health - damageable.damage);
        if(this.health <= 0) this.die();
    }

    isInvincible = () => this.invincibleTimer.isActive || this.dashing;

    die(){
        this.sprite.rotation = -0.5 * Math.PI;
        this.weapon && this.removeChild(this.weapon)
        this.weapon = undefined;

        const deathTimer = new Timer(60, () => {this.removeFlag = true;}).start();
        this.update = () => {
            deathTimer.update();
        };
    }

    targets(): Character[] {
        return this.dummyTargets;
    }
}