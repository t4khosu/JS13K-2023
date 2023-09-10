import {init, GameLoop, initKeys, load} from 'kontra'
import {initMouse} from "./utils/mouse";
import Game from "./game";
import {setCanvasBoundaries} from "./utils/utils";
import {initRewards} from "./utils/reward-util";

const {canvas} = init();
setCanvasBoundaries(canvas)

initKeys()
initMouse(canvas);

load(
    'characters.png', 'tiles.png', 'icons.png'
).then(function () {
    initRewards();

    const game = new Game();
    GameLoop({
        update: () => game.update(),
        render: () => game.render()
    }).start()
});
