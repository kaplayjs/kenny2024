import kaplay from "kaplay";
import type { KAPLAYCtx } from "kaplay";

export const k: KAPLAYCtx<{}, never> = kaplay({
  background: [255, 255, 255],
  width: 1280,
  height: 720,
  letterbox: true,
  font: "monospace",
});

k.loadFont("KennyBold", "kenny/Fonts/Kenney%20Bold.ttf")

export default k;

(globalThis as any).k = k;
