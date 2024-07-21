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
    const playingSong = k.play("playingSong", { loop: true });

    playingSong.paused = true;

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
                k.area(),
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
                k.area(),
                k.body({ isStatic: true })
            ],
            "e": () => [
                k.pos(),
                k.sprite("TinyBattle_1_1"),
                k.area({ shape: new k.Rect(k.vec2(0,0), 16, 4)}),
                k.body({ isStatic: true })
            ],
            "r": () => [
                k.pos(),
                k.sprite("TinyBattle_0_5"),
                k.area(),
                k.body({ isStatic: true })
            ],
            "t": () => [
                k.pos(),
                k.sprite("TinyBattle_2_1"),
            ],
            "g": () => [
                k.pos(),
                k.sprite("TinyBattle_2_2"),
                k.area({ shape: new k.Rect(k.vec2(12,0), 4, 16)}),
                k.body({ isStatic: true })
            ],
            "q": () => [
                k.pos(),
                k.sprite("TinyBattle_0_1"),
                k.area(),
                k.body({ isStatic: true })
            ],
            "a": () => [
                k.pos(),
                k.sprite("TinyBattle_0_2"),
                k.area({ shape: new k.Rect(k.vec2(0,0), 4, 16)}),
                k.body({ isStatic: true })
            ],
            "b": () => [
                k.pos(),
                k.sprite("TinyBattle_2_3"),
            ],
            "z": () => [
                k.pos(),
                k.sprite("TinyBattle_2_5"),
                k.area(),
                k.body({ isStatic: true })
            ],
            "x": () => [
                k.pos(),
                k.sprite("TinyBattle_3_5"),
                k.area(),
                k.body({ isStatic: true })
            ],
            "1": () => [
                k.pos(),
                k.sprite("TinyBattle_0_3"),
            ],
            "2": () => [
                k.pos(),
                k.sprite("TinyBattle_1_3"),
                k.area({ shape: new k.Rect(k.vec2(0,12), 16, 4)}),
                k.body({ isStatic: true })
            ],
            "3": () => [
                k.pos(),
                k.sprite("TinyBattle_2_3"),
                k.area(),
                k.body({ isStatic: true })
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
                        this.add([
                            k.pos(8, 8),
                            k.circle(48),
                            k.color(55,55,120),
                            k.z(4),
                            k.opacity(0.0),
                            "DeliverRadius",
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
    let packages: any[] = []
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
                    (this as any).add([
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
                    (this as any).add([
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
                    (this as any).add([
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

    // helper functions

    // if point is in circle
    function testCirclePoint(circle: any, point: any) {
        const dx = point.x - circle.center.x;
        const dy = point.y - circle.center.y;
        const distanceSquared = dx * dx + dy * dy;
        return distanceSquared <= circle.radius * circle.radius;
    }

    // if point is currently on screen (with a small offset at the top and bottom)
    function isOnScreen(pos: any) {
        const screenRect = new k.Rect(k.vec2(0, 16), k.width(), k.height());
        return !k.testRectPoint(screenRect, pos)
                && screenRect.sdistToPoint(pos) > 0 * 0;
    }

    // game functions
    function makePackage() {
        return {
            name: PACKAGE_ADJECTIVES[Math.floor(Math.random() * PACKAGE_ADJECTIVES.length)] + " " + PACKAGE_ITEMS[Math.floor(Math.random() * PACKAGE_ITEMS.length)],
            target: Cities[Math.floor(Math.random() * Cities.length)],
            time: Math.random() * packageTimerRange + packageTimeBase
        }
    }

    // when the player attempts to deliver a package
    async function deliverPackage(i: any) {
        if (!packages[i]) return;       // if player is currently selecting a package
        if (!testCirclePoint(new k.Circle(packages[i].target.pos.add(8,8), 48), plr.player.pos)) return;    // if the player is in range of the city to deliver
        if (packages[i].time <= 0) {
            // failed to deliver package in time, even though they delivered it. (should never happen, unless wild error)
        } else {
            score += Math.floor(packages[i].time * 10);
            console.log("Delivered the package: (" + packages[i].name + ", " + packages[i].target + ", " + packages[i].time + ")!");
            packages[i] = null
            // add sound effect and animations (tween)

        }
        await new Promise(resolve => setTimeout(resolve, 10 * 0));   // time to receive new packages? or just could be instant with some delivered feedback
        packages[i] = makePackage();
        // add sound effect and animations (tween)

    }

    // spawns obstacles
    function spawnObstacles(amount: number) {
        for (var i = 0; i < amount; i++) {
            // choose random empty water tile from level, preferably not a tile within 4 tiles of the player

            // choose random obstacle sprite

            // spawn obstacle on tile, maybe with animation.

        }
    }

    spawnObstacles

    // when obstacle is hit by either boat
    function hitObstacle(obstacle: any) {
        obstacle.destroy();
        score -= 250;
        if (score < 0) score = 0;
        
        // add sound effects or animation

    }

    hitObstacle

    // initializing the game
    function playGame() {        
        for (var i = 0; i < 3; i++) {
            packages[i] = makePackage()
        }
    }

    let deadCheck = false;

    // game loop
    k.onUpdate(async () => {
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
                packages[i] = makePackage()
                continue;
            }
        }
        packagesUI[selectedPackageIndex].scale = k.vec2(1.33,1.33);

        // update waypoint
        let selectedPackage = packages[selectedPackageIndex]
        if  (selectedPackage) {
            if (isOnScreen(selectedPackage.target.screenPos())) {
                // points the player in the direction of the city, if offscreen
                waypointUI.opacity = 1.0;
                waypointUI.angle = k.vec2(selectedPackage.target.pos.add(8,8)).angle(plr.player.pos);
                waypointUI.pos = plr.player.pos.add(k.Vec2.fromAngle(waypointUI.angle).scale(k.wave(45, 55, k.time())));
            } else {
                // points straight down at the city, if on screen
                waypointUI.angle = 90;
                waypointUI.pos = selectedPackage.target.pos.add(16, k.wave(-16, -20, k.time() * 2));
            }
        } else {
            waypointUI.opacity = 0.0;
        }
        
        //  Checks for broken tow, and ends the game
        //
        //
        //
        //  (extra comments so people can find this important code bit)
        //
        //
        //
        //
        if (plr.tow.isBroken) {
            playingSong.stop();
            if (deadCheck == false) {
                deadCheck = true;
                await new Promise(resolve => setTimeout(resolve, 1000));
                k.go("game");
            }
        }
    })

    // Draw Score
    k.onDraw(() => {
        let scoreString = String(score)
        for (var i = 0; i < scoreString.length; i++) {
            let num = scoreString.charAt(i);
            k.drawSprite({
                sprite: "TinyBattle_" + num + "_10",
                pos: k.vec2(i*12, 8),
                anchor: "left",
                fixed: true
            })
        }
    })

    k.onKeyPress(["1", "2", "3"], (key) => {
        selectedPackageIndex = Number(key) - 1
    })

    k.onKeyPress("space", () => {
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
            playingSong.loop = true;
            playingSong.seek(menuSong.time());
            menuSong.stop();
            playingSong.paused = false;
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
