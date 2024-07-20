import utils_MATH_XyToAngle from "../utils/MATH_XyToAngle";

export default function player_CMP_playerTow4PPL(player: any, hookeConstant: number = 0.1) {
    let me: any;
    return {
        add() {
            me = this as any;
            me.vel = vec2(0, 0);
            me.isBroken = false;

            me.distance = {};
        },
        update() {
            if (!me.isBroken) {
                me.vel.x += (hookeConstant * (player.pos.x - me.pos.x)) / 2 * dt();
                me.vel.y += (hookeConstant * (player.pos.y - me.pos.y)) / 2 * dt();
    
                player.vel.x += (hookeConstant * (me.pos.x - player.pos.x)) / 2 * dt();
                player.vel.y += (hookeConstant * (me.pos.y - player.pos.y)) / 2 * dt();

                me.distance = utils_MATH_XyToAngle(vec2(player.pos.x - me.pos.x, player.pos.y - me.pos.y))

                if (me.distance.distance > 65) {
                    me.isBroken = true;
                }
            }

            if (me.vel.x >= 0){
                me.flipX = false;
            } else {
                me.flipX = true;
            }

            me.pos.x += me.vel.x * 120 * dt();
            me.pos.y += me.vel.y * 120 * dt();
        }
    }
}