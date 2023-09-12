import {Sprite, Vector} from "kontra";
import {Timer} from "./timer";
import {Entity} from "./entity";
import Room from "../rooms/room";
import {Dagger} from "./weapons/daggers";
import {playSound, TAKE_DAMAGE} from "../utils/sound";
import {StatusAttributes} from "./status-attributes";
import {Reward, StatusReward} from "./reward";
import {sumRewards} from "../utils/reward-util";
import {Weapon} from "./weapons/weapon";


export class Character extends Entity implements StatusAttributes {
    sprite: Sprite;

    armCanRotate: boolean = false;
    //internal values
    private _maxHealth: number = 0;
    private _health: number = 0;
    private _strength: number = 1;
    private _attackSpeed: number = 60;
    private _dashTimeout: number = 60;
    private _dashDistance: number = 60;

    dashSpeed: number = 4;

    dashing: boolean = false;
    dashRefillTimer: Timer = new Timer();
    invincibleTimer: Timer = new Timer(15);
    deathTimer: Timer = new Timer(60, () => this.removeFlag = true)
    attackTimeoutTimer: Timer = new Timer();
    weapon: Weapon | undefined = undefined;
    inbound: boolean = true;

    rewards: Map<keyof StatusReward, Reward[]> = new Map<keyof StatusReward, Reward[]>()

    // hopping values
    z: number = 0;
    zDir: number = 1;

    // accessors
    get maxHealth(): number {
        return this._maxHealth + sumRewards(this.rewards, 'maxHealth')
    }

    set maxHealth(number) {
        this._maxHealth = number
    }

    get health(): number {
        return this._health
    }

    set health(number) {
        if (this.maxHealth < number)
            this._health = this.maxHealth
        else
            this._health = number
    }

    get strength(): number {
        return this._strength + sumRewards(this.rewards, 'strength')
    }

    set strength(number) {
        this._strength = number
    }

    get attackSpeed(): number {
        return this._attackSpeed - sumRewards(this.rewards, 'attackSpeed')
    }

    set attackSpeed(number) {
        this._attackSpeed = number
    }

    get dashTimeout(): number {
        return this._dashTimeout - sumRewards(this.rewards, 'dashTimeout')
    }

    set dashTimeout(number) {
        this._dashTimeout = number
    }

    get dashDistance(): number {
        return this._dashDistance - sumRewards(this.rewards, 'dashDistance')
    }

    set dashDistance(number) {
        this._dashDistance = number
    }


    constructor(x: number, y: number, sprite: Sprite, room?: Room) {
        super({width: 5, height: 8, x: x, y: y, scaleX: 5, scaleY: 5});
        this.sprite = sprite;
        this.sprite.x += 0.5;
        this.room = room
        this.addChild(this.sprite);
    }

    canMove() {
        return super.canMove() && !this.deathTimer.isActive
    }

    collectReward(reward: Reward) {
        const keys = Object.keys(reward.status) as Array<keyof StatusAttributes>
        keys.forEach((key) => {
            if (key === 'health' && reward.status['health']) {
                this.health = this.health + reward.status['health']
            } else {
                let list = this.rewards.get(key)
                if (!list) {
                    list = []
                }
                list.push(reward)
                this.rewards.set(key, list)
            }
        })
    }

    isAlive = () => this.health > 0;

    initHealth(maxHealth: number) {
        this.maxHealth = maxHealth;
        this.health = maxHealth;
    }

    update() {
        super.update();
        this.updateHopping();

        this.invincibleTimer.update();
        this.dashRefillTimer.update();
        this.attackTimeoutTimer.update();
        this.deathTimer.update();

        this.sprite.opacity = this.invincibleTimer.isActive ? 0.5 : 1;

        if (!this.moving && this.dashing) {
            this.dashing = false;
        }

        if (this.weapon instanceof Dagger) {
            this.weapon.pointInDirection(this.pointDaggerDirection())
        }
    }

    updateHopping() {
        if (this.moving && !this.dashing) {
            this.z += 0.25 * this.zDir;
            if (this.z <= 0 || this.z >= 1.5) {
                this.zDir *= -1
                if (this.z <= 0) this.playHopSound();
            }

        } else {
            this.z = 0;
            this.zDir = 1;
        }
        this.sprite.y = -this.z;
    }

    playHopSound = () => {
    };

    pointDaggerDirection() {
        return Vector(this.lookingDirection, 0);
    }

    dashTo(direction: Vector) {
        if (!this.dashing && !this.dashRefillTimer.isActive) {
            this.dashing = true;
            this.dashRefillTimer.start(this.dashTimeout);
            this.moveTo(direction, this.dashDistance);
        }
    }

    currentSpeed = () => this.dashing ? this.speed * this.dashSpeed : this.speed;

    handWeapon(weapon: Weapon) {
        if (this.weapon) this.removeChild(this.weapon);
        this.weapon = weapon;
        this.weapon.setOwner(this);
        this.addChild(weapon);
    }

    attack(target?: Character) {
        this.weapon?.tryToAttack(target);
        this.attackTimeoutTimer.start(this.attackSpeed);
    }

    canAttack() {
        return !this.attackTimeoutTimer.isActive && !this.weapon?.isAttacking;
    }

    takeDamage(damage: number) {
        if (this.isInvincible() || damage == 0 || this.health == 0) return;
        this.invincibleTimer.start();

        this.health = Math.max(0, this.health - damage);
        playSound(TAKE_DAMAGE)
        if (this.health <= 0) this.die();
    }

    isInvincible = () => this.invincibleTimer.isActive || this.dashing;

    die() {
        this.rotation = -0.5 * Math.PI;
        this.weapon && this.removeChild(this.weapon)
        this.weapon = undefined;
        this.deathTimer.start();
    }

    targets(): Character[] {
        return this.room?.enemies ?? []
    }
}