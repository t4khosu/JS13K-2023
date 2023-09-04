import {GameObjectClass, Sprite} from "kontra";
import {Staff} from "../staffs";
import {Timer} from "../../timer";
import {centeredAnchor} from "../../../utils/sprite";

import {SpellParticle} from "./particles/spellParticle";
import SpellCaster from "./spellCaster";
import {Character} from "../../character";

export class Spell extends GameObjectClass{
    spellCaster: SpellCaster
    owner: Character
    targets: Character[]
    finishedCasting: boolean = false;
    removeFlag: boolean = false;
    lifeTime: number = 50;
    castTime: number = 50;
    followsCaster: boolean = true;
    castTimer: Timer;

    constructor(spellCaster: SpellCaster) {
        super({anchor: centeredAnchor, scaleX: 8, scaleY: 8})
        this.spellCaster = spellCaster;
        this.owner = spellCaster.owner;
        this.targets = this.owner.targets();
        this.doFollowSpellCaster();

        this.castTimer = new Timer(0, () => {
            this.finishedCasting = true;
            this.getSpellParticles().forEach(c => c.activate());
        }).start(this.getCastTime())
    }

    doFollowSpellCaster(){
        this.x = this.spellCaster.world.x;
        this.y = this.spellCaster.world.y;
    }

    particleLifeTime = () => 180;

    getCastTime = () => this.castTime;

    getCastTimeout = () => Math.floor(this.getCastTime() * (5/3));

    getSpellParticles = (): SpellParticle[] => this.children.filter(c => c instanceof SpellParticle).map(c => c as SpellParticle);

    onCasting(){
        if(this.followsCaster) this.doFollowSpellCaster();
    }

    update(){
        super.update();
        this.castTimer.update();

        //if(this.remove()) this.removeFlag = true;
        this.children = this.children.filter(c => !(c as SpellParticle).removeFlag)

        if(!this.finishedCasting){
            this.onCasting();
        }else{
            this.lifeTime--;
        }
    }

    remove = () => (!this.owner?.isAlive() && !this.finishedCasting) || (this.lifeTime <= 0 && this.finishedCasting && this.getSpellParticles().length == 0);
}