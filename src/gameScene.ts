import k from "./kaplay";
import "kaplay/global";
import { GameObj } from "kaplay";
import player from "./player/player";
import { $tutorEnabled } from "./stores";

export default async function gameScene() {
    // TODO: remove this when done the background
    k.add([
        rect(k.width(), k.height()),
        fixed(),
        layer("bg"),
    ]);

    // Adding game objects to screen

    // Load a sprite asset from "sprites/bean.png", with the name "bean"
    loadSprite(
        "bean",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAA1CAYAAADyMeOEAAAAAXNSR0IArs4c6QAAAn5JREFUaIHdm7txAkEMhnUMBUAFEEPmcUgHhHRBQXThkA4IGTKIoQLoAEcw60PS6XkP/zNO7Nt/95O099hdV5Co2WTx9LS/PS5V1FhKhZt6QTlFBSHEJBOUkicAbugugEtZ4M3QUtjVbq32Pmz3quu14GpoCawFlJM0CFJ4FXQTcDQspqYASMDF0BxwG7B1UfBh0H0DLoXBN4E3QlPAXcOW0oKPOLMhAFPiqpOMxtCANXMczfTQgAF0Y/uIghWYe5R4gkX5Up6S+S2CxjrQvjVRPpS0/i9vNbQE2ALb5BnlLwVn797l4A7bfQgwNSju917fut7Q3C0+CpbzjAwoVkklH5lp6fy73s8h11jacX/nxj8C0H8TX+/n94+mjbYP63VU1bw40Uy3/TyuD9JaGVKxNzJK8+kS5tOluk3bopI39iz3SEEsAZJkm/LlKnU2WTxFmc4o9yZPSzVJfAGQ8qYaRYLXvaK8MR/sd6o5vdqt3QPMCqqm/djbgeSlQjog7jUywv8lE7SnQ42n9gtLKjd0prLeF0zP6aHrAzrj46Jv+veZxpI4vj0uVcQmXFsV4p3nt8elQjOtBWhzSkT0NQLI2/HvWlSAyDk99Bsat06W9pz++foO89qcjmFeAEWmPSXet00A12qop8SjsxOpP9BYtrue29rgSRb7w15OsBL3ZHtzOqLtI6bSB3R0tqnBR11fSrpPjd68PLuWmdNBux1E3ZxT9qejwa07pmpoAP9Zk+zNPq4P7hFsPnMiHRQ3sCxf90EbgG4OzHHighh6jgwg92ikRBEH5wCSjknW1bfzoekHYrPV6ingl7qEt34kDepkP0DMgkfqiklf/4fjF/Soc3nSQqqQAAAAAElFTkSuQmCC",
    );
    loadSprite(
        "ghosty",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA8CAYAAAApK5mGAAAAAXNSR0IArs4c6QAAAgRJREFUaIHtmktywyAMhmWPD5CcIFnHM7lbTtK7dSZexyeIb5BuSsfFgB4grKb8q9Yg0IfEwzgdCHU6XF5SW6rmZeq4NmyDGiC+OGDkinuA+KKAoRUsgKyFQSULKTAfn3euT6hu1zFZnoKKFqRgNCBCSoHFoIIPYzC1QHzFwEJQmwfWYNYKgflQv/6xDOOEQfXuj78AQ1GfKrQIE/JpHYzBf5AydEqtPpJBKNleB0ADwvYGiSOcNjF/3DwKplwuDGZzu47sNrH6LijJOZSrkBOSweHYokA5DpSwjymW0j338Pl4xudGqqxWe6oph0niMKYNELY6nY9j0JHH8w7nIy+9uPUpEkUo5EjMuZoDBEAAyjktUG05A4SJFCEJVMxG+zhFTjmOI1hdKRRmdzpcXp2/bNc8kFL3KM65csjyKFMag7frPqShBmRdDci6GpB1NSDrakDW1YCsS3zaLn0dXEoiIOw9xpVjYJT3Ie7gsFOOc3GIXQeX7g+ACaR1C1qy3+w3Vv+T4N4/AyADUb5vlmxLOjBvt2yLgaTR0W6rRci6/ieQ9mfEkqoeIW3AzT7kn8O4+8+8TJv78ppRGkIO1HSi5JINIEg5igNUJ0vDAHwDaTiA1eXCUDPmZw6tOwiloGQ0NSKwVghStcNcSQ6ob7WxzsvUmY4QAD1KLr3NAwHgUOu5+gU1E/8vo/BmaAAAAABJRU5ErkJggg==",
    ); // Load a sprite asset from "sprites/bean.png", with the name "bean"

    const menuSong = k.play("menuSong", { loop: true });

    menuSong.loop = true;

    // Adds level to scene
    let level: GameObj<any> = k.addLevel([
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

    const titleText = add([
        sprite("title"),
        pos(center().x, 16),
        anchor("center"),
    ]);

    const tutorText = add([
        text("Use\nArrow\nKeys  To  Move", { font: "KennyPixel", size: 16, align: "center" }),
        color(BLACK),
        pos(center().x, center().y - 35),
        anchor("center"),
        layer("ui"),
    ]);

    k.onKeyDown(["space", "up", "down", "left", "right"], () => {
        if (tutorText.exists()) {
            destroy(tutorText);
            destroy(titleText);
            const playingSong = k.play("playingSong", { loop: true });
            playingSong.loop = true;
            playingSong.seek(menuSong.time());
            menuSong.stop();
        }
        $tutorEnabled.set(false);
    });

    onUpdate(() => {
        if (!tutorText.exists()) {
            menuSong.stop();
        }
    });

    (globalThis as any).player = player;
}
