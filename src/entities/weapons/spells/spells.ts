import {Damageable} from "../damageable";
import {Sprite, Vector} from "kontra";
import {centeredAnchor} from "../../../utils/sprite";
import {Spell} from "./spell";

export class SpellParticle extends Damageable{
    spell: Spell;
    lifeTime: number;

    isAttacking = true;
    destroyOnCollision = true;

    width = 1;
    height = 1;
    speed = 0.5;


    constructor(x: number, y: number, color: string, spell: Spell) {
        super(x, y, Sprite({width: 1, height: 1, color: color, anchor: centeredAnchor}))
        this.lifeTime = spell.particleLifeTime();
        this.spell = spell;
        this.owner = spell.staff.owner;
    }

    update(){
        super.update();
        if(--this.lifeTime == 0) this.removeFlag = true;
    }

    activate(){
        this.moveToTarget();
    }

    moveToTarget(){
        this.moveTo(this.vectorToTarget(), 2000);
    }

    vectorToTarget(){
        return Vector(this.spell.staff.target!.world.x - this.world.x, this.spell.staff.target!.world.y - this.world.y);
    }
}

export class HolySpell extends Spell{
    startSpell() {
        this.addChild(new HolySpellParticle(0, 0, this));
    }
}

export class CircularSpell extends Spell{
    timer: number = 0;
    distance: number = 6;
    numParticles: number = 15;
    spawnSpeed: number = 7;

    getCastTime = () => this.numParticles * this.spawnSpeed;

    getCastTimeout = () => this.getCastTime() * 3

    updateSpell() {
        super.updateSpell();

        if(this.timer % this.spawnSpeed == 0){
            const direction = this.getRotatedDirection(2 * Math.PI * (this.timer / (this.spawnSpeed * this.numParticles)))
            this.addChild(new HolySpellParticle(direction.x * this.distance, direction.y * this.distance, this));
        }
        this.timer++;
    }

    getRotatedDirection(radiant: number){
        return Vector(Math.cos(radiant), Math.sin(radiant))
    }
}

export class HolySpellParticle extends SpellParticle{
    speed = 0.6;
    constructor(x: number, y: number, spell: Spell) {
        super(x, y, "#ffffcc", spell)
    }
}