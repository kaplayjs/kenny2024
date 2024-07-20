import { k } from "../kaplay";

export default function misc_drawLoadingScreen(progress: number, opacity:number): void {
    let red = k.RED.lerp(k.WHITE, 0.5)
    let green = k.GREEN.lerp(k.WHITE, 0.5)
    let offset = 100

    k.drawRect({
        width: k.width(),
        height: k.height(),
        color: k.BLACK,
		opacity: opacity
    }),

    // full bar
    k.drawRect({
        width: k.width() - 100,
        height: 3,
		anchor: "center",
		pos: k.center(),
		color: k.GREEN,
		opacity: opacity,
	})

    // progress bar
	let mappedWidth = k.map(progress, 0, 1, 0, k.width() - offset) 
	k.drawRect({
		width: mappedWidth,
		height: 4,
		anchor: "left",
		pos: k.vec2(44, k.center().y),
		color: red.lerp(green, progress),
		opacity: opacity,
	})

    let boatPosX = 44 + mappedWidth + 8
    k.drawSprite({
        sprite: "TinyBattle_13_8",
        anchor: "center",
        angle: k.wave(-10, 10, k.time()),
        pos: k.vec2(boatPosX, k.center().y),
		opacity: opacity
	})
}