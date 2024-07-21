import type { GameObj } from "kaplay";
import { k } from "../kaplay";

import { playerCameraFollow } from "./components/cameraFollow";
import { playerMovement } from "./components/movement";
import { playerMoveZone } from "./components/playerMoveZone";
import { playerTow } from "./components/playerTow4PPL";
import collide from "./components/collide";

export function player(level: GameObj<any>): { player: GameObj; tow: GameObj } {
    const player = k.add([
        k.sprite("TinyBattle_13_8"), // sprite() component makes it render as a sprite
        k.pos(k.center()), // pos() component gives it position, also enables movement
        k.rotate(0), // rotate() component gives it rotation
        k.anchor("center"), // anchor() component defines the pivot point (defaults to "topleft")
        k.area({
            collisionIgnore: ["tow", "player"],
        }),
        k.layer("player"),
        playerMovement(1), // custom component for player/boat movement
        playerCameraFollow(k.vec2(level.levelWidth(), level.levelHeight()), k.width(), k.height()),
        collide(),
        "player",
    ]);

    const tow = k.add([
        k.sprite("TinyBattle_13_5"), // sprite() component makes it render as a sprite
        k.pos(k.center()), // pos() component gives it position, also enables movement
        k.rotate(0), // rotate() component gives it rotation
        k.anchor("center"), // anchor() component defines the pivot point (defaults to "topleft")
        playerTow(player), // custom component for player/boat movement
        collide(),
        k.area(),
        k.layer("tow"),
        "player",
        "tow",
    ]);
    
    k.onDraw(() => {
        if (!tow.isBroken) {
            let tT: any = tow as any;

            k.drawLine({
                p1: player.pos,
                p2: tow.pos,
                width: k.lerp(4, 1, tT.distance.distance / 65),
                color: k.lerp(k.rgb(0, 255, 0), k.rgb(255, 0, 0), tT.distance.distance / 65),
            });
        }
    });

    k.add([
        k.sprite("TinyBattle_7_3"), // sprite() component makes it render as a sprite
        k.pos(),
        k.rotate(0), // rotate() component gives it rotation
        k.anchor("center"), // anchor() component defines the pivot point (defaults to "topleft")
        k.layer("player"),
        playerMoveZone(player, 32),
    ]);

    return { player, tow };
}
