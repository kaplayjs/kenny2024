import type { Collision, GameObj, Vec2 } from "kaplay";

export default function collide(levelsise: Vec2) {
    let me: any;
    return {
        add() {
            me = (this as GameObj)
            me.onCollide((a: GameObj, b: Collision
            ) => {
                a
                if (b.hasOverlap()) {
                    if (Math.abs(b.displacement.x) > 0) {
                        me.vel.x = -me.vel.x; 
                    }
                    if (Math.abs(b.displacement.y) > 0) {
                        me.vel.y = -me.vel.y;  
                    }
                    me.pos.x += b.displacement.x;
                    me.pos.y += b.displacement.y;
                }
            })
        },
        update () {
            if (me.pos.x <= 0 || me.pos.x >= levelsise.x) {
                me.vel.x = -me.vel.x;
            }

            if (me.pos.y <= 0 || me.pos.y >= levelsise.y) {
                me.vel.y = -me.vel.y;
            }
        }
    }
}