import {GameObjectClass} from "kontra";
import Room from "./rooms/room";
import StartRoom from "./rooms/startRoom";
import IntroRoom from "./rooms/introRoom";
import ChatBox from "./entities/chatBox";
import WinRoom from "./rooms/winRoom";

class Game extends GameObjectClass{
    introRoom: IntroRoom;
    startRoom: Room;
    currentRoom!: Room;

    currentChatBox?: ChatBox;

    public static _game: Game;

    private constructor() {
        super();
        this.introRoom = new IntroRoom();
        this.startRoom = new StartRoom();
        this.goToRoom(this.introRoom)
    }

    public static getInstance = (): Game => Game._game ??= new Game();

    goToStartRoom(){
        this.goToRoom(this.startRoom)
    }

    goToRoom(room: Room){
        room.init();
        this.currentRoom = room;
    }

    startChat(texts: string[]){
        this.currentChatBox = new ChatBox(texts)
    }

    endChat(){
        this.currentChatBox = undefined;
    }

    update = () => {
        if(this.currentChatBox){
            this.currentChatBox.update();
            return;
        }
        this.currentRoom.update();
    }

    render = () => {
        this.currentRoom.render();
        this.currentChatBox?.render();
    }
}

export default Game;