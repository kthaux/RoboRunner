/*
Collaborator Names: Keaton Haux, Sean Osborne, Jennifer To
Game Title: Robo Runner
Date Completed: 05/01/2022
Creative Tilt Justification: Our game implements a split screen of a sort where 1 screen is the endless runner and the other screen
are the gears that run the "robot" that's running! For programming, we are happy about -programming technique we implemented-. In addition, we
are decently happy about the art because it all matches each other and nothing necessarily feels out of place.

MAKE SURE TO PUT WHAT PROGRAMMING TECHNIQUE THAT WE ARE HAPPY WE GOT TO IMPLEMENT
*/

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

    scene: [ Load, Play ] //TODO put menu back in after testing
};



let game = new Phaser.Game(config);

let centerX = game.config.width/2;
let centerY = game.config.height/2;