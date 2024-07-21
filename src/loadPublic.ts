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

    await k.loadSprite("Jam", "./Jam.png");

    k.loadSound("menuSong", "./menuMusic/A%20vos%20marques.wav");
    k.loadSound("playingSong", "./menuMusic/A%20ptit%20pas.wav");

    k.loadSound("BoatEngineStart", "./SFX/Boatenginestart.wav");
    k.loadSound("BoatHit", "./SFX/BoatHit.wav");
    k.loadSound("DeliverPackage", "./SFX/DeliverPackage.wav");
    k.loadSound("EngineWorking", "./SFX/Engineworking.wav");
    k.loadSound("RopePulled", "./SFX/RopePulled.wav");


    k.loadSprite("logo", "./logo.png");
}
