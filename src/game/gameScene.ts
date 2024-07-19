import k from "./kaplay";
import "kaplay/global";
import player_CMP_movement from "./player/CMP_movement";
import player_CMP_playerMoveZone from "./player/CMP_playerMoveZone";
import { $tutorEnabled } from "../stores";

export default async function gameScene() {
    k.add([
        rect(k.width(), k.height()),
        fixed(),
    ]);

    // Adding game objects to screen

    // Load a sprite asset from "sprites/bean.png", with the name "bean"
    loadSprite(
        "bean",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAA1CAYAAADyMeOEAAAAAXNSR0IArs4c6QAAAn5JREFUaIHdm7txAkEMhnUMBUAFEEPmcUgHhHRBQXThkA4IGTKIoQLoAEcw60PS6XkP/zNO7Nt/95O099hdV5Co2WTx9LS/PS5V1FhKhZt6QTlFBSHEJBOUkicAbugugEtZ4M3QUtjVbq32Pmz3quu14GpoCawFlJM0CFJ4FXQTcDQspqYASMDF0BxwG7B1UfBh0H0DLoXBN4E3QlPAXcOW0oKPOLMhAFPiqpOMxtCANXMczfTQgAF0Y/uIghWYe5R4gkX5Up6S+S2CxjrQvjVRPpS0/i9vNbQE2ALb5BnlLwVn797l4A7bfQgwNSju917fut7Q3C0+CpbzjAwoVkklH5lp6fy73s8h11jacX/nxj8C0H8TX+/n94+mjbYP63VU1bw40Uy3/TyuD9JaGVKxNzJK8+kS5tOluk3bopI39iz3SEEsAZJkm/LlKnU2WTxFmc4o9yZPSzVJfAGQ8qYaRYLXvaK8MR/sd6o5vdqt3QPMCqqm/djbgeSlQjog7jUywv8lE7SnQ42n9gtLKjd0prLeF0zP6aHrAzrj46Jv+veZxpI4vj0uVcQmXFsV4p3nt8elQjOtBWhzSkT0NQLI2/HvWlSAyDk99Bsat06W9pz++foO89qcjmFeAEWmPSXet00A12qop8SjsxOpP9BYtrue29rgSRb7w15OsBL3ZHtzOqLtI6bSB3R0tqnBR11fSrpPjd68PLuWmdNBux1E3ZxT9qejwa07pmpoAP9Zk+zNPq4P7hFsPnMiHRQ3sCxf90EbgG4OzHHighh6jgwg92ikRBEH5wCSjknW1bfzoekHYrPV6ingl7qEt34kDepkP0DMgkfqiklf/4fjF/Soc3nSQqqQAAAAAElFTkSuQmCC",
    );
    loadSprite(
        "ghosty",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA8CAYAAAApK5mGAAAAAXNSR0IArs4c6QAAAgRJREFUaIHtmktywyAMhmWPD5CcIFnHM7lbTtK7dSZexyeIb5BuSsfFgB4grKb8q9Yg0IfEwzgdCHU6XF5SW6rmZeq4NmyDGiC+OGDkinuA+KKAoRUsgKyFQSULKTAfn3euT6hu1zFZnoKKFqRgNCBCSoHFoIIPYzC1QHzFwEJQmwfWYNYKgflQv/6xDOOEQfXuj78AQ1GfKrQIE/JpHYzBf5AydEqtPpJBKNleB0ADwvYGiSOcNjF/3DwKplwuDGZzu47sNrH6LijJOZSrkBOSweHYokA5DpSwjymW0j338Pl4xudGqqxWe6oph0niMKYNELY6nY9j0JHH8w7nIy+9uPUpEkUo5EjMuZoDBEAAyjktUG05A4SJFCEJVMxG+zhFTjmOI1hdKRRmdzpcXp2/bNc8kFL3KM65csjyKFMag7frPqShBmRdDci6GpB1NSDrakDW1YCsS3zaLn0dXEoiIOw9xpVjYJT3Ie7gsFOOc3GIXQeX7g+ACaR1C1qy3+w3Vv+T4N4/AyADUb5vlmxLOjBvt2yLgaTR0W6rRci6/ieQ9mfEkqoeIW3AzT7kn8O4+8+8TJv78ppRGkIO1HSi5JINIEg5igNUJ0vDAHwDaTiA1eXCUDPmZw6tOwiloGQ0NSKwVghStcNcSQ6ob7WxzsvUmY4QAD1KLr3NAwHgUOu5+gU1E/8vo/BmaAAAAABJRU5ErkJggg==",
    ); // Load a sprite asset from "sprites/bean.png", with the name "bean"

    

    // A "Game Object" is the basic unit of entity in kaboom
    // Game objects are composed from components
    // Each component gives a game object certain capabilities

    // add() assembles a game object from a list of components and add to game, returns the reference of the game object
    const player = add([
        sprite("TinyBattle_15_5"), // sprite() component makes it render as a sprite
        pos(k.center()), // pos() component gives it position, also enables movement
        rotate(0), // rotate() component gives it rotation
        anchor("center"), // anchor() component defines the pivot point (defaults to "topleft")
        player_CMP_movement(1), // custom component for player/boat movement
        area(),
        layer("player"),
    ]);

    add([
        sprite("TinyBattle_7_3"), // sprite() component makes it render as a sprite
        pos(),
        rotate(0), // rotate() component gives it rotation
        anchor("center"), // anchor() component defines the pivot point (defaults to "topleft")
        player_CMP_playerMoveZone(player, 32),
        layer("player"),
    ]);

    const tutorText = add([
        text("Use\n\nKeys", {font: "KennyPixel", size: 16, align: "center"}),
        color(BLACK),
        pos(center().x, center().y - 35),
        anchor("center"),
        layer("ui"),
    ])

    const tutorPic = add([
        sprite("input_33_19"),
        pos(center().x, center().y - 32),
        anchor("center"),
        layer("ui"),
    ]);

    k.onKeyPress(["space", "up", "down", "left", "right"], () => {
        if (tutorText.exists()) {
            destroy(tutorText);
            destroy(tutorPic);
        }
        $tutorEnabled.set(false);
    });

    (globalThis as any).player = player;

    // Add multiple game objects
    for (let i = 0; i < 3; i++) {
        // generate a random point on screen
        // width() and height() gives the game dimension
        const x = rand(0, width());
        const y = rand(0, height());

        add([
            sprite("ghosty"),
            pos(x, y),
        ]);
    }
}
