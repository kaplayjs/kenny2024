import type { GameObj } from "kaplay-beta";
import { k } from "../../kaplay";
import utils_MATH_XyToAngle from "../../utils/MATH_XyToAngle";

export function playerTow(player: any, hookeConstant: number = 0.1) {
    let me: GameObj;

    return {
        isBroken: false,

        // this should use k.onBeforeResolution to check for checking if the collision was left, right, bottom, or top. Then you can set the velocity of the according axis
        // to the opposite (if you want it to bounce), or do some other math to make it feel less like you are hitting a wall (but keeping momentum).

        add(this: GameObj) {
            me = this;

            me.vel = k.vec2(0, 0);
            me.isBroken = false;
            me.distance = {};
        },
        fixedUpdate() {
            if (!me.isBroken) {
                me.vel.x += (hookeConstant * (player.pos.x - me.pos.x)) / 2 / 60;
                me.vel.y += (hookeConstant * (player.pos.y - me.pos.y)) / 2 / 60;

                player.vel.x += (hookeConstant * (me.pos.x - player.pos.x)) / 2 / 60;
                player.vel.y += (hookeConstant * (me.pos.y - player.pos.y)) / 2 / 60;

                me.distance = utils_MATH_XyToAngle(k.vec2(player.pos.x - me.pos.x, player.pos.y - me.pos.y));

                if (me.distance.distance > 65) {
                    me.isBroken = true;
                }
            }

            if (me.vel.x >= 0) {
                me.flipX = false;
            } else {
                me.flipX = true;
            }

            me.pos.x += me.vel.x;
            me.pos.y += me.vel.y;
        },
    };
}
