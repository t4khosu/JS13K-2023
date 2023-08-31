import {Entity} from "../entity";
import {Sprite} from "kontra";
import {Character} from "../character";
import {centeredAnchor} from "../../utils/sprite";
import {collidesWithRotation} from "../../utils/collision";

export class Damageable extends Entity {
    isAttacking: boolean = false;
    damage: number = 0;
    sprite: Sprite;
    owner: Character | undefined;
    destroyOnCollision: boolean = false;
    target?: Character;

    constructor(x: number, y: number, sprite: Sprite) {
        super({x: x, y: y, anchor: centeredAnchor});
        this.sprite = sprite;
        this.addChild(this.sprite);
    }

    update() {
        super.update();
        this.checkForHit();
    }

    checkForHit() {
        if (!this.isAttacking) return;
        this.owner?.targets().forEach(target => {
            if (target.dashing) return;
            if (collidesWithRotation(this, target)) {
                target.getsHitBy(this)
                this.removeFlag = this.destroyOnCollision;
            }
        });
    }
}