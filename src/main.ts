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
    GameLoop({
        update: (dt: number) => game.update(),
        render: () => game.render()
    }).start()
});
