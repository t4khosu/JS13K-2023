import {init, GameLoop, initKeys, load} from 'kontra'
import {Player} from "./entities/player";
import Room from "./rooms/room";
import {initMouse} from "./utils/mouse";
import Gui from "./gui/gui";
import StartRoom from "./rooms/startRoom";

let {canvas} = init();

initKeys()
initMouse(canvas);

load(
    'characters.png', 'tiles.png', 'icons.png'
).then(function () {
    // const player = new Player(60, 60)
    // const room = new Room(player)
    // const gui = new Gui(player, room);

    const player = new Player(canvas.width / 2, canvas.height * 0.8)
    const room = new StartRoom(player);

    GameLoop({
        update: (dt) => {
            room.update(dt);
            // room.update(dt)
            // gui.update();
        },
        render: () => {
            room.render();
            // room.render()
            // gui.render();
        }
    }).start()
});
