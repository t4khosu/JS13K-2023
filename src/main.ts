import {init, GameLoop, initKeys, load} from 'kontra'
import {Player} from "./entities/player";
import {BigDagger, SmallDagger} from "./entities/weapon";
import {Villager} from "./entities/enemies";
import {initMouse, mousePressed} from "./utils";

let { canvas, context } = init();
initKeys()
initMouse(canvas);

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
            console.log(mousePressed(0))
        },
        render: () => {
            villager.render()
            player.render()
        }
    }).start()
});
