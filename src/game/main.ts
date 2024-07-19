import k from "./kaplay";

import gameScene from "./gameScene";

import loadPublic from "./loadPublic";

import { $hiMessage } from "../stores";

// setup bootstrapper

k.scene("init", () => {
    k.add([
        k.text("bootstrapped", { font: "KennyBold", size: 24 }),
        k.color(k.WHITE),
    ]);

    // TODO: run game code :D

    k.scene("main", gameScene);

    k.go("main");
});

// bootstrapper

k.loadFont("KennyBold", "kenny/Fonts/Kenney%20Bold.ttf");
k.loadFont("KennyPixel", "kenny/Fonts/Kenney%20Pixel.ttf");

loadPublic();

k.go("init");
k.debug.log($hiMessage.get());
