import { k } from "../kaplay";

k.scene("clickToStart", async () => {
    k.add([
        k.text("made in kaplay", { font: "KennyBold", size: 24 }),
        k.color(k.WHITE),
        k.pos(0, k.height()),
        k.anchor("botleft"),
    ]);

    k.add([
        k.sprite("Jam"),
        k.pos(k.center()),
        k.anchor("center"),
        k.scale(0.5)
    ])

    if ("isTauri" in window) {
        // wait 2 seconds
        await new Promise((resolve) => setTimeout(resolve, 1200));
        k.go("mainMenu");
    } else {
        k.add([
            k.text("click to play", { font: "KennyBold", size: 16 }),
            k.color(k.WHITE),
        ]);
        k.onMousePress(() => {
            k.go("mainMenu");
        });
    }
});
