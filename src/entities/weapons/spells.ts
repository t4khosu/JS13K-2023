import {Damageable} from "./damageable";
import {GameObjectClass, Sprite, Vector} from "kontra";
import {centeredAnchor} from "../../utils/sprite";
import {Timer} from "../timer";
import {Staff} from "./staffs";

export class Spell extends GameObjectClass{
    staff: Staff;
    castTimer: Timer;
    finishedCasting: boolean = false;
    removeFlag: boolean = false;

    constructor(staff: Staff) {
        super({x: staff.tipX(), y: staff.tipY(), anchor: centeredAnchor, scaleX: 8, scaleY: 8})
        this.addChild(Sprite({width: 1, height: 1, color: "lightblue", anchor: centeredAnchor}))
        this.staff = staff;

        this.castTimer = new Timer(0, () => {
            this.finishedCasting = true;
            this.children.forEach(c => {
                if (c instanceof SpellParticle) c.activate();
            })
        })
    }

    particleLifeTime = () => 180;

    start(){
        this.castTimer.start(this.getCastTime());
        this.startSpell();
    }

    getCastTime = () => this.castTime;

    getCastTimeout = () => Math.floor(this.getCastTime() * (5/3));

    update(){
        super.update();
        this.children = this.children.filter(c => !(c as SpellParticle).removeFlag)

        if(!this.finishedCasting){
            this.x = this.staff.tipX();
            this.y = this.staff.tipY();
            this.castTimer.update();
            this.updateSpell();
        }

        if(this.finishedCasting && this.children.length == 0){
            this.removeFlag = true;
        }
    }

    startSpell(){}

    updateSpell(){}
}

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
    distance: number = 11;
    numParticles: number = 20;
    spawnSpeed: number = 3;

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