import kaplay from "kaplay";

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
    "player",
    "ui",
], "obj");

export default k;

(globalThis as any).k = k;
