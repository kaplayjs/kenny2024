import { k } from "../kaplay";

const LOGO_Y = 40;

k.scene("mainMenu", () => {
    k.add([
        k.rect(k.width(), k.height()),
        k.color("#aee2ff"),
    ]);

    const logo = k.add([
        k.sprite("logo"),
        k.pos(k.center().x, LOGO_Y),
        k.anchor("center"),
        k.scale(1),
    ]);

    k.onUpdate(() => {
        // const scaleInterpolation = k.wave(1, 1.2, k.time() * 10);
        // logo.scale = k.vec2(scaleInterpolation);

        logo.pos.y = k.wave(LOGO_Y, LOGO_Y + 30, k.time() * 2);
    });

    k.onMousePress(() => {
        k.go("game");
    });
});
