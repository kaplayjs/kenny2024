import { k } from "../kaplay";

export default async function utils_IMP_kennyPackageTile(
    name: string,
    location: string,
    tileamnt: number,
    tileamntx: number,
    tilesize: number = 16,
) {
    const spriteSheetData: any = {};

    for (let i = 0; i < tileamnt; i++) {
        const x: number = (i % tileamntx) * tilesize;
        const y: number = Math.floor(i / tileamntx) * tilesize;

        spriteSheetData[name + "_" + x / tilesize + "_" + y / tilesize] = {
            x: x,
            y: y,
            width: tilesize,
            height: tilesize,
        };
    }

    console.log(spriteSheetData);

    await k.loadSpriteAtlas(location, spriteSheetData);
}
