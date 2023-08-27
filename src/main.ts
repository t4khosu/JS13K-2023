import {init, GameLoop, initKeys, load} from 'kontra'
import {Player} from "./entities/player";
import {BigDagger, SmallDagger, Staff} from "./entities/weapon";
import {Mage, Villager} from "./entities/enemies";
import {cleanSpells, getSpells, initMouse} from "./utils";
import Room from "./entities/room";

let { canvas} = init();

initKeys()
initMouse(canvas);

load(
    'characters.png', 'tiles.png',
).then(function () {
    const room = new Room()


    const player = new Player(room)
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
