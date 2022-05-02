class BotBarrier extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, velocity)
    {
        //sprite constructor
        super(scene, game.config.width, game.config.height - (tileSize * 2.4), 'botBarrier');
        //setup
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setVelocityX(velocity);
        this.setImmovable();
        this.newBarrier = true;
    }

    update()
    {
        if(this.newBarrier && this.x < centerX)
        {
            this.newBarrier = false;

            this.scene.createBotBarrier(this.parent, (this.velocity + (Phaser.Math.Between(0, 500))) );
        }
        if(this.x < -this.width)
        {
            this.destroy();
        }
    }

    begone(){
        this.destroy();
    }
}