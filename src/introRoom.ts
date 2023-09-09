import Room from "./rooms/room";
import {Text} from "kontra";
import {centeredAnchor} from "./utils/sprite";
import {getCanvasHeight, getCanvasWidth} from "./utils/utils";
import {Timer} from "./entities/timer";
import Game from "./game";

class IntroRoom extends Room{
    text: Text
    texts: string[] = [
        "Italy, 1327",
        // "The Cathar"
    ]
    textId: number = 0

    fadeInTimer: Timer = new Timer(200, () => {
        if(!this.isShowingLastText()){
            this.fateOutTimer.start()
        }else{
            this.game.goToStartRoom()
        }
    }).start()

    fateOutTimer: Timer = new Timer(60, () => {
        this.fadeInTimer.start();
        this.text.text = this.texts[++this.textId]
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
            this.text.opacity = Math.min(1, this.text.opacity + 0.01)
        }
        if(this.fateOutTimer.isActive){
            this.text.opacity = Math.min(1, this.text.opacity - 0.03)
        }
    }

    isShowingLastText = () => this.textId == this.texts.length-1
}

export default IntroRoom;