import {init, GameLoop, initKeys, load} from 'kontra'
import {Player} from "./entities/player";
import {BigDagger, SmallDagger} from "./entities/weapon";
import {Villager} from "./entities/enemies";
import {initMouse} from "./utils";

let { canvas} = init();

initKeys()
initMouse(canvas);

load(
    'characters.png',
).then(function () {
    const player = new Player()
    player.handWeapon(new BigDagger());

    const villager = new Villager(250, 150);
    villager.handWeapon(new SmallDagger())
    villager.player = player;

    const villager2 = new Villager(350, 200);
    villager2.handWeapon(new SmallDagger())
    villager2.player = player;

    player.dummyTargets = [villager, villager2]

    GameLoop({
        update: () => {
            !villager.removeFlag && villager.update()
            !villager2.removeFlag && villager2.update();
            player.update()
        },
        render: () => {
            !villager.removeFlag && villager.render()
            !villager2.removeFlag && villager2.render();
            player.render()
        }
    }).start()
});
