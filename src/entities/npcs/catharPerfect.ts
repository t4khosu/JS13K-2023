import {Character} from "../character";
import Room from "../../rooms/room";
import {getSpriteById} from "../../utils/sprite";
import {Player} from "../player";
import WinRoom from "../../rooms/winRoom";
import Game from "../../game";
import {PenColor} from "../../utils/colorize";

class CatharPerfect extends Character{
    startMonologs: string[][] = [
        [
        "Brave Cathar. It seems like Catholic Soldiers killed you",
        "Without consolamentum you must be reborn",
        "Go through the door next to me and re-enter the field of war",
        "Otherwise you may never receive salvation",
        ],
        [
            "Both gods will grant you their help on your way",
            "Choose wisely what help you accept",
        ]
    ]

    endMonolog: string[] = [
        "I seems like the catholics fled Toulouse seeing their leader die",
        "With the might bestowed upon me as a Cathar Perfect",
        "I will make a great exception and hold a consolamentum for you",
        "May you achieve your deserved salvation"
    ]

    constructor(x: number, y: number, room?: Room) {
        super(x, y, getSpriteById(3, PenColor.Blue), room);
        this.inbound = false;
    }

    talk(){
        if(this.room instanceof WinRoom){
            Game.getInstance().startChat(this.endMonolog)
        }else{
            Game.getInstance().startChat(this.startMonologs[Math.min(1, Game.getInstance().deaths)])
        }
    }

    getLookingDirection(): number {
        return Math.sign(Player.getInstance().x - this.world.x);
    }
}

export default CatharPerfect;