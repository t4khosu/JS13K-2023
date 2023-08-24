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
    player.giveWeapon(new BigDagger());

    const villager = new Villager(250, 150);
    villager.giveWeapon(new SmallDagger())
    villager.setPlayer(player);

    const villager2 = new Villager(350, 200);
    villager2.giveWeapon(new SmallDagger())
    villager2.setPlayer(player);

    player.dummyTargets = [villager, villager2]

    GameLoop({
        update: () => {
            !villager.remove && villager.update()
            !villager2.remove && villager2.update();
            player.update()
        },
        render: () => {
            !villager.remove && villager.render()
            !villager2.remove && villager2.render();
            player.render()
        }
    }).start()
});
