import {init, GameLoop, initKeys, load} from 'kontra'
import {Player} from "./entities/player";
import {BigDagger, SmallDagger} from "./entities/weapons";
import {Villager} from "./entities/enemies";
import Room from "./entities/room";

init()
initKeys()

load(
    'characters.png', 'tiles.png',
).then(function () {
    const room = new Room()


    const player = new Player()
    player.setWeapon(new BigDagger());
    const villager = new Villager(250, 150);
    villager.setWeapon(new SmallDagger())
    villager.setPlayer(player);

    GameLoop({
        update: () => {
            villager.update()
            player.update()
        },
        render: () => {
            room.render()
            villager.render()
            player.render()
        }
    }).start()
});
