import {imageAssets, randInt, TileEngine, Vector} from "kontra";
import {getBackGroundTileMap} from "../utils/tile-maps";
import {Enemy} from "../entities/enemies/enemy";
import {Timer} from "../entities/timer";
import {Reward} from "../entities/reward";
import {getRewards} from "../utils/reward-util";
import {Player} from "../entities/player";
import Interactable from "../entities/interactable";
import {getCanvasHeight, getCanvasWidth, wallHeight} from "../utils/utils";
import Teleporter from "../entities/teleporter";
import StageDisplay from "../gui/stage-display";
import {Mage} from "../entities/enemies/mage";
import {Villager} from "../entities/enemies/villager";
import Pope from "../entities/enemies/pope";
import GameRoom from "./gameRoom";
import BossHealthBar from "../gui/bossHealthBar";

class BattleRoom extends GameRoom{
    level: number = 1
    inCombat = false
    reward?: Reward
    spawnTimer: Timer = new Timer(60, () => this.spawnEnemies()).start();

    constructor(player: Player, reward: Reward | undefined = undefined) {
        super(player);
        this.reward = reward;

        const xDim = Math.ceil(getCanvasWidth() / 8)
        const yDim = Math.ceil(getCanvasHeight() / 8)

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
        if(this.level === 1){
            const room = new BossRoom(this.player, new Pope(getCanvasWidth()/2, getCanvasHeight()/2))
            this.components.backgroundObjects.push(new Teleporter(getCanvasWidth()/2, room, this.player))
            return;
        }

        const positions = [getCanvasWidth()/4, getCanvasWidth()/2, 3*getCanvasWidth()/4]
        const rewards = getRewards(0, 3);

        for(let i = 0; i < positions.length; i++){
            const battleRoom = new BattleRoom(this.player, rewards[i])
            battleRoom.level = this.level + 1;
            this.components.backgroundObjects.push(new Teleporter(positions[i], battleRoom, this.player, rewards[i]))
        }
    }

    randomPosition = () => Vector(
        randInt(50, getCanvasWidth() - 50),
        randInt(wallHeight + 20, getCanvasHeight() - 20)
    )

    spawnEnemies() {
        // TODO add enemies based on room level
        const randomVillager = randInt(1, this.level + 1)
        for (let _ in Array.from(Array(randomVillager).keys())) {
            const pos = this.randomPosition();
            const villager = new Villager(pos.x, pos.y, 0);
            villager.player = this.player!;
            villager.setRoom(this)
            this.enemies.push(villager)
        }

        const randomMage = randInt(0, this.level + 1)
        for (let _ in Array.from(Array(randomMage).keys())) {
            const pos = this.randomPosition();
            const mage = new Mage(pos.x, pos.y);
            mage.player = this.player!;
            mage.setRoom(this)
            this.enemies.push(mage)
        }

        this.inCombat = true;
    }
}

class BossRoom extends BattleRoom{
    boss: Enemy;
    constructor(player: Player, boss: Enemy){
        super(player, undefined)

        boss.setRoom(this);
        boss.player = player;
        this.gui.push(new BossHealthBar(50, boss))
        
        this.boss = boss;
    }

    spawnEnemies(): void {
        this.enemies.push(this.boss);
    }
}

export default BattleRoom