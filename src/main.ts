import {init, GameLoop, initKeys} from 'kontra'
import {Player} from "./entities/player";

init() // Kontra init
initKeys()

const player = new Player()

GameLoop({
    update: () => {
        player.update()
    },
    render: () => {
        player.render()
    }
}).start()