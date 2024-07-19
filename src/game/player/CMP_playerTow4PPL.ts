import utils_MATH_XyToAngle, { AngleDistanceResult } from "../utils/MATH_XyToAngle";

export default function player_CMP_playerTow4PPL(player: any, hookeConstant: number = 0.001) {
    let me: any;
    return {
        add() {
            me = this as any;
            me.vel = vec2(0, 0);
            me.isBroken = false;
        },
        update() {
            if (!me.isBroken) {
                me.vel.x += (hookeConstant * (player.pos.x - me.pos.x)) / 2;
                me.vel.y += (hookeConstant * (player.pos.y - me.pos.y)) / 2;
    
                player.vel.x += (hookeConstant * (me.pos.x - player.pos.x)) / 2;
                player.vel.y += (hookeConstant * (me.pos.y - player.pos.y)) / 2;

                let distance: AngleDistanceResult = utils_MATH_XyToAngle(vec2(player.pos.x - me.pos.x, player.pos.y - me.pos.y))

                console.log(distance.distance)

                if (distance.distance > 65) {
                    me.isBroken = true;
                }
            }
            me.pos.x += me.vel.x
            me.pos.y += me.vel.y
        }
    }
}