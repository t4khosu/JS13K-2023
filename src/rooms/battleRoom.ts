import {imageAssets, randInt, TileEngine} from "kontra";
import {getBackGroundTileMap, getWallTileMap} from "../utils/tile-maps";
import {Enemy} from "../entities/enemies/enemy";
import {Timer} from "../entities/timer";
import {Reward, RewardSprite} from "../entities/reward";
import {getRewards} from "../utils/reward-util";
import Room from "./room";
import {Player} from "../entities/player";
import Game from "../game";
import Interactable from "../entities/interactable";
import {getCanvasHeight, getCanvasWidth, wallHeight} from "../utils/utils";
import Teleporter from "../entities/teleporter";
import BossBar from "../gui/components/bossBar";
import StageDisplay from "../gui/components/stage-display";
import {Mage} from "../entities/enemies/mage";
import {Villager} from "../entities/enemies/villager";
import Pope from "../entities/enemies/pope";

class BattleRoom extends Room{
    level: number = 1
    boss?: Enemy

    rewardLocking = new Timer(60)

    inCombat = false
    inReward = false

    rewardSprites: RewardSprite[] = []
    reward?: Reward

    spawnTimer: Timer = new Timer(60, () => this.spawnEnemies()).start();

    constructor(player: Player, game: Game, reward: Reward | undefined = undefined) {
        super(player, game);
        this.reward = reward;

        const xDim = Math.ceil(this.width / 8)
        const yDim = Math.ceil(this.height / 8)

        this.gui.push(new BossBar(this))
        this.gui.push(new StageDisplay(this))

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
            },
            //     {
            //     name: 'walls',
            //     data: getWallTileMap().flat(),
            // }
            ]
        });
    }

    update(){
        super.update();
        this.spawnTimer.update();

        if(this.enemies.length == 0 && this.inCombat){
            this.clearRoom()
            this.inCombat = false;
        }
    }

    clearRoom(){
        this.spawnReward();
        this.spawnPortals();
    }

    spawnReward(){
        if(this.reward) {
            const interactable = new Interactable(getCanvasWidth()/2, getCanvasHeight()/2, this.reward);
            interactable.setScale(2.5, 2.5);
            this.interactables.push(interactable)
        }
    }

    spawnPortals(){
        const positions = [getCanvasWidth()/4, getCanvasWidth()/2, 3*getCanvasWidth()/4]
        const rewards = getRewards(0, 3);

        for(let i = 0; i < positions.length; i++){
            const battleRoom = new BattleRoom(this.player, this.game, rewards[i])
            this.components.backgroundObjects.push(new Teleporter(positions[i], battleRoom, this.player, rewards[i]))
        }
    }

    spawnEnemies() {
        if (this.level === 10) {
            this.boss = new Pope(160, 160);
            this.boss.player = this.player;
            this.boss.setRoom(this)
            this.components.enemies.push(this.boss)
        }

        // TODO add enemies based on room level
        const randomVillager = randInt(1, this.level + 1)
        for (let _ in Array.from(Array(randomVillager).keys())) {
            const villager = new Villager(randInt(20, this.width - 20), randInt(20, this.height - 20), 0);
            villager.player = this.player;
            villager.setRoom(this)
            console.log(villager)
            console.log(this.enemies)
            this.components.enemies.push(villager)
        }

        const randomMage = randInt(0, this.level + 1)
        for (let _ in Array.from(Array(randomMage).keys())) {
            const mage = new Mage(randInt(0, this.width), randInt(0, this.height));
            mage.player = this.player;
            mage.setRoom(this)
            this.components.enemies.push(mage)
        }

        this.inCombat = true;
    }

    showRewards() {
        // this.inReward = true
        // this.inCombat = false
        // //apply old rewards
        this.player.addReward(this.levelRewards)
        // //roll new ones
        // this.rewardSprites = []
        // this.levelRewards = getRewards(this.level)
        // const partWidth = this.width / this.levelRewards.length
        // for (let i = 0; i < this.levelRewards.length; i++) {
        //     const reward = this.levelRewards[i]
        //     const sprite = new RewardSprite(reward)
        //     sprite.x = (i * partWidth) + partWidth / 2
        //     sprite.y = this.height / 2
        //     this.rewardSprites.push(sprite)
        // }
        // this.rewardLocking.start()
    }
}

export default BattleRoom