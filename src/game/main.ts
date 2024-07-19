import k from "./kaplay";

// setup bootstrapper

k.scene("init", () => {
  k.add([
    k.text("bootstrapped", {font: "KennyBold", size: 48}),
    k.color(k.BLACK)
  ])

  //TODO: run game code :D
})

// bootstrapper

k.go("init");