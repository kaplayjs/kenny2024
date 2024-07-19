import k from "./kaplay";

import gameScene from "./gameScene";

import { $hiMessage } from "../stores";

// setup bootstrapper

k.scene("init", () => {
    k.add([
        k.text("bootstrapped", { font: "KennyBold", size: 48 }),
        k.color(k.BLACK),
    ]);

    // TODO: run game code :D

    k.scene("main", gameScene);

    k.go("main");
});

// bootstrapper

k.go("init");
k.debug.log($hiMessage.get());
