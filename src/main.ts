import {init, GameLoop, initKeys, load} from 'kontra'
import {Player} from "./entities/player";
import {initMouse} from "./utils/mouse";
import StartRoom from "./rooms/startRoom";
import Game from "./game";
import {setCanvasBoundaries} from "./utils/utils";

let {canvas} = init();
setCanvasBoundaries(canvas)

initKeys()
initMouse(canvas);

load(
    'characters.png', 'tiles.png', 'icons.png'
).then(function () {
    const game = new Game();
    // const player = new Player(60, 60)
    // const room = new Room(player)
    // const gui = new Gui(player, room);

    const player = new Player(canvas.width / 2, canvas.height * 0.8)
    const room = new StartRoom(player);

    GameLoop({
        update: (dt: number) => game.update(dt),
        render: () => game.render()
    }).start()

    // update: (dt) => {
    //     room.update(dt);
    //     // room.update(dt)
    //     // gui.update();
    // },
    // render: () => {
    //     room.render();
    //     // room.render()
    //     // gui.render();
    // }
});
