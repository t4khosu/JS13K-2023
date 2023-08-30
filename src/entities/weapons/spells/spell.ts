import {GameObjectClass, Sprite} from "kontra";
import {Staff} from "../staffs";
import {Timer} from "../../timer";
import {centeredAnchor} from "../../../utils/sprite";
import {SpellParticle} from "./spells";

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