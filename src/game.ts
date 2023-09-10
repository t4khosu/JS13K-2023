import {GameObjectClass} from "kontra";
import Room from "./rooms/room";
import StartRoom from "./rooms/startRoom";
import {Player} from "./entities/player";
import IntroRoom from "./rooms/introRoom";

class Game extends GameObjectClass{
    introRoom: IntroRoom;
    startRoom: Room;
    currentRoom!: Room;
    player: Player;

    public static _game: Game;

    private constructor() {
        super();
        this.player = new Player(0, 0);
        this.introRoom = new IntroRoom();
        this.startRoom = new StartRoom(this.player);
        this.goToRoom(this.startRoom)
    }

    public static getInstance(): Game{
        return Game._game ??= new Game();
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