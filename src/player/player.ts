import { GameObj } from "kaplay";

import k from "../kaplay";

import player_CMP_cameraFollow from "./CMP_cameraFollow";
import player_CMP_movement from "./CMP_movement";
import player_CMP_playerMoveZone from "./CMP_playerMoveZone";
import player_CMP_playerTow4PPL from "./CMP_playerTow4PPL";

export default function player(level: GameObj<any>): { player: GameObj; tow: GameObj } {
    const player = add([
        sprite("TinyBattle_13_8"), // sprite() component makes it render as a sprite
        pos(k.center()), // pos() component gives it position, also enables movement
        rotate(0), // rotate() component gives it rotation
        anchor("center"), // anchor() component defines the pivot point (defaults to "topleft")
        player_CMP_movement(1), // custom component for player/boat movement
        area({
            collisionIgnore: ["tow", "player"],
        }),
        layer("player"),
        player_CMP_cameraFollow(k.vec2(level.levelWidth(), level.levelHeight()), k.width(), k.height()),
        body(),
        "player",
    ]);

    const tow = add([
        sprite("TinyBattle_13_5"), // sprite() component makes it render as a sprite
        pos(k.center()), // pos() component gives it position, also enables movement
        rotate(0), // rotate() component gives it rotation
        anchor("center"), // anchor() component defines the pivot point (defaults to "topleft")
        player_CMP_playerTow4PPL(player), // custom component for player/boat movement
        area(),
        layer("tow"),
        body(),
        "player",
        "tow",
    ]);

    onDraw(() => {
        if (!(tow as any).isBroken) {
            let tT: any = tow as any;
            drawLine({
                p1: player.pos,
                p2: tow.pos,
                width: lerp(4, 1, tT.distance.distance / 65),
                color: lerp(rgb(0, 255, 0), rgb(255, 0, 0), tT.distance.distance / 65),
            });
        }
    });

    add([
        sprite("TinyBattle_7_3"), // sprite() component makes it render as a sprite
        pos(),
        rotate(0), // rotate() component gives it rotation
        anchor("center"), // anchor() component defines the pivot point (defaults to "topleft")
        player_CMP_playerMoveZone(player, 32),
        layer("player"),
    ]);

    return { player, tow };
}
