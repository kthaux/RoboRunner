/*
Collaborator Names: Keaton Haux, Sean Osborne, Jennifer To
Game Title: Robo Runner
Date Completed: 05/08/2022
Creative Tilt Justification: Our game implements a sort of split-screen system where one screen is the endless runner itself featuring our robot runner Bitsy, while the other screen is the inner mechanics that keeps Bitsy running. For programming, we are happy about implementing:
The split screen system, since it can create a sense of multitasking even though using it is completely optional
The gears, as the feeling of replacing them with locking in new ones is admittedly pretty satisfying
For art/music, we are happy about implementing:
Happy/Sad Bitsy (changes when he gets repaired/damaged, which for animations can be difficult)
Sound Effects/BGM (was some of our first times creating own audio)

*/

const SCALE = 0.5;
const tileSize = 35;
let cursors;
let gameOver = false;
//maybe unnessecary with cursors
let keyW, keyA, keyS, keyD, keyR, keyLEFT, keyRIGHT, keyUP, keyDOWN, keySPACE;
let bestScore = 0;
let score = 0;
//establish main game config and physics
let config = 
{
    type: Phaser.AUTO,
    width: 1280,
    height: 480,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    
    physics: 
    {
        default: 'arcade',
        arcade: 
        {
            debug: false,
            gravity: 
            {
                x: 0,
                y: 0
            }
        }
    },

    scene: [ Load, Menu, Instructions, Play, GameOver ] //TODO put menu back in after testing
};



let game = new Phaser.Game(config);

let centerX = game.config.width/2;
let centerY = game.config.height/2;
let keyLeft, keyRight;
let RKey, WKey;