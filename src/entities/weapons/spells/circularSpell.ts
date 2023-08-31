import {Spell} from "./spell";
import {Vector} from "kontra";

import {HolySpellParticle} from "./particles/holySpellParticle";

export class CircularSpell extends Spell {
    timer: number = 0;
    distance: number = 6;
    numParticles: number = 15;
    spawnSpeed: number = 7;

    getCastTime = () => this.numParticles * this.spawnSpeed;

    getCastTimeout = () => this.getCastTime() * 3

    updateSpell() {
        super.updateSpell();
        console.log("update")

        if (this.timer % this.spawnSpeed == 0) {
            const direction = this.getRotatedDirection(2 * Math.PI * (this.timer / (this.spawnSpeed * this.numParticles)))
            this.addChild(new HolySpellParticle(direction.x * this.distance, direction.y * this.distance, this));
        }
        this.timer++;
    }

    getRotatedDirection(radiant: number) {
        return Vector(Math.cos(radiant), Math.sin(radiant))
    }
}