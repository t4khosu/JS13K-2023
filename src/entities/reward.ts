import {GameObjectClass, Sprite} from "kontra";
import {getSpriteById} from "../utils/sprite";
import {PenColor} from "../utils/colorize";
import {easeOutSine} from "../utils/easing";
import {Player} from "./player";
import {StatusAttributes} from "./status-attributes";

export type StatusReward = Partial<StatusAttributes>;

export class Reward {
    status: StatusReward
    iconID: number

    constructor(status: StatusReward, iconId: number) {
        this.status = status
        this.iconID = iconId
    }
}

export class RewardIcon extends GameObjectClass {
    sprite: Sprite

    private upMotion = true
    private timeCount = 0
    private animationDuration = 0.5

    constructor(rewardIcon: number = 1) {
        super();
        this.sprite = getSpriteById(rewardIcon, PenColor.None, {
            scaleX: 2.5,
            scaleY: 2.5
        }, 'icons')
        this.addChild(this.sprite)
    }

    render() {
        super.render()
    }

    update(dt: number) {
        super.update()
        this.timeCount += dt
        if (this.timeCount > this.animationDuration) {
            this.upMotion = !this.upMotion
            this.timeCount = 0
        }
        let vector = 0.5
        if (!this.upMotion)
            vector *= -1
        this.sprite.y += easeOutSine(this.timeCount * vector)
    }
}

export class RewardSprite extends GameObjectClass {
    color = '#fff'

    // custom properties
    radius = 50
    rewardIcon: RewardIcon

    constructor(reward: Reward) {
        super();
        this.rewardIcon = new RewardIcon(reward.iconID)
        this.addChild(this.rewardIcon)
    }

    render() {
        this.draw()
        this.context.save();
        this.context.fillStyle = this.color;
        this.context.fillStyle = "rgba(255, 255, 255, 0.5)";
        this.context.imageSmoothingEnabled = false;
        this.context.beginPath();
        this.context.transform(1, 0, 0, 0.5, 0, 0)
        this.context.translate(0, this.y)
        this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.context.fill()
        this.context.restore()

        this.rewardIcon.x = this.x
        this.rewardIcon.y = this.y
        this.rewardIcon.render()
    }

    checkPlayerCollision(player: Player) {
        const distance = Math.sqrt((player.x - this.x) ** 2 + (player.y - this.y) ** 2)
        return distance < this.radius
    }
}