import kaplay from "kaplay-beta";

export const k = kaplay({
    background: [0, 0, 0],
    width: 320,
    height: 180,
    letterbox: true,
    font: "monospace",
});

k.layers([
    "bg",
    "obj",
    "tow",
    "player",
    "ui",
], "obj");
