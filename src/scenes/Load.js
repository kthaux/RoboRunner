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

    }

    create() 
    {
        this.scene.start('playScene');
    }
}