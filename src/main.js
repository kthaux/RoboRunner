//
const SCALE = 0.5;
const tileSize = 35;
let cursors;
//maybe unnessecary with cursors
let keyW, keyA, keyS, keyD, keyLEFT, keyRIGHT, keyUP, keyDOWN;
//establish main game config and physics
let config = 
{
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    
    physics: 
    {
        default: 'arcade',
        arcade: 
        {
            debug: true,
            gravity: 
            {
                x: 0,
                y: 0
            }
        }
    },

    scene: [ Load, Play ] //TODO put menu back in after testing
};

let game = new Phaser.Game(config);