import {GameObjectClass, Sprite} from "kontra";
import {Staff} from "../staffs";
import {Timer} from "../../timer";
import {centeredAnchor} from "../../../utils/sprite";

import {SpellParticle} from "./particles/spellParticle";

export class Spell extends GameObjectClass{
    staff: Staff;
    castTimer: Timer;
    finishedCasting: boolean = false;
    removeFlag: boolean = false;
    lifeTime: number = 50;

    constructor(staff: Staff) {
        super({x: staff.tipX(), y: staff.tipY(), anchor: centeredAnchor, scaleX: 8, scaleY: 8})
        this.staff = staff;

        this.castTimer = new Timer(0, () => {
            this.finishedCasting = true;
            this.getSpellParticles().forEach(c => c.activate());
        })
    }

    particleLifeTime = () => 180;

    getCastTime = () => this.castTime;

    getCastTimeout = () => Math.floor(this.getCastTime() * (5/3));

    getSpellParticles = (): SpellParticle[] => this.children.filter(c => c instanceof SpellParticle).map(c => c as SpellParticle);


    startCasting(){
        this.castTimer.start(this.getCastTime());
        this.startSpell();
    }


    update(){
        super.update();
        if(this.doRemove()) this.removeFlag = true;

        this.children = this.children.filter(c => !(c as SpellParticle).removeFlag)

        if(!this.finishedCasting){
            this.x = this.staff.tipX();
            this.y = this.staff.tipY();
            this.castTimer.update();
            this.updateSpell();
        }else{
            this.lifeTime--;
        }
    }

    doRemove = () => (!this.staff.owner?.isAlive() && !this.finishedCasting) || (this.lifeTime <= 0 && this.finishedCasting && this.getSpellParticles().length == 0);

    startSpell(){}

    updateSpell(){}
}