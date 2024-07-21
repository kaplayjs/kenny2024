import type { Collision, GameObj } from "kaplay";

export default function collide() {
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
        }
    }
}