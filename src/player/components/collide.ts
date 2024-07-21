import type { Collision, GameObj, Vec2 } from "kaplay";
import { k } from "../../kaplay";

export default function collide(levelsise: Vec2) {
    let me: any;
    return {
        add() {
            me = (this as GameObj)
            me.onCollideUpdate((a: GameObj, b: Collision
            ) => {
                a
                if (b.hasOverlap()) {
                    k.play("BoatHit");
                    if (Math.abs(b.displacement.x) > 0) {
                        me.vel.x = -me.vel.x; 
                    }
                    if (Math.abs(b.displacement.y) > 0) {
                        me.vel.y = -me.vel.y;  
                    }

                    me.pos.x += b.displacement.x * 2;
                    me.pos.y += b.displacement.y * 2;
                }
            })
        },
        update () {
            if (me.pos.x <= 0 || me.pos.x >= levelsise.x) {
                k.play("BoatHit");
                me.vel.x = -me.vel.x;
            }

            if (me.pos.y <= 0 || me.pos.y >= levelsise.y) {
                k.play("BoatHit");
                me.vel.y = -me.vel.y;
            }
        }
    }
}