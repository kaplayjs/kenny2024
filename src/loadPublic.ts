import { k } from "./kaplay";
import utils_IMP_kennyPackageTile from "./utils/IMP_kennyPackageTile";

export default async function loadPublic() {
    await utils_IMP_kennyPackageTile("TinyBattle", "./kenny/2D/Tiny%20Battle/Tilemap/tilemap_packed.png", 198, 18, 16);
    await utils_IMP_kennyPackageTile(
        "input",
        "./kenny/2D/1-Bit%20Input%20Prompts/Tilemap/tilemap_black_packed.png",
        816,
        34,
        16,
    );

    k.loadSound("menuSong", "./menuMusic/menuSong.wav");
    k.loadSound("playingSong", "./menuMusic/playingSong.wav");

    k.loadSprite("logo", "./logo.png");
}
