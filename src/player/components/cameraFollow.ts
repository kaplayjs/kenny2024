import type { GameObj, PosComp, Vec2 } from "kaplay";
import { k } from "../../kaplay";

function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

export function playerCameraFollow(vec?: Vec2, viewWidth?: number, viewHeight?: number) {
    let me: GameObj<PosComp>;

    return {
        add(this: GameObj<PosComp>) {
            me = this;
        },
        update() {
            if (vec && viewWidth !== undefined && viewHeight !== undefined) {
                const halfViewWidth = viewWidth / 2;
                const halfViewHeight = viewHeight / 2;

                // Clamp camera position so it doesn't show outside the level
                const clampedX = clamp(me.pos.x, halfViewWidth, vec.x - halfViewWidth);
                const clampedY = clamp(me.pos.y, halfViewHeight, vec.y - halfViewHeight);

                k.camPos(clampedX, clampedY);
            } else {
                k.camPos(me.pos);
            }
        },
    };
}
