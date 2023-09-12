import {Reward, StatusReward} from "../entities/reward";
import {randInt} from "kontra";

function rewardFactory() {
    return [
        () => new Reward({maxHealth: 10, health: 5}, 9),
        () => new Reward({health: 50}, 10),
        () => new Reward({strength: 2}, 11),
        () => new Reward({attackSpeed: 5}, 12),
        () => new Reward({dashTimeout: 14}, 13),
        () => new Reward({dashDistance: 16}, 14),
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
    const rewardPool = [...rewardFactory()]
    for (let i = 0; i < num; i++) {
        const reward = rewardPool.splice(randInt(0, rewardPool.length - 1), 1)[0]
        //TODO modify reward based on level?
        rewards.push(reward())
    }
    return rewards
}

export {rewardFactory}