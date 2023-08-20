import {init, GameLoop, initKeys, load, setImagePath, loadImage, imageAssets, Sprite} from 'kontra'
import {Player} from "./entities/player";

init()
initKeys()

load(
    'assets/characters.png',
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
