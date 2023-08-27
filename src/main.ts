import {init, GameLoop, initKeys, load} from 'kontra'
import {Player} from "./entities/player";
import {BigDagger, SmallDagger, Staff} from "./entities/weapon";
import {Mage, Villager} from "./entities/enemies";
import {cleanSpells, getSpells, initMouse} from "./utils";
import Room from "./entities/room";

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
        },
        render: () => {
            room.render()
        }
    }).start()
});
