import { Vec2 } from "kaplay";

function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

export default function player_CMP_cameraFollow(vec?: Vec2, viewWidth?: number, viewHeight?: number) {
    let me: any;

    return {
        add() {
            me = this as any;
        },
        update() {
            if (vec && viewWidth !== undefined && viewHeight !== undefined) {
                const halfViewWidth = viewWidth / 2;
                const halfViewHeight = viewHeight / 2;

                // Clamp camera position so it doesn't show outside the level
                const clampedX = clamp(me.pos.x, halfViewWidth, vec.x - halfViewWidth);
                const clampedY = clamp(me.pos.y, halfViewHeight, vec.y - halfViewHeight);

                camPos(clampedX, clampedY);
            } else {
                camPos(me.pos);
            }
        }
    }
}