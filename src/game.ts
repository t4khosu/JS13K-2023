import {GameObjectClass} from "kontra";
import Room from "./rooms/room";
import StartRoom from "./rooms/startRoom";
import IntroRoom from "./rooms/introRoom";
import EndRoom from "./rooms/winRoom";
import ChatBox from "./entities/chatBox";
import {getbgm, playbgm, resumebgm} from "./utils/sound/catharian";
import BattleRoom from "./rooms/battleRoom";

class Game extends GameObjectClass {
    introRoom: IntroRoom;
    currentRoom!: Room;
    currentChatBox?: ChatBox;
    deaths: number = 0;
    audioBufferSourceNode?: AudioBufferSourceNode


    public static _game: Game;

    private constructor() {
        super();
        this.bgm = getbgm()
        this.introRoom = new IntroRoom();
        // this.goToStartRoom()
        this.goToRoom(this.introRoom)
    }

    public static getInstance(): Game {
        return Game._game ??= new Game();
    }

    goToStartRoom() {
        this.goToRoom(new StartRoom())
    }

    goToRoom(room: Room) {
        if (room instanceof BattleRoom) {
            if (!this.audioBufferSourceNode) {
                this.audioBufferSourceNode = playbgm(this.bgm)
            }
        } else {
            if (this.audioBufferSourceNode) {
                this.audioBufferSourceNode?.stop();
                this.audioBufferSourceNode = undefined
            }
        }
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