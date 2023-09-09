import Room from "./rooms/room";
import {Text} from "kontra";
import {centeredAnchor} from "./utils/sprite";
import {getCanvasHeight, getCanvasWidth} from "./utils/utils";
import {Timer} from "./entities/timer";
import Game from "./game";

class IntroRoom extends Room{
    text: Text
    texts: string[] = [
        "Inquisition in Toulouse, 1233",
        "By the order of Pope Innocent III, all Cathars must die",
        "Their belief in two gods",
        "A cruel god of the old testament",
        "A good god of the new testament",
        "Is considered heresy",
        "Your life as a Cathar",
        "Just ended"
    ]
    textId: number = 0

    fadeInTimer: Timer = new Timer(140, () => this.fateOutTimer.start()).start()

    fateOutTimer: Timer = new Timer(60, () => {
        if(!this.isShowingLastText()){
            this.fadeInTimer.start();
            this.text.text = this.texts[++this.textId]
        }else{
            this.game.goToStartRoom()
        }
    })

    constructor(game: Game) {
        super(game);
        this.text = Text({opacity:0, x: getCanvasWidth()/2, y: getCanvasHeight()/2, text: this.texts[this.textId], color: "white", font: "20px Arial", textAlign: "center", anchor: centeredAnchor});
        this.backgroundObjects.push(this.text);
    }

    update(){
        super.update();
        this.fadeInTimer.update();
        this.fateOutTimer.update();

        if(this.fadeInTimer.isActive){
            this.text.opacity = Math.min(1, this.text.opacity + 0.015)
        }
        if(this.fateOutTimer.isActive){
            this.text.opacity = Math.min(1, this.text.opacity - 0.035)
        }
    }

    isShowingLastText = () => this.textId == this.texts.length-1
}

export default IntroRoom;