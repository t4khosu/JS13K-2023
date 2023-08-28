import {Character} from "../character";
import {Player} from "../player";
import {Sprite, Vector} from "kontra";
import {Timer} from "../timer";
import {getRandomVecDir, randNumber} from "../../utils/utils";
import {centeredAnchor} from "../../utils/sprite";
import {Damageable} from "../weapon";

export class Enemy extends Character {
    player!: Player;
    healthBar: Sprite;
    healthBarWidth: number = 6;
    seeDistance: number = 100;
    aggro: boolean = false;
    attackDistance: number = 60;

    idleTimer = new Timer(randNumber(200), () => {
        this.moveTo(getRandomVecDir(), randNumber(60));
        this.idleTimer.setMax(randNumber(200));
    }, true).start();


    constructor(x: number, y: number, sprite: Sprite, health: number) {
        super(x, y, sprite, health);
        this.healthBar = Sprite({anchor: centeredAnchor, y: -5, height: 1, color: "#ff000099"})
        this.addChild(this.healthBar)
    }

    update() {
        super.update();
        if (this.aggro) {
            this.updateAggro();
        } else {
            this.updateIdle();
        }
    }

    updateAggro() {
        if (this.distanceToPlayer() >= this.seeDistance && !this.moving) {
            this.idleTimer.start();
            this.aggro = false;
        }

        if (this.canAttack()) {
            this.attack(this.player);
        }

        if (this.distanceToPlayer() <= this.seeDistance) {
            this.moveToPlayer();
        }
    }

    canAttack() {
        return this.distanceToPlayer() <= this.attackDistance;
    }

    updateIdle() {
        this.idleTimer.update();
        if (this.distanceToPlayer() <= this.seeDistance) {
            this.aggro = true;
        }
    }

    distanceToPlayer = () => this.distanceTo(this.player);

    targets(): Character[] {
        return [this.player!]
    }

    moveToPlayer() {
        this.movingTo = Vector(this.player.x - this.playerDirection() * 38, this.player.y)
    }

    playerDirection() {
        return Math.sign(this.player!.x - this.x);
    }

    getLookingDirection() {
        return this.aggro ? this.playerDirection() : super.getLookingDirection();
    }

    getsHitBy(damageable: Damageable) {
        super.getsHitBy(damageable);
        this.healthBar.width = (this.health / this.maxHealth) * this.healthBarWidth;
    }

    pointDaggerDirection() {
        if (!this.armCanRotate || !this.aggro) return super.pointDaggerDirection()
        return Vector(this.player.world.x - this.world.x, this.player.world.y - this.world.y).normalize();
    }
}