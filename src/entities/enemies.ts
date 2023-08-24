import {Character} from "./character";
import {centeredAnchor, getRandomVecDir, getSpriteById} from "../utils";
import {Sprite} from "kontra";
import {Player} from "./player";
import {Weapon} from "./weapon";
import {Timer} from "./timer";

export class Enemy extends Character {

    player: Player | undefined;
    healthBar: Sprite;
    healthBarWidth: number = 6;
    seeDistance: number = 100;
    attackTimer: Timer;

    constructor(x: number, y: number, sprite: Sprite) {
        super(x, y, sprite, 20);
        this.healthBar = Sprite({anchor: centeredAnchor, x: 0, y: -5, width: 0, height: 1, color: "#ff000099"})
        this.attackTimer = new Timer(50);
        this.addChild(this.healthBar)
    }

    update(){
        super.update();
        this.attackTimer.update();
        this.isAggro() ? this.updateAggro() : this.updateIdle()
    }

    isAggro = () => this.getDistanceToPlayer() < this.seeDistance;

    updateAggro(){
        this.moveToPlayer();
        if(this.getDistanceToPlayer() <= 60 && !this.attackTimer.isActive){
            this.attack();
            this.attackTimer.start();
        }
    }

    updateIdle(){

    }

    setPlayer(player: Player){
        this.player = player;
    }

    getDistanceToPlayer = () => this.getDistanceTo(this.player!);

    getTargets(): Character[] {
        return [this.player!]
    }

    moveToPlayer(){
        let followX = this.player?.dashing ? this.player!.x : this.player!.x + this.posToPlayer() * 40
        this.moveTo(followX, this.player!.y)
    }

    posToPlayer(){
        return this.x - this.player!.x >= 0 ? 1 : -1;
    }

    getNewDir(){
        if(this.isAggro()){
            return Math.sign(this.x - this.player!.x) < 0 ? 1 : -1;
        }else{
            return this.moveToDir;
        }
    }

    hitBy(weapon: Weapon){
        super.hitBy(weapon);
        this.healthBar.width = (this.health / this.maxHealth) * this.healthBarWidth
    }
}
export class Villager extends Enemy {
    speed: number = 1.2 + Math.random() * 0.6;
    idleAroundTimer: Timer;
    constructor(x: number, y: number) {
        super(x, y, getSpriteById(0));
        this.seeDistance = 120 + Math.random() * 80;

        this.idleAroundTimer = new Timer(250, () => {
            let v = getRandomVecDir();
            this.moveTo(this.x + v.x * 40, this.y + v.y * 40);
        }, true);
        this.idleAroundTimer.start();
    }

    updateIdle(){
        this.idleAroundTimer.update();
    }
}