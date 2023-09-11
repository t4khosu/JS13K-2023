import {init, GameLoop, initKeys, load} from 'kontra'
import {initMouse} from "./utils/mouse";
import Game from "./game";
import {setCanvasBoundaries} from "./utils/utils";

const {canvas} = init();
setCanvasBoundaries(canvas)

initKeys()
initMouse(canvas);

load(
    'characters.png', 'tiles.png', 'icons.png'
).then(function () {
    GameLoop({
        update: () => Game.getInstance().update(),
        render: () => Game.getInstance().render()
    }).start()
});
