import {GameObject, GameObjectClass, getCanvas, imageAssets, randInt, Sprite, TileEngine} from "kontra";
import {getBackGroundTileMap, getWallTileMap} from "../utils/tile-maps";
import {Player} from "../entities/player";
import {Character} from "../entities/character";
import {Mage} from "../entities/enemies/mage";
import {Villager} from "../entities/enemies/villager";
import {Reward, RewardSprite} from "../entities/reward";
import {getRewards} from "../utils/reward-util";
import {Enemy} from "../entities/enemies/enemy";
import {renderSpells, updateSpells} from "../utils/spellsCollection";
import Interactable from "../entities/interactable";
import {getCanvasHeight, getCanvasWidth, wallHeight} from "../utils/utils";
import Game from "../game";
import PlayerHealthBar from "../gui/components/playerHealthBar";

type SortedComponents = {
    interactables: Interactable[],
    backgroundObjects: GameObject[],
    enemies: Enemy[],
    rewards: Reward[],
    player: Player[],
    gui: GameObject[],
}

export default class Room extends GameObjectClass {
    width: number
    height: number
    tileEngine?: TileEngine

    components: SortedComponents = {
        interactables: [],
        backgroundObjects: [],
        enemies: [],
        rewards: [],
        player: [],
        gui: [],
    }

    constructor(player: Player, game: Game) {
        super({player: player, game:game})
        this.width = getCanvasWidth()
        this.height = getCanvasHeight()
        this.components.player = [player]

        this.gui.push(new PlayerHealthBar(player))

        this.components.backgroundObjects.push(Sprite({width: getCanvasWidth(), height: wallHeight, color: "#555"}))
    }

    get gui(){
        return this.components.gui;
    }

    get interactables(){
        return this.components.interactables;
    }

    get enemies(){
        return this.components.enemies;
    }

    comeHere(){
        this.game.goToRoom(this);
    }

    addInteractable(interactable: Interactable){
        interactable.setRoom(this);
        this.interactables.push(interactable);
    }

    reset(){}

    render() {
        this.tileEngine?.render();
        Object.entries(this.components).forEach(
            ([key, value]) => value.forEach(c => c.render())
        );

        renderSpells();
    }

    update() {
        Object.entries(this.components).forEach(
            ([key, value]) => {
                // @ts-ignore
                this.components[key] = value.filter(c => {
                    c.update()
                    return !c?.removeFlag ?? true;
                });
            }
        );

        updateSpells();

    //     if (this.inCombat) {

    //         // if (this.enemies.length === removeCount) {
    //         //     this.showRewards()
    //         // }
    //
    //     } else if (this.inReward) {
    //         this.rewardLocking.update()
    //         this.rewardSprites.forEach((sprite) => {
    //             sprite.update()
    //             if (sprite.checkPlayerCollision(this.player) && !this.rewardLocking.isActive) {
    //                 this.nextLevel()
    //             }
    //         })
    //     }
    }
}
