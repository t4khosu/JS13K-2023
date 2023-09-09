import {GameObjectClass} from "kontra";
import Room from "./rooms/room";
import StartRoom from "./rooms/startRoom";
import {Player} from "./entities/player";
import IntroRoom from "./introRoom";

class Game extends GameObjectClass{
    introRoom: IntroRoom;
    startRoom: Room;
    currentRoom!: Room;
    player: Player;
    constructor() {
        super();
        this.player = new Player(0, 0);
        this.introRoom = new IntroRoom(this);
        this.startRoom = new StartRoom(this, this.player);
        this.goToRoom(this.startRoom)
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