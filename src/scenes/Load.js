class Load extends Phaser.Scene 
{
    constructor() 
    {
        super('loadScene');
    }

    preload() 
    {
        //load images
        this.load.image('runnerBack', 'assets/runnerBack.png');
        this.load.image('groundScroll', 'assets/ground.png');
        this.load.image('groundTile', 'assets/groundTile.png');
        this.load.image('robo', 'assets/robo.png')
        this.load.image('hurt', 'assets/robo_dmg.png')
        this.load.image('dead', 'assets/robo_gameover.png')
        this.load.image('topBarrier', 'assets/lamppost.png')
        this.load.image('botBarrier', 'assets/trafficcone.png')
        this.load.image('gear', 'assets/gear.png')
        this.load.image('gearBroke', 'assets/gearBroke.png')
        this.load.image('repairBack', 'assets/repairBack.png');
        this.load.image('clouds', 'assets/clouds.png');
        this.load.image('bg', 'assets/bg.png');
        this.load.image('screw', 'assets/screw.png');
        this.load.spritesheet('walk', 'assets/robo_walk.png', {
            frameWidth: 320,
            frameHeight: 256
        });
        //load audio
        this.load.audio('gethit', './assets/hit.wav');
        this.load.audio('gameover', './assets/gameover.wav');
    }

    create() 
    {
        this.scene.start('playScene');
    }
}