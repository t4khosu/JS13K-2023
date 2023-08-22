import {init, GameLoop, initKeys, load} from 'kontra'
import {Player} from "./entities/player";
import {BigDagger, Dagger, SmallDagger} from "./entities/weapons";
import {Villager} from "./entities/enemies";

init()
initKeys()

load(
    'characters.png',
).then(function () {
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
            villager.render()
            player.render()
        }
    }).start()
});
