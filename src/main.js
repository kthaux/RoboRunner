/*
Collaborator Names: Keaton Haux, Sean Osborne, Jennifer To
Game Title: Robo Runner
Date Completed: 05/01/2022
Creative Tilt Justification: Our game implements a split screen of a sort where 1 screen is the endless runner and the other screen
are the gears that run our robot Bitsy that's running! For programming, we are happy about -programming technique we implemented-. In addition, we
are happy about the art of how Bitsy changes from happy to sad when damaged/hit and because all the art generally goes with each other and
nothing necessarily feels out of place.

MAKE SURE TO PUT WHAT PROGRAMMING TECHNIQUE THAT WE ARE HAPPY WE GOT TO IMPLEMENT


Assets
Need to Make/Modify:
- bgm
- font
- gameover sound 
- gear
- hit sound 
*/

const SCALE = 0.5;
const tileSize = 35;
let cursors;
let gameOver = false;
//maybe unnessecary with cursors
let keyW, keyA, keyS, keyD, keyR, keyLEFT, keyRIGHT, keyUP, keyDOWN, keySPACE;
let bestScore = 0;
//establish main game config and physics
let config = 
{
    type: Phaser.AUTO,
    width: 1280,
    height: 480,
    
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

    scene: [ Load, Menu, Play ] //TODO put menu back in after testing
};



let game = new Phaser.Game(config);

let centerX = game.config.width/2;
let centerY = game.config.height/2;
let keyLeft, keyRight;
let RKey, WKey;