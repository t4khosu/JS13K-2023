import {init, GameLoop, initKeys, load} from 'kontra'
import {Player} from "./entities/player";
import Room from "./entities/room";
import {initMouse} from "./utils/mouse";
import {cleanSpells, getSpells} from "./utils/utils";
import {BigDagger, SmallDagger} from "./entities/weapons/daggers";
import {Staff} from "./entities/weapons/staffs";
import {Villager} from "./entities/enemies/villager";
import {Mage} from "./entities/enemies/mage";

let {canvas} = init();

initKeys()
initMouse(canvas);

load(
    'characters.png', 'tiles.png',
).then(function () {
    const room = new Room()

    GameLoop({
        update: () => {
            room.update()

            cleanSpells();
            getSpells().forEach(s => !s.removeFlag && s.update())
        },
        render: () => {
            room.render()

            getSpells().forEach(s => !s.removeFlag && s.render())
        }
    }).start()
});
