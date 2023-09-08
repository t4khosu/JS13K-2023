import {GameObjectClass} from "kontra";
import Room from "./rooms/room";
import StartRoom from "./rooms/startRoom";
import {Player} from "./entities/player";
import {getCanvasHeight, getCanvasWidth} from "./utils/utils";

class Game extends GameObjectClass{
    startRoom: Room;
    currentRoom!: Room;
    player: Player;
    constructor() {
        super();
        this.player = new Player(0, 0);
        this.startRoom = new StartRoom(this.player, this);
        this.goToStartRoom();
    }

    goToStartRoom(){
        this.goToRoom(this.startRoom)
    }

    goToRoom(room: Room){
        room.reset();

        this.player.setRoom(room);
        this.currentRoom = room;
        if(! (room instanceof StartRoom)){
            room.spawnTimer.start()
        }
        this.player.setPos(getCanvasWidth() / 2, getCanvasHeight() * 0.8)
    }

    update(){
        this.currentRoom.update();
    }

    render(){
        this.currentRoom.render();
    }
}

export default Game;