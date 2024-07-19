import k from "./kaplay";

import gameScene from "./gameScene";

import loadPublic from "./loadPublic";

import { $hiMessage } from "../stores";

// setup bootstrapper

k.scene("init", async () => {
    k.add([
        k.text("bootstrapped", { font: "KennyBold", size: 24 }),
        k.color(k.WHITE),
    ]);

    k.add([
        k.text("made in kaplay", { font: "KennyBold", size: 24 }),
        k.color(k.WHITE),
        k.pos(0, height()),
        k.anchor("botleft")
    ]);

    k.scene("main", gameScene);

    // wait 1 second using async js features
    await new Promise((resolve) => setTimeout(resolve, 500));

    k.go("main");
});

// bootstrapper

k.loadFont("KennyBold", "kenny/Fonts/Kenney%20Bold.ttf");
k.loadFont("KennyPixel", "kenny/Fonts/Kenney%20Pixel.ttf");

loadPublic();

k.go("init");
