import { k } from "./kaplay";
// this directly loads the scenes
import "./scenes/mainMenu";
import "./scenes/clickToStart";
import "./scenes/game";
import loadPublic from "./loadPublic";

// bootstrapper
k.loadFont("KennyBold", "kenny/Fonts/Kenney%20Bold.ttf");
k.loadFont("KennyPixel", "kenny/Fonts/Kenney%20Pixel.ttf");

loadPublic();

k.onLoad(() => {
    k.go("clickToStart");
});
