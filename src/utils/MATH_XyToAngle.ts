import { Vec2 } from "kaplay-beta";

export interface AngleDistanceResult {
    angleDeg: number;
    distance: number;
}

export default function utils_MATH_xyVecToAngleDistance(vec: Vec2): AngleDistanceResult {
    // Calculate the angle in radians
    let angleRad = Math.atan2(vec.y, vec.x);

    // Convert radians to degrees
    let angleDeg = angleRad * 180 / Math.PI;

    // Ensure angle is within [0, 360) range
    angleDeg = (angleDeg < 0) ? angleDeg + 360 : angleDeg;

    // Calculate the magnitude (distance) of the vector
    let distance = Math.sqrt(vec.x * vec.x + vec.y * vec.y);

    // Round the angle and distance to avoid floating point precision issues
    angleDeg = Math.round(angleDeg);
    distance = Math.round(distance);

    return { angleDeg, distance };
}
