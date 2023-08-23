import {init, GameLoop, initKeys, load} from 'kontra'
import {Player} from "./entities/player";
import {BigDagger, SmallDagger} from "./entities/weapon";
import {Villager} from "./entities/enemies";
import {initMouse} from "./utils";

let { canvas } = init();
initKeys()
initMouse(canvas);

load(
    'characters.png',
).then(function () {
    const player = new Player()
    player.giveWeapon(new BigDagger());

    const villager = new Villager(250, 150);
    villager.giveWeapon(new SmallDagger())
    villager.setPlayer(player);

    player.dummyTargets = [villager]

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
