import {Reward, RewardSprite, StatusReward} from "../entities/reward";
import {randInt} from "kontra";

let rewardList: Reward[] = [];

function initRewards(){
    rewardList = [
        new Reward({maxHealth: 4, health: 4}, 0),
        new Reward({health: 8}, 1),
        new Reward({strength: 0.25}, 2),
        new Reward({attackSpeed: 3}, 4),
        new Reward({dashTimeout: 3}, 5),
        new Reward({dashDistance: 4}, 6),
    ]
}

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

export function getRewards(level: number, num: number) {
    const rewards: Reward[] = []
    const rewardPool = [...rewardList]
    for (let i = 0; i < num; i++) {
        const reward = rewardPool.splice(randInt(0, rewardPool.length - 1), 1)[0]
        //TODO modify reward based on level?
        rewards.push(reward)
    }
    return rewards
}

export function generateRewards(level: number) {

}

export { initRewards }