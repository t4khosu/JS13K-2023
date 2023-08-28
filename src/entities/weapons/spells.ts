import {Damageable} from "./damageable";
import {GameObjectClass, Sprite, Vector} from "kontra";
import {Character} from "../character";
import {centeredAnchor} from "../../utils/sprite";
import {Entity} from "../entity";
import {randNumber} from "../../utils/utils";
import {Timer} from "../timer";

export class Spell extends Entity{
    speed: number = 0;
    lifeTime: number = 150;
    owner: Character;
    target: Character;

    constructor(x: number, y: number, owner: Character, target: Character) {
        super({x: x, y: y, anchor: centeredAnchor})
        this.setScale(8, 8)
        this.owner = owner;
        this.target = target;

        this.spawnSpellParticle();
    }

    spawnSpellParticle(){
        const particle = new SoftFollowSpellParticle(0, 0, "red", this.owner, this.target);
        this.addChild(particle)
        particle.run();
    }

    update() {
        super.update();
        if (--this.lifeTime <= 0) this.removeFlag = true;
    }
}

export class SpellParticle extends Damageable{
    target: Character;
    constructor(x: number, y: number, color: string, owner: Character, target: Character) {
        super(x, y, Sprite({width: 1, height: 1, color: color, anchor: centeredAnchor}))

        this.isAttacking = true;
        this.destroyOnCollision = true;
        this.target = target;
        this.owner = owner;
        this.width = 1;
        this.height = 1;
        this.speed = 0.5;
    }

    run(){
        this.moveToTarget();
    }

    vectorToTarget(){
        return this.vectorTo(this.target.world.x - this.world.x, this.target.world.y - this.world.y);
    }

    moveToTarget(){
        this.moveTo(this.vectorToTarget(), 2000);
    }
}

export class SoftFollowSpellParticle extends SpellParticle{
    timer: Timer = new Timer(randNumber(60), () => this.moveToTarget());
    constructor(x: number, y: number, color: string, owner: Character, target: Character) {
        super(x, y, color, owner, target)
        this.speed = 0.4;
        this.timer.start();
    }

    update(){
        super.update();
        this.timer.update();
    }
}