import {GameObjectClass} from "kontra";
import Room from "./rooms/room";
import StartRoom from "./rooms/startRoom";
import IntroRoom from "./rooms/introRoom";
import WinRoom from "./rooms/winRoom";

class Game extends GameObjectClass{
    introRoom: IntroRoom;
    startRoom: Room;
    currentRoom!: Room;

    public static _game: Game;

    private constructor() {
        super();
        this.introRoom = new IntroRoom();
        this.startRoom = new StartRoom();
        this.goToRoom(new WinRoom())
    }

    public static getInstance = (): Game => Game._game ??= new Game();

    goToStartRoom(){
        this.goToRoom(this.startRoom)
    }

    goToRoom(room: Room){
        room.init();
        this.currentRoom = room;
    }

    update = () => this.currentRoom.update();

    render = () => this.currentRoom.render();
}

export default Game;