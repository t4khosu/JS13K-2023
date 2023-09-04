import {GameObjectClass, Sprite, Vector} from "kontra";
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
    isCasting: boolean = true;
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
            this.isCasting = false;
            this.getSpellParticles().forEach(c => c.activate());
        }).start(this.getCastTime())
    }

    doFollowSpellCaster(){
        this.x = this.spellCaster.world.x;
        this.y = this.spellCaster.world.y;
    }

    findTarget(): Character{
        return this.owner.targets()[0] ?? null;
    }

    particleLifeTime = () => 180;

    getCastTime = () => this.castTime;

    getCastTimeout = () => Math.floor(this.getCastTime() * (5/3));

    getSpellParticles = (): SpellParticle[] => this.children.filter(c => c instanceof SpellParticle).map(c => c as SpellParticle);

    castingUpdate(){
        if(this.followsCaster) this.doFollowSpellCaster();
    }

    update(){
        super.update();
        this.castTimer.update();

        this.removeFlag = this.remove();
        this.children = this.children.filter(c => !(c as SpellParticle).removeFlag)

        if(this.isCasting) this.castingUpdate();
        else this.lifeTime--;
    }

    getVectorTo(character: Character) {
        return Vector(character.world.x - this.world.x, character.world.y - this.world.y).normalize();
    }

    getVectorToTarget = () => this.getVectorTo(this.findTarget())

    remove = () => (!this.owner?.isAlive() && !this.isCasting) || (this.lifeTime <= 0 && this.isCasting && this.getSpellParticles().length == 0);
}