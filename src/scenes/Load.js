class Load extends Phaser.Scene 
{
    constructor() 
    {
        super('loadScene');
    }

    preload() 
    {
        this.load.image('runnerBack', 'assets/runnerBack.png');
        this.load.image('groundScroll', 'assets/ground.png');
        this.load.image('groundTile', 'assets/groundTile.png');
        this.load.image('robo', 'assets/robo.png')
        this.load.image('hurt', 'assets/robo_dmg.png')
        this.load.image('dead', 'assets/robo_gameover.png')
        this.load.image('topBarrier', 'assets/lamppost.png')
        this.load.image('botBarrier', 'assets/trafficcone.png')
        this.load.image('gear', 'assets/gear.png')
        this.load.image('repairBack', 'assets/repairBack.png');
    }

    create() 
    {
        this.scene.start('playScene');
    }
}