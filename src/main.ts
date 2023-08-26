import {init, GameLoop, initKeys, load} from 'kontra'
import {Player} from "./entities/player";
import {BigDagger, SmallDagger, Staff} from "./entities/weapon";
import {Mage, Villager} from "./entities/enemies";
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

    const mage = new Mage(350, 200);
    mage.handWeapon(new Staff())
    mage.player = player;

    player.dummyTargets = [villager, mage]

    GameLoop({
        update: () => {
            !villager.removeFlag && villager.update()
            !mage.removeFlag && mage.update();
            player.update()
        },
        render: () => {
            !villager.removeFlag && villager.render()
            !mage.removeFlag && mage.render();
            player.render()
        }
    }).start()
});
