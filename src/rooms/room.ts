import {GameObjectClass, getCanvas, imageAssets, randInt, TileEngine} from "kontra";
import {getBackGroundTileMap, getWallTileMap} from "../utils/tile-maps";
import {Player} from "../entities/player";
import {Character} from "../entities/character";
import {Mage} from "../entities/enemies/mage";
import {Villager} from "../entities/enemies/villager";
import {Reward, RewardSprite} from "../entities/reward";
import {getRewards} from "../utils/reward-util";
import {Enemy} from "../entities/enemies/enemy";
import Pope from "../entities/enemies/pope";
import {renderSpells, updateSpells} from "../utils/spellsCollection";
import Interactable from "../entities/interactable";
import {Timer} from "../entities/timer";

export default class Room extends GameObjectClass {
    level: number = 1

    width: number
    height: number

    tileEngine?: TileEngine

    enemies: Character[] = []
    boss?: Enemy

    rewardLocking = new Timer(60)

    inCombat = true
    inReward = false

    levelRewards: Reward[] = []
    rewardSprites: RewardSprite[] = []
    interactables: Interactable[] = [];

    constructor(player: Player) {
        super({player: player})
        player.setRoom(this);

        let {width, height} = getCanvas();
        this.width = width
        this.height = height
    }

    initTiles(){
        const xDim = Math.ceil(this.width / 8)
        const yDim = Math.ceil(this.height / 8)

        this.tileEngine = TileEngine({
            tilewidth: 8,
            tileheight: 8,

            width: xDim,
            height: yDim,

            // tileset object
            tilesets: [{
                firstgid: 1,
                image: imageAssets['tiles']
            }],

            // layer object
            layers: [{
                name: 'ground',
                data: getBackGroundTileMap(xDim, yDim)
            }, {
                name: 'walls',
                data: getWallTileMap().flat(),
            }
            ]
        });
    }

    addInteractable(interactable: Interactable){
        interactable.setRoom(this);
        this.interactables.push(interactable);
    }

    addEnemies() {
        if (this.level === 10) {
            this.boss = new Pope(160, 160);
            this.boss.player = this.player;
            this.boss.setRoom(this)
            this.enemies.push(this.boss)
        }

        // TODO add enemies based on room level
        const randomVillager = randInt(1, this.level + 1)
        for (let _ in Array.from(Array(randomVillager).keys())) {
            const villager = new Villager(randInt(20, this.width - 20), randInt(20, this.height - 20), 2);
            villager.player = this.player;
            villager.setRoom(this)
            this.enemies.push(villager)
        }

        const randomMage = randInt(0, this.level + 1)
        for (let _ in Array.from(Array(randomMage).keys())) {
            const mage = new Mage(randInt(0, this.width), randInt(0, this.height));
            mage.player = this.player;
            mage.setRoom(this)
            this.enemies.push(mage)
        }
    }

    nextLevel() {
        this.level++
        this.enemies = []
        this.inReward = false
        this.inCombat = true
        this.addEnemies()
    }

    /**
     * method to be called when combat ends
     */
    showRewards() {
        this.inReward = true
        this.inCombat = false
        //apply old rewards
        this.player.addReward(this.levelRewards)
        //roll new ones
        this.rewardSprites = []
        this.levelRewards = getRewards(this.level)
        const partWidth = this.width / this.levelRewards.length
        for (let i = 0; i < this.levelRewards.length; i++) {
            const reward = this.levelRewards[i]
            const sprite = new RewardSprite(reward)
            sprite.x = (i * partWidth) + partWidth / 2
            sprite.y = this.height / 2
            this.rewardSprites.push(sprite)
        }
        this.rewardLocking.start()
    }


    render() {
        // this.tileEngine.render();
        !this.player.removeFlag && this.player.render()
        if (this.inCombat) {
            this.enemies.forEach((enemy) => {
                !enemy.removeFlag && enemy.render()
            })
            renderSpells();
        } else if (this.inReward) {
            this.rewardSprites.forEach((sprite) => {
                sprite.render()
            })
        }
    }

    update(dt: number) {
        super.update(dt)
        if (this.inCombat) {
            let removeCount = 0
            this.enemies.forEach((enemy) => {
                if (enemy.removeFlag) {
                    removeCount++
                } else {
                    enemy.update()
                }
            })
            if (this.enemies.length === removeCount) {
                this.showRewards()
            }
            updateSpells();
        } else if (this.inReward) {
            this.rewardLocking.update()
            this.rewardSprites.forEach((sprite) => {
                sprite.update()
                if (sprite.checkPlayerCollision(this.player) && !this.rewardLocking.isActive) {
                    this.nextLevel()
                }
            })
        }
    }
}
