import { k } from "./kaplay";
// this directly loads the scenes
import "./scenes/mainMenu";
import "./scenes/clickToStart";
import "./scenes/game";
import loadPublic from "./loadPublic";
import misc_drawLoadingScreen from "./utils/MISC_drawLoadingScreen";

// bootstrapper
k.loadFont("KennyBold", "kenny/Fonts/Kenney%20Bold.ttf");
k.loadFont("KennyPixel", "kenny/Fonts/Kenney%20Pixel.ttf");

loadPublic();

k.onLoading((progress) => {
    misc_drawLoadingScreen(progress, 1)
})

k.onLoad(() => {
    let opacity = 1
    k.tween(opacity, 0, 0.25, (p) => opacity = p, k.easings.linear)

    let drawEvent = k.onDraw(() => {
        misc_drawLoadingScreen(1, opacity)
    })

    k.wait(1, () => {
        drawEvent.cancel()
        if (!k.isFocused()) k.go("clickToStart")
        else k.go("mainMenu");
    })
});
