import {init, GameLoop, initKeys, load} from 'kontra'
import {Player} from "./entities/player";
import Room from "./entities/room";
import {initMouse} from "./utils/mouse";
import {cleanSpells, getSpells} from "./utils/utils";
import Gui from "./gui/gui";

let {canvas} = init();

initKeys()
initMouse(canvas);

load(
    'characters.png', 'tiles.png', 'icons.png'
).then(function () {
    const player = new Player(60, 60)
    const room = new Room(player)
    const gui = new Gui(player);

    GameLoop({
        update: (dt) => {
            room.update(dt)
            gui.update();
        },
        render: () => {
            room.render()

            getSpells().forEach(s => !s.removeFlag && s.render())
            gui.render();
        }
    }).start()
});
