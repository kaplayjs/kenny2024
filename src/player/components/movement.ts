import type { GameObj } from "kaplay";
import { k } from "../../kaplay";

import utils_MATH_angleToXyVec from "../../utils/MATH_angleToXyVec";

export function playerMovement(speed = 1) {
    let me: GameObj;

    return {
        add(this: GameObj) {
            me = this;
            me.vel = k.vec2(0, 0);
            me.ang = 0;
        },
        update() {
            me.ang = me.ang % 360;

            if (me.ang < 0) {
                me.ang = 360 + me.ang;
            }

            // check if facing left and flip sprite

            if (me.ang > 90 && me.ang < 270) {
                me.flipX = true;
            } else {
                me.flipX = false;
            }

            if (k.isKeyDown("left")) {
                me.ang -= 240 * k.dt();
            }
            if (k.isKeyDown("right")) {
                me.ang += 240 * k.dt();
            }

            if (k.isKeyDown("up")) {
                me.vel = k.vec2(
                    me.vel.x + (utils_MATH_angleToXyVec(me.ang).x * speed * k.dt()),
                    me.vel.y + (utils_MATH_angleToXyVec(me.ang).y * speed * k.dt()),
                );
            }

            if (k.isKeyDown("down")) {
                me.vel = k.vec2(
                    me.vel.x - (utils_MATH_angleToXyVec(me.ang).x * speed * k.dt()),
                    me.vel.y - (utils_MATH_angleToXyVec(me.ang).y * speed * k.dt()),
                );
            }

            if (k.isKeyDown("space")) {
                me.vel = k.vec2(0, 0);
            }

            me.pos.x += me.vel.x * 120 * k.dt();
            me.pos.y += me.vel.y * 120 * k.dt();

            me.vel.x = Math.max(-speed, Math.min(speed, me.vel.x));
            me.vel.y = Math.max(-speed, Math.min(speed, me.vel.y));
        },
    };
}
