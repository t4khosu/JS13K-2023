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
import PlayerHealthBar from "../gui/playerHealthBar";

type SortedComponents = {
    interactables: Interactable[],
    backgroundObjects: GameObject[],
    enemies: Enemy[],
    rewards: Reward[],
    player: Player[],
    gui: GameObject[],
}

export default class Room extends GameObjectClass {
    game: Game
    tileEngine?: TileEngine
    player?: Player

    components: SortedComponents = {
        interactables: [],
        backgroundObjects: [],
        enemies: [],
        rewards: [],
        player: [],
        gui: [],
    }

    constructor(game: Game) {
        super()
        this.game = game;
        this.components.backgroundObjects.push(Sprite({width: getCanvasWidth(), height: wallHeight, color: "#555"}))
    }

    get gui(){
        return this.components.gui;
    }

    get backgroundObjects(){
        return this.components.backgroundObjects;
    }

    get interactables(){
        return this.components.interactables;
    }

    get enemies(){
        return this.components.enemies;
    }

    setPlayer(player: Player){
        this.player = player;
        this.components.player = [player]
        this.gui.push(new PlayerHealthBar(player))
    }

    comeHere(){
        this.game.goToRoom(this);
    }

    addInteractable(interactable: Interactable){
        interactable.setRoom(this);
        this.interactables.push(interactable);
    }

    init(){
        this.player?.setRoom(this);
        this.player?.setPos(getCanvasWidth() / 2, getCanvasHeight() * 0.8)
    }

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
