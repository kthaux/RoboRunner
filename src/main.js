//basic main.js copied over from the rocket patrol game

let config = 
{
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play]
}

let game = new Phaser.Game(config);

// reserve keyboard vars
let keyW, keyS, keyLEFT, keyRIGHT, keyUP, keyDown;

//borderUISize = game.config.height / 15;
//borderPadding = borderUISize / 3;