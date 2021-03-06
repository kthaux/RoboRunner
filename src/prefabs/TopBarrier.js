class TopBarrier extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, velocity)
    {
        //sprite constructor
        super(scene, game.config.width - 400, game.config.height - tileSize*5, 'topBarrier');
        //setup
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setVelocityX(velocity);
        this.setImmovable();
        this.newBarrier = true;

    }

    update()
    {
        if(this.newBarrier && this.x < centerX - (Phaser.Math.Between(300, 750)) && !gameOver)
        {
            this.newBarrier = false;

            this.scene.createTopBarrier(this.parent, this.velocity);
        }
        if(this.x < -this.width)
        {
            this.destroy();
        }
    }
}