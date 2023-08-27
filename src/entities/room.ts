import {GameObjectClass, getCanvas, getWorldRect, imageAssets, randInt, TileEngine, TileEngineClass} from "kontra";
import {weightedRandNumber} from "../utils/rand-util";
import {getBackGroundTileMap, getWallTileMap} from "../utils/tile-maps";
import {Player} from "./player";
import {BigDagger, SmallDagger, Staff} from "./weapon";
import {Mage, Villager} from "./enemies";
import {cleanSpells, getSpells} from "../utils";
import {Character} from "./character";

export default class Room extends GameObjectClass {

    level: number = 1

    width: number
    height: number

    tileEngine
    player: Player

    enemies: Character[] = []

    constructor() {
        super()
        let {width, height} = getCanvas();
        this.width = width
        this.height = height
        const xDim = Math.ceil(width / 16)
        const yDim = Math.ceil(height / 16)

        const wallScale = 2
        this.tileEngine = TileEngine({
            tilewidth: 16,
            tileheight: 16,

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
                data: getBackGroundTileMap()
            }, {
                name: 'walls',
                data: getWallTileMap().flat(),
            }
            ]
        });


        this.player = new Player(this)
        this.player.handWeapon(new BigDagger());

        this.addEnemies()
        this.player.dummyTargets = this.enemies


    }

    addEnemies() {
        // TODO add enemies based on room level

        const randomVillager = randInt(1, this.level + 1)
        for (let _ in Array.from(Array(randomVillager).keys())) {
            const villager = new Villager(randInt(0, this.width), randInt(0, this.height));
            villager.handWeapon(new SmallDagger())
            villager.player = this.player;
            villager.room = this
            this.enemies.push(villager)
        }

        const randomMage = randInt(0, this.level + 1)
        for (let _ in Array.from(Array(randomMage).keys())) {
            const mage = new Mage(randInt(0, this.width), randInt(0, this.height));
            mage.handWeapon(new Staff())
            mage.player = this.player;
            mage.room = this
            this.enemies.push(mage)
        }
    }

    nextLevel() {
        this.level++
        this.enemies = []

        this.addEnemies()

    }

    render() {
        this.tileEngine.render();
        this.enemies.forEach((enemy) => {
            !enemy.removeFlag && enemy.render()
        })
        !this.player.removeFlag && this.player.render()
        getSpells().forEach(s => s.render())

    }

    update() {
        let removeCount = 0
        this.enemies.forEach((enemy) => {
            if (enemy.removeFlag) {
                removeCount++
            } else {
                enemy.update()
            }
        })
        if (this.enemies.length === removeCount) {
            this.nextLevel()
        }
        !this.player.removeFlag && this.player.update()
        cleanSpells();
        getSpells().forEach(s => s.update())
    }

}
