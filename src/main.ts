import k from "./kaplay";

import gameScene from "./gameScene";

import loadPublic from "./loadPublic";

// setup bootstrapper

k.scene("init", async () => {
    k.loadSprite("jam", "./Jam.png");

    k.add([
        k.sprite("jam"),
        k.pos(k.width() / 2, k.height() / 2),
        k.anchor("center"),
        k.scale(0.5),
    ]);

    const ctp = k.add([
        k.text("click to play", { font: "KennyBold", size: 16 }),
        k.color(k.WHITE),
    ]);

    k.add([
        k.text("made in kaplay", { font: "KennyBold", size: 24 }),
        k.color(k.WHITE),
        k.pos(0, height()),
        k.anchor("botleft"),
    ]);

    k.scene("main", gameScene);

    if ("isTauri" in window) {
        ctp.destroy();
        console.log("desktop");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        k.go("main");
    } else {
        k.onMouseDown(() => {
            k.go("main");
        });
    }
});

// bootstrapper

k.loadFont("KennyBold", "kenny/Fonts/Kenney%20Bold.ttf");
k.loadFont("KennyPixel", "kenny/Fonts/Kenney%20Pixel.ttf");

loadPublic();

k.go("init");
