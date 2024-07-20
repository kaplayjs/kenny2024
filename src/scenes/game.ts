import { play, Vec2, vec2 } from "kaplay";
import { k } from "../kaplay";
import { player } from "../player/player";
import { $tutorEnabled } from "../stores";

k.scene("game", () => {
    // TODO: remove this when done the background
    k.add([
        k.rect(k.width(), k.height()),
        k.fixed(),
        k.layer("bg"),
    ]);

    const menuSong = k.play("menuSong", { loop: true });

    menuSong.loop = true;

    // Adds level to scene
    let level = k.addLevel([
        "=-=+-=a        g-===-+-=+OoPP",
        "=-=+-=a        g-===-+-=+OoPP",
        "=-=+-=a        g-===-+-=+OoPP",
        "-+P=qer        gc+=p+o====pPo",
        "tO==a          weeeeeet=+==Op",
        "g+c=a                 wt==-=o",
        "weeer                  g-p=-=",
        "                       g==-=-",
        "                       wt=o=-",
        "                        gc==-",
        "                        g-==-",
        "2x                     zb-o=-",
        "-1x                    g-==-+",
        "+=a                    g=+==-",
        "=ca                 z223p=+=-",
        "qer              z223=-==-=-o",
        "a            z2223c-==o=+=-Op",
        "a            g--=+=-====-+oPP",
        "a            g--=+=-====-+oPP",
        "a            g--=+=-====-+oPP",
    ], {
        tileWidth: 16,
        tileHeight: 16,
        tiles: {
            " ": () => [
                k.pos(),
                k.sprite("TinyBattle_1_2"),
            ],
            "-": () => [
                k.pos(),
                k.sprite("TinyBattle_0_0"),
                //k.area(),
                //k.body({ isStatic: true })
            ],
            "=": () => [
                k.pos(),
                k.sprite("TinyBattle_1_0"),
            ],
            "+": () => [
                k.pos(),
                k.sprite("TinyBattle_2_0"),
            ],
            "w": () => [
                k.pos(),
                k.sprite("TinyBattle_1_5"),
            ],
            "e": () => [
                k.pos(),
                k.sprite("TinyBattle_1_1"),
            ],
            "r": () => [
                k.pos(),
                k.sprite("TinyBattle_0_5"),
            ],
            "t": () => [
                k.pos(),
                k.sprite("TinyBattle_2_1"),
            ],
            "g": () => [
                k.pos(),
                k.sprite("TinyBattle_2_2"),
            ],
            "q": () => [
                k.pos(),
                k.sprite("TinyBattle_0_1"),
            ],
            "a": () => [
                k.pos(),
                k.sprite("TinyBattle_0_2"),
            ],
            "b": () => [
                k.pos(),
                k.sprite("TinyBattle_2_3"),
            ],
            "z": () => [
                k.pos(),
                k.sprite("TinyBattle_2_5"),
            ],
            "x": () => [
                k.pos(),
                k.sprite("TinyBattle_3_5"),
            ],
            "1": () => [
                k.pos(),
                k.sprite("TinyBattle_0_3"),
            ],
            "2": () => [
                k.pos(),
                k.sprite("TinyBattle_1_3"),
            ],
            "3": () => [
                k.pos(),
                k.sprite("TinyBattle_2_3"),
            ],
            "o": () => [
                k.pos(),
                k.sprite("TinyBattle_0_0"),
                {
                    add() {
                        this.add([
                            k.pos(),
                            k.sprite("TinyBattle_4_5"),
                        ])
                    }
                }
            ],
            "O": () => [
                k.pos(),
                k.sprite("TinyBattle_1_0"),
                {
                    add() {
                        this.add([
                            k.pos(),
                            k.sprite("TinyBattle_4_5"),
                        ])
                    }
                }
            ],
            "p": () => [
                k.pos(),
                k.sprite("TinyBattle_0_0"),
                {
                    add() {
                        this.add([
                            k.pos(),
                            k.sprite("TinyBattle_4_6"),
                        ])
                    }
                }
            ],
            "P": () => [
                k.pos(),
                k.sprite("TinyBattle_1_0"),
                {
                    add() {
                        this.add([
                            k.pos(),
                            k.sprite("TinyBattle_4_6"),
                        ])
                    }
                }
            ],
            "c": () => [
                k.pos(),
                k.sprite("TinyBattle_0_0"),
                k.area(),
                k.body({ isStatic: true }),
                k.offscreen({ hide: true }),
                "City",
                {
                    add() {
                        this.add([
                            k.pos(),
                            k.color(50,50,50),
                            k.sprite("TinyBattle_0_6"),
                        ])
                        this.add([
                            k.pos(0, -4),
                            k.sprite("TinyBattle_10_" + Math.floor(Math.random() * 5)),
                            k.z(5),
                        ])
                    }
                }
            ]
        }
    })

    // A "Game Object" is the basic unit of entity in kaboom
    // Game objects are composed from components
    // Each component gives a game object certain capabilities

    // add() assembles a game object from a list of components and add to game, returns the reference of the game object
    let plr = player(level);

    let score = 0
    let selectedPackageIndex = 0
    let packages = []
    let packagesUI = [
        k.add([
            k.pos(k.width() - 48, k.height() - 16),
            k.anchor("center"),
            k.rect(12,12),
            k.color(255,255,255),
            k.fixed(),
            k.scale(1),
            {
                add() {
                    this.add([
                        k.pos(0, 0),
                        k.anchor("center"),
                        k.sprite("TinyBattle_0_6"),
                        k.color(150, 75, 0),
                        k.scale(0.5),
                        k.opacity(1.0),
                        k.z(5),
                    ])
                }
            },
        ]),
        k.add([
            k.pos(k.width() - 32, k.height() - 16),
            k.anchor("center"),
            k.rect(12,12),
            k.color(255,255,255),
            k.fixed(),
            k.scale(1),
            {
                add() {
                    this.add([
                        k.pos(0, 0),
                        k.anchor("center"),
                        k.sprite("TinyBattle_0_6"),
                        k.color(150, 75, 0),
                        k.scale(0.5),
                        k.opacity(1.0),
                        k.z(5),
                    ])
                }
            },
        ]),
        k.add([
            k.pos(k.width() - 16, k.height() - 16),
            k.anchor("center"),
            k.rect(12,12),
            k.color(255,255,255),
            k.fixed(),
            k.scale(1),
            {
                add() {
                    this.add([
                        k.pos(0, 0),
                        k.anchor("center"),
                        k.sprite("TinyBattle_0_6"),
                        k.color(150, 75, 0),
                        k.scale(0.5),
                        k.opacity(1.0),
                        k.z(5),
                    ])
                }
            },
        ])
    ]
    let waypointUI = k.add([
        k.pos(),
        k.sprite("TinyBattle_7_2"),
        k.rotate(0),
        k.opacity(1.0),
        k.scale(1),
    ])

    // fun names
    const PACKAGE_ADJECTIVES = [
        "Cursed",
        "Dull",
        "Smelly",
        "Odd",
        "Suspicious",
        "Soggy",
        "Sticky",
        "Toy",
        "Normal",
        "Bizarre",
        "Delicate",
        "Colorful",
        "Shiny",
        "Golden",
        "Pristine",
        "Magical",
        "Mythical",
        "Radiant",
        "Perfect",
    ]
    const PACKAGE_ITEMS = [
        "Letter",
        "Necklace",
        "Robot",
        "Gemstone",
        "Treasure Map",
        "Key",
        "Painting",
        "Compass",
        "Golden Coin",
        "Box",
        "Scroll",
        "Soldier",
        "Playing Cards",
        "Telescope",
        "Bottle",
        "Instrument",
        "Shoes",
        "Fan",
        "Mug",
        "Clothes",
        "Candle",
        "Drinks",
        "Food",
        "Kitchen Supplies",
        "Computer"
    ]

    // adjustable for package timing
    let packageTimerRange = 20
    let packageTimeBase = 20

    let Cities = level.get("City")
    function makePackage() {
        return {
            name: PACKAGE_ADJECTIVES[Math.floor(Math.random() * PACKAGE_ADJECTIVES.length)] + " " + PACKAGE_ITEMS[Math.floor(Math.random() * PACKAGE_ITEMS.length)],
            target: Cities[Math.floor(Math.random() * Cities.length)],
            time: Math.random() * packageTimerRange + packageTimeBase
        }
    }

    async function deliverPackage(i) {
        if (!packages[i]) return;
        if (packages[i].time <= 0) {
            // failed to deliver package in time, even though they delivered it. (error)
        } else {
            score += packages[i].time * 10;
            console.log("Delivered the package: (" + packages[i].name + ", " + packages[i].target + ", " + packages[i].time + ")!");
            packages[i] = null
        }
        await new Promise(resolve => setTimeout(resolve, 10 * 1000));   // time to receive new packages? or just could be instant with some delivered feedback
        packages[i] = makePackage();
    }

    function playGame() {        
        for (var i = 0; i < 3; i++) {
            packages[i] = makePackage()
        }
    }
    function isOnScreen(pos) {
        const screenRect = new k.Rect(k.vec2(0, 16), k.width(), k.height());
        return !k.testRectPoint(screenRect, pos)
                && screenRect.sdistToPoint(pos) > 0 * 0;
    }

    k.onUpdate(() => {
        for (var i = 0; i < 3; i++) {
            packagesUI[i].scale = k.vec2(1, 1);

            // check if player has a package in the slot.
            if (!packages[i]) {
                packagesUI[i].children[0].opacity = 0.0
                continue;
            }
            packagesUI[i].children[0].opacity = 1.0

            // timer for delivering package
            packages[i].time -= k.dt()
            if (packages[i].time <= 0) {
                // remove package from packages and make new one in 10 seconds... (TODO)
                packages[i] = null
                continue;
            }
        }
        packagesUI[selectedPackageIndex].scale = k.vec2(1.33,1.33);

        // update waypoint
        let selectedPackage = packages[selectedPackageIndex]
        if  (selectedPackage) {
            if (isOnScreen(selectedPackage.target.screenPos())) {
                waypointUI.opacity = 1.0;
                waypointUI.angle = k.vec2(selectedPackage.target.pos.add(8,8)).angle(plr.player.pos);
                waypointUI.pos = plr.player.pos.add(k.Vec2.fromAngle(waypointUI.angle).scale(k.wave(45, 55, k.time())));
            } else {
                waypointUI.angle = 90;
                waypointUI.pos = selectedPackage.target.pos.add(16, k.wave(-16, -20, k.time() * 2));
            }
        } else {
            waypointUI.opacity = 0.0;
        }
    })

    k.onKeyPress(["1", "2", "3"], (key) => {
        selectedPackageIndex = Number(key) - 1
    })

    k.onKeyPress("f", () => {
        deliverPackage(selectedPackageIndex);
    });

    const tutorText = k.add([
        k.text("Use\nArrow\nKeys  To  Move", { font: "KennyPixel", size: 16, align: "center" }),
        k.color(k.BLACK),
        k.pos(k.center().x, k.center().y - 35),
        k.anchor("center"),
        k.layer("ui"),
    ]);

    k.onKeyDown(["space", "up", "down", "left", "right"], () => {
        if (tutorText.exists()) {
            k.destroy(tutorText);
            const playingSong = k.play("playingSong", { loop: true });
            playingSong.loop = true;
            playingSong.seek(menuSong.time());
            menuSong.stop();
            playGame();
        }
        $tutorEnabled.set(false);
    });

    k.onUpdate(() => {
        if (!tutorText.exists()) {
            menuSong.stop();
        }
    });
});
