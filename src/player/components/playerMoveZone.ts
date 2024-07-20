import utils_MATH_angleToXyVec from "../../utils/MATH_angleToXyVec";

export function playerMoveZone(player: any, dist: number = 16): any {
    return {
        update() {
            this.pos.x = player.pos.x + utils_MATH_angleToXyVec(player.ang).x * dist;
            this.pos.y = player.pos.y + utils_MATH_angleToXyVec(player.ang).y * dist;
        },
    };
}
