import {GameObjectClass, Text} from "kontra";
import {Player} from "../entities/player";
import {rewardFactory} from "../utils/reward-util";
import {StatusReward} from "../entities/reward";

export default class RewardDisplay extends GameObjectClass {

    rewardMap = new Map<keyof StatusReward, Text>()
    player: Player

    constructor(player: Player) {
        super({x: 570, y: 530});
        this.player = player
        let i = 0
        rewardFactory().forEach((func) => {
            const reward = func()
            delete reward.status['health']
            const keys = Object.keys(reward.status)
            if (keys.length > 0) {
                reward.x = 40 * i
                reward.y = 5
                reward.setScale(1.5, 1.5);
                this.addChild(reward)
                const text = Text({text: `x 0`, font: '12px Verdana', color: "white", x: 10 + (40 * i)})
                this.addChild(text)
                i = i + 1
                debugger
                // @ts-ignore
                this.rewardMap.set(keys[0], text)
            }
        })
    }

    updateRewardMap() {
        debugger
        this.player.rewards.forEach((value, key) => {
            const text = this.rewardMap.get(key)
            if (text)
                text.text = `x ${value.length}`
        })
    }

    update() {
        this.updateRewardMap()
        super.update();
    }
}