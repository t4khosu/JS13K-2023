import {init, GameLoop, initKeys, load} from 'kontra'
import {Player} from "./entities/player";
import {cleanSpells, getSpells} from "./utils/utils";
import {initMouse} from "./utils/mouse";
import {Villager} from "./entities/enemies/villager";
import {Mage} from "./entities/enemies/mage";
import {BigDagger, SmallDagger} from "./entities/weapons/daggers";
import {Staff} from "./entities/weapons/staffs";

let { canvas} = init();

initKeys()
initMouse(canvas);

load(
    'characters.png',
).then(function () {
    const player = new Player()
    player.armCanRotate = true;
    const weapon = new BigDagger();
    player.handWeapon(weapon);

    const villager = new Villager(250, 150);
    villager.handWeapon(new SmallDagger())
    villager.player = player;

    const villager2 = new Villager(450, 150);
    villager2.handWeapon(new SmallDagger())
    villager2.armCanRotate = true;
    villager2.player = player;

    const mage = new Mage(500, 300);
    mage.handWeapon(new Staff())
    mage.player = player;

    player.dummyTargets = [mage, villager, villager2]

    GameLoop({
        update: () => {
            !villager.removeFlag && villager.update()
            !villager2.removeFlag && villager2.update()
            !mage.removeFlag && mage.update();
            !player.removeFlag && player.update()
            cleanSpells();
            getSpells().forEach(s => !s.removeFlag && s.update())
        },
        render: () => {
            !villager.removeFlag && villager.render()
            !villager2.removeFlag && villager2.render()
            !mage.removeFlag && mage.render();
            !player.removeFlag && player.render()
            getSpells().forEach(s => !s.removeFlag && s.render())
        }
    }).start()
});
