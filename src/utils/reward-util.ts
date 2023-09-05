import {Reward, RewardSprite, StatusReward} from "../entities/reward";
import {randInt} from "kontra";

const rewardList = [
    new Reward({maxHealth: 1}, 0),
    new Reward({health: 1}, 1),
    new Reward({strength: 1}, 2),
    new Reward({attackSpeed: 1}, 4),
    new Reward({dashTimeout: 1}, 5),
    new Reward({dashDistance: 1}, 6),
]

export function sumRewards(map: Map<keyof StatusReward, Reward[]>, key: keyof StatusReward) {
    let sum = 0
    const list = map.get(key)
    if (list) {
        list.forEach((item) => {
            const amount = item.status[key]
            if (amount) {
                sum += amount
            }
        })
    }
    return sum
}

export function getRewards(level: number) {
    const rewards: Reward[] = []
    const rewardAmount = randInt(1, 3)
    const rewardPool = [...rewardList]
    for (let i = 0; i < rewardAmount; i++) {
        debugger
        const reward = rewardPool.splice(randInt(0, rewardPool.length - 1), 1)[0]
        //TODO modify reward based on level?
        rewards.push(reward)
    }
    console.log(rewards)
    return rewards
}

export function generateRewards(level: number) {

}