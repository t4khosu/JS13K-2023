import {Sprite, Vector} from "kontra";
import {Weapon} from "./weapons/weapon";
import {Timer} from "./timer";
import {Entity} from "./entity";
import Room from "./room";
import {Damageable} from "./weapons/damageable";
import {Dagger} from "./weapons/daggers";
import {playSound, TAKE_DAMAGE} from "../utils/sound";


export class Character extends Entity {
    sprite: Sprite;

    maxHealth: number = 0;
    health: number = 0;

    dashing: boolean = false;

    dashRefillTimer: Timer = new Timer(60);
    invincibleTimer: Timer = new Timer(60);
    attackTimeoutTimer: Timer = new Timer(30);
    weapon: Weapon | undefined = undefined;
    armCanRotate: boolean = false;

    // hopping values
    z: number = 0;
    zDir: number = 1;

    // TODO replace
    dummyTargets: Character[] = [];

    constructor(x: number, y: number, sprite: Sprite, room?: Room) {
        super({width: 5, height: 8, x: x, y: y, scaleX: 5, scaleY: 5});
        this.sprite = sprite;
        this.sprite.x += 0.5;
        this.room = room
        this.addChild(this.sprite);
    }

    isAlive = () => this.health > 0;

    initHealth(maxHealth: number){
        this.health = maxHealth;
        this.maxHealth = maxHealth;
    }

    update(){
        super.update();
        this.updateHopping();

        this.invincibleTimer.update();
        this.dashRefillTimer.update();
        this.attackTimeoutTimer.update();

        this.sprite.opacity = this.invincibleTimer.isActive ? 0.5 : 1;

        if(!this.moving && this.dashing){
            this.dashing = false;
        }

        if(this.weapon instanceof Dagger){
            this.weapon.pointInDirection(this.pointDaggerDirection())
        }
    }

    updateHopping(){
        if(this.moving && !this.dashing){
            this.z += 0.25 * this.zDir;
            if (this.z <= 0 || this.z >= 1.5) {
                this.zDir *= -1
                if(this.z <= 0) this.playHopSound();
            };
        }else{
            this.z = 0;
            this.zDir = 1;
        }
        this.sprite.y = -this.z;
    }

    playHopSound = () => {};

    pointDaggerDirection(){
        return Vector(this.lookingDirection, 0);
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

    attack(target?: Character){
        this.weapon?.tryToAttack(target);
        this.attackTimeoutTimer.start();
    }

    canAttack() {
        return !this.attackTimeoutTimer.isActive && !this.weapon?.isAttacking;
    }

    getsHitBy(damageable: Damageable){
        if(this.isInvincible() || damageable.damage == 0) return;
        this.invincibleTimer.start();
        this.takeDamage(damageable.damage);
        if(this.health <= 0) this.die();
    }

    takeDamage(damage: number){
        this.health = Math.max(0, this.health - damage);
        playSound(TAKE_DAMAGE)
    }

    isInvincible = () => this.invincibleTimer.isActive || this.dashing;

    die(){
        this.sprite.rotation = -0.5 * Math.PI;
        this.weapon && this.removeChild(this.weapon)
        this.weapon = undefined;

        const deathTimer = new Timer(60, () => {
            this.removeFlag = true;
        }).start();
        this.update = () => {
            deathTimer.update();
        };
    }

    targets(): Character[] {
        const enemies = this.room?.enemies;
        return enemies ? enemies : []
    }
}