import {GameObjectClass} from "kontra";
import Room from "./rooms/room";
import StartRoom from "./rooms/startRoom";
import IntroRoom from "./rooms/introRoom";
import EndRoom from "./rooms/winRoom";
import ChatBox from "./entities/chatBox";
import {getbgm, playbgm, resumebgm} from "./utils/sound/catharian";

class Game extends GameObjectClass {
    introRoom: IntroRoom;
    currentRoom!: Room;
    currentChatBox?: ChatBox;
    deaths: number = 0;

    bgm
    bgmStarted = false


    public static _game: Game;

    private constructor() {
        super();
        this.bgm = getbgm()
        this.introRoom = new IntroRoom();
        this.goToStartRoom()
    }

    public static getInstance(): Game {
        return Game._game ??= new Game();
    }

    goToStartRoom() {
        this.goToRoom(new StartRoom())
        if (!this.bgmStarted) {
            playbgm(this.bgm)
            this.bgmStarted = true
        }
    }

    goToRoom(room: Room) {
        room.init();
        this.currentRoom = room;
    }

    startChat(texts: string[]) {
        this.currentChatBox = new ChatBox(texts)
    }

    endChat() {
        this.currentChatBox = undefined;
        if (this.currentRoom instanceof EndRoom) {
            this.currentRoom.startEnd();
        }
    }

    update = () => {
        if (this.currentChatBox) {
            this.currentChatBox.update();
            return;
        }
        this.currentRoom.update();
        resumebgm()
    }

    render = () => {
        this.currentRoom.render();
        this.currentChatBox?.render();
    }
}

export default Game;