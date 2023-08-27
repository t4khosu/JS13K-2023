import {init, GameLoop, initKeys, load} from 'kontra'
import {Player} from "./entities/player";
import {BigDagger, SmallDagger, Staff} from "./entities/weapon";
import {Mage, Villager} from "./entities/enemies";
import {cleanSpells, getSpells} from "./utils/utils";
import {initMouse} from "./utils/mouse";

let { canvas} = init();

initKeys()
initMouse(canvas);

load(
    'characters.png',
).then(function () {
    const player = new Player()
    const weapon = new BigDagger();
    player.handWeapon(weapon);

    const villager = new Villager(250, 150);
    villager.handWeapon(new SmallDagger())
    villager.player = player;

    const mage = new Mage(500, 300);
    mage.handWeapon(new Staff())
    mage.player = player;

    player.dummyTargets = [mage, villager]

    GameLoop({
        update: () => {
            !villager.removeFlag && villager.update()
            !mage.removeFlag && mage.update();
            !player.removeFlag && player.update()
            cleanSpells();
            getSpells().forEach(s => s.update())
        },
        render: () => {
            !villager.removeFlag && villager.render()
            !mage.removeFlag && mage.render();
            !player.removeFlag && player.render()
            getSpells().forEach(s => s.render())
        }
    }).start()
});
