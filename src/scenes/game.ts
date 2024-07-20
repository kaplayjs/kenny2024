import { k } from "../kaplay";
import { player } from "../player/player";
import { $tutorEnabled } from "../stores";

k.scene("game", () => {
    // TODO: remove this when done the background
    k.add([
        k.rect(k.width(), k.height()),
        k.fixed(),
        k.layer("bg"),
    ]);

    const menuSong = k.play("menuSong", { loop: true });

    menuSong.loop = true;

    // Adds level to scene
    let level = k.addLevel([
        "=-=+-=a g-----------",
        "-+-=qer gc----------",
        "t-==a   weeeeeet----",
        "g-c-a          wt---",
        "weeer           g---",
        "                g---",
        "                wt--",
        "                 gc-",
        "                 g--",
        "2x              zb--",
        "-1x             g---",
        "--a             g---",
        "-ca          z223---",
        "qer       z223------",
        "a     z2223c--------",
    ], {
        tileWidth: 16,
        tileHeight: 16,
        tiles: {
            " ": () => [
                k.pos(),
                k.sprite("TinyBattle_1_2"),
            ],
            "-": () => [
                k.pos(),
                k.sprite("TinyBattle_0_0"),
                // k.area(),
                // k.body({ isStatic: true }),
                "wall",
            ],
            "=": () => [
                k.pos(),
                k.sprite("TinyBattle_1_0"),
            ],
            "+": () => [
                k.pos(),
                k.sprite("TinyBattle_2_0"),
            ],
            "w": () => [
                k.pos(),
                k.sprite("TinyBattle_1_5"),
            ],
            "e": () => [
                k.pos(),
                k.sprite("TinyBattle_1_1"),
            ],
            "r": () => [
                k.pos(),
                k.sprite("TinyBattle_0_5"),
            ],
            "t": () => [
                k.pos(),
                k.sprite("TinyBattle_2_1"),
            ],
            "g": () => [
                k.pos(),
                k.sprite("TinyBattle_2_2"),
            ],
            "q": () => [
                k.pos(),
                k.sprite("TinyBattle_0_1"),
            ],
            "a": () => [
                k.pos(),
                k.sprite("TinyBattle_0_2"),
            ],
            "b": () => [
                k.pos(),
                k.sprite("TinyBattle_2_3"),
            ],
            "z": () => [
                k.pos(),
                k.sprite("TinyBattle_2_5"),
            ],
            "x": () => [
                k.pos(),
                k.sprite("TinyBattle_3_5"),
            ],
            "1": () => [
                k.pos(),
                k.sprite("TinyBattle_0_3"),
            ],
            "2": () => [
                k.pos(),
                k.sprite("TinyBattle_1_3"),
            ],
            "3": () => [
                k.pos(),
                k.sprite("TinyBattle_2_3"),
            ],
            "c": () => [
                k.pos(),
                k.sprite("TinyBattle_0_0"),
                k.area(),
                k.body({ isStatic: true }),
                {
                    add() {
                        this.add([
                            k.pos(),
                            k.color(50, 50, 50),
                            k.sprite("TinyBattle_0_6"),
                        ]);
                        this.add([
                            k.pos(0, -4),
                            k.sprite("TinyBattle_10_" + Math.floor(Math.random() * 5)),
                            "City",
                        ]);
                    },
                },
            ],
        },
    });

    // A "Game Object" is the basic unit of entity in kaboom
    // Game objects are composed from components
    // Each component gives a game object certain capabilities

    // add() assembles a game object from a list of components and add to game, returns the reference of the game object

    player(level);

    const tutorText = k.add([
        k.text("Use\nArrow\nKeys  To  Move", { font: "KennyPixel", size: 16, align: "center" }),
        k.color(k.BLACK),
        k.pos(k.center().x, k.center().y - 35),
        k.anchor("center"),
        k.layer("ui"),
    ]);

    k.onKeyDown(["space", "up", "down", "left", "right"], () => {
        if (tutorText.exists()) {
            k.destroy(tutorText);
            const playingSong = k.play("playingSong", { loop: true });
            playingSong.loop = true;
            playingSong.seek(menuSong.time());
            menuSong.stop();
        }
        $tutorEnabled.set(false);
    });

    k.onUpdate(() => {
        if (!tutorText.exists()) {
            menuSong.stop();
        }
    });
});
