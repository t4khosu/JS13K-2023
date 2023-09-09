import {imageAssets, randInt, TileEngine} from "kontra";
import {getBackGroundTileMap} from "../utils/tile-maps";
import {Enemy} from "../entities/enemies/enemy";
import {Timer} from "../entities/timer";
import {Reward} from "../entities/reward";
import {getRewards} from "../utils/reward-util";
import Room from "./room";
import {Player} from "../entities/player";
import Game from "../game";
import Interactable from "../entities/interactable";
import {getCanvasHeight, getCanvasWidth} from "../utils/utils";
import Teleporter from "../entities/teleporter";
import BossBar from "../gui/bossBar";
import StageDisplay from "../gui/stage-display";
import {Mage} from "../entities/enemies/mage";
import {Villager} from "../entities/enemies/villager";
import Pope from "../entities/enemies/pope";

class BattleRoom extends Room{
    level: number = 1
    boss?: Enemy

    inCombat = false
    reward?: Reward

    spawnTimer: Timer = new Timer(60, () => this.spawnEnemies()).start();

    constructor(player: Player, game: Game, reward: Reward | undefined = undefined) {
        super(game);
        this.setPlayer(player)
        this.reward = reward;

        const xDim = Math.ceil(getCanvasWidth() / 8)
        const yDim = Math.ceil(getCanvasHeight() / 8)

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
            const battleRoom = new BattleRoom(this.player!, this.game, rewards[i])
            this.components.backgroundObjects.push(new Teleporter(positions[i], battleRoom, this.player!, rewards[i]))
        }
    }

    spawnEnemies() {
        if (this.level === 10) {
            this.boss = new Pope(160, 160);
            this.boss.player = this.player!;
            this.boss.setRoom(this)
            this.components.enemies.push(this.boss)
        }

        // TODO add enemies based on room level
        const randomVillager = randInt(1, this.level + 1)
        for (let _ in Array.from(Array(randomVillager).keys())) {
            const villager = new Villager(randInt(20, this.width - 20), randInt(20, this.height - 20), 0);
            villager.player = this.player!;
            villager.setRoom(this)
            console.log(villager)
            console.log(this.enemies)
            this.components.enemies.push(villager)
        }

        const randomMage = randInt(0, this.level + 1)
        for (let _ in Array.from(Array(randomMage).keys())) {
            const mage = new Mage(randInt(0, this.width), randInt(0, this.height));
            mage.player = this.player!;
            mage.setRoom(this)
            this.components.enemies.push(mage)
        }

        this.inCombat = true;
    }
}

export default BattleRoom