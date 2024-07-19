import k from "../kaplay";
import "kaplay/global";
import utils_MATH_angleToXyVec from "../utils/MATH_angleToXyVec";
export default function player_CMP_movement(speed: number = 1): any {
    let me: any;
    return {
        add() {
            me = this as any;
            me.vel = k.vec2(0, 0);
        },
        update() {
            me.angle = me.angle % 360;

            if (me.angle < 0) {
                me.angle = 360 + me.angle;
            }

            // check if facing left and flip sprite

            console.log(me.angle);

            if (me.angle > 90 && me.angle < 270) {
                me.flipY = true;
            }
            else {
                me.flipY = false;
            }

            if (isKeyDown("left")) {
                me.angle -= 240 * dt();
            }
            if (isKeyDown("right")) {
                me.angle += 240 * dt();
            }

            if (isKeyDown("up")) {
                me.vel = k.vec2(
                    me.vel.x + (utils_MATH_angleToXyVec(me.angle).x * speed * dt()),
                    me.vel.y + (utils_MATH_angleToXyVec(me.angle).y * speed * dt()),
                );
            }

            if (isKeyDown("down")) {
                me.vel = k.vec2(
                    me.vel.x - (utils_MATH_angleToXyVec(me.angle).x * speed * dt()),
                    me.vel.y - (utils_MATH_angleToXyVec(me.angle).y * speed * dt()),
                );
            }

            if (isKeyDown("space")) {
                me.vel.x = me.vel.x * (0.9);
                me.vel.y = me.vel.y * (0.9);
            }

            me.pos.x += me.vel.x;
            me.pos.y += me.vel.y;

            if (me.pos.x <= 0 || me.pos.x >= k.width()) {
                me.vel.x = -me.vel.x;
            }

            if (me.pos.y <= 0 || me.pos.y >= k.height()) {
                me.vel.y = -me.vel.y;
            }

            me.vel.x = Math.max(-speed, Math.min(speed, me.vel.x));
            me.vel.y = Math.max(-speed, Math.min(speed, me.vel.y));
        },
    };
}
