import kaplay from "kaplay";

export const k = kaplay({
    background: [0, 0, 0],
    width: 320,
    height: 180,
    letterbox: true,
    font: "monospace",
});

k.loadFont("KennyBold", "kenny/Fonts/Kenney%20Bold.ttf");

export default k;

(globalThis as any).k = k;
