import { Vec2 } from "kaplay";
import k from "../kaplay";

export default function utils_MATH_angleToXyVec(angle: number): Vec2 {
    // Convert degrees to radians
    var angleRad = Math.round(angle) * Math.PI / 180;

    // Calculate x and y components using trigonometry
    var x = Math.cos(angleRad);
    var y = Math.sin(angleRad);

    // Normalize x and y to range from -1 to 1
    var normalX = x / Math.sqrt(x * x + y * y);
    var normalY = y / Math.sqrt(x * x + y * y);

    return k.vec2(normalX, normalY);
}
