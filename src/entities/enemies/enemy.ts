import {Character} from "../character";
import {Player} from "../player";
import {Sprite, Vector} from "kontra";
import {Timer} from "../timer";
import {getRandomVecDir, randNumber} from "../../utils/utils";
import {centeredAnchor} from "../../utils/sprite";

import {Damageable} from "../weapons/damageable";

export class Enemy extends Character {
    player!: Player;
    healthBar: Sprite;
    healthBarWidth: number = 6;
    seeDistance: number = 100;
    aggro: boolean = false;
    attackDistance: number = 60;
    name: string = "";

    idleTimer = new Timer(randNumber(200), () => {
        this.moveTo(getRandomVecDir(), randNumber(60));
    }, true).start();

    loadAttackTimer = new Timer(40, () => this.attack(this.player));

    constructor(x: number, y: number, sprite: Sprite) {
        super(x, y, sprite);
        this.healthBar = Sprite({anchor: centeredAnchor, y: -5, height: 1, color: "#ff000099"})
        this.addChild(this.healthBar)
    }

    update() {
        super.update();
        if (this.aggro) this.updateAggro();
        else this.updateIdle();
    }

    updateAggro() {
        this.loadAttackTimer.update();

        if(this.inAttackRange() && this.canAttack() && !this.loadAttackTimer.isActive) {
            this.initAttack();
        }

        if (this.distanceToPlayer() <= this.seeDistance) {
            this.moveToPlayer();
        }

        if (this.canIdle()) {
            this.loadAttackTimer.stop();
            this.idleTimer.start(randNumber(200));
            this.aggro = false;
        }
    }

    initAttack(){
        this.loadAttackTimer.start();
        this.weapon?.startWiggle();
    }

    inAttackRange = () => this.distanceToPlayer() <= this.attackDistance;

    canIdle = () => this.distanceToPlayer() >= this.seeDistance && !this.moving && !this.loadAttackTimer.isActive;

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

    takeDamage(damage: number) {
        super.takeDamage(damage);
        this.healthBar.width = (this.health / this.maxHealth) * this.healthBarWidth;
    }

    pointDaggerDirection() {
        if (!this.armCanRotate || !this.aggro) return super.pointDaggerDirection()
        return Vector(this.player.world.x - this.world.x, this.player.world.y - this.world.y).normalize();
    }
}