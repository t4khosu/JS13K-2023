import {GameObjectClass} from "kontra";
import Room from "./rooms/room";
import StartRoom from "./rooms/startRoom";
import {Player} from "./entities/player";
import {getCanvasHeight, getCanvasWidth} from "./utils/utils";
import IntroRoom from "./introRoom";

class Game extends GameObjectClass{
    introRoom: IntroRoom;
    startRoom: Room;
    currentRoom!: Room;
    player: Player;
    constructor() {
        super();
        this.player = new Player(0, 0);
        this.startRoom = new StartRoom(this, this.player);
        this.introRoom = new IntroRoom(this);
        this.goToRoom(this.introRoom)
    }

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