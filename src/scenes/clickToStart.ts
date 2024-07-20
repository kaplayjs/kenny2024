import { k } from "../kaplay";

k.scene("clickToStart", () => {
    k.add([
        k.text("click to play", { font: "KennyBold", size: 16 }),
        k.color(k.WHITE),
    ]);

    k.add([
        k.text("made in kaplay", { font: "KennyBold", size: 24 }),
        k.color(k.WHITE),
        k.pos(0, k.height()),
        k.anchor("botleft"),
    ]);

    k.onMousePress(() => {
        k.go("mainMenu");
    });
});
