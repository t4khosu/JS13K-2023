import {init, GameLoop, initKeys, load} from 'kontra'
import {Player} from "./entities/player";

init()
initKeys()

load(
    'characters.png',
).then(function () {
    const player = new Player()

    GameLoop({
        update: () => {
            player.update()
        },
        render: () => {
            player.render()
        }
    }).start()
});
