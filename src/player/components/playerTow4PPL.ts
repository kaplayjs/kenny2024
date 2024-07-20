import type { GameObj } from "kaplay";
import { k } from "../../kaplay";
import utils_MATH_XyToAngle from "../../utils/MATH_XyToAngle";

export function playerTow(player: any, hookeConstant: number = 0.1) {
    let me: GameObj;

    return {
        isBroken: false,

        add(this: GameObj) {
            me = this;

            me.vel = k.vec2(0, 0);
            me.isBroken = false;
            me.distance = {};
        },
        update() {
            if (!me.isBroken) {
                me.vel.x += (hookeConstant * (player.pos.x - me.pos.x)) / 2 * k.dt();
                me.vel.y += (hookeConstant * (player.pos.y - me.pos.y)) / 2 * k.dt();

                player.vel.x += (hookeConstant * (me.pos.x - player.pos.x)) / 2 * k.dt();
                player.vel.y += (hookeConstant * (me.pos.y - player.pos.y)) / 2 * k.dt();

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

            me.pos.x += me.vel.x * 120 * k.dt();
            me.pos.y += me.vel.y * 120 * k.dt();
        },
    };
}
