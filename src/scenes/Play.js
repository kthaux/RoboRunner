class Play extends Phaser.Scene
{
    constructor()
    {
        super("playScene");
    }

    create()
    {
        this.SPEED = 4;
        this.physics.world.gravity.y = 2600;

        // define keys maybe not needed with cursors
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //add scrolling background sprite TODO: custom asset
        this.runnerBack = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'runnerBack').setOrigin(0);
        //add our robo boy sprite TODO: custom sprite/animation
        this.robo = this.physics.add.sprite(120, game.config.height - tileSize*3, 'robo').setScale(SCALE);
        
        // display score
        let scoreConfig = 
        {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }

        //ground tile code below used from Nathan Altice's Movement Studies
        this.ground = this.add.group();
        //Add individual tiles with collision
        for(let i = 0; i < game.config.width; i += tileSize) 
        {
            let groundTile = this.physics.add.sprite(i, game.config.height - tileSize, 'groundTile').setScale(SCALE).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }
        // put a tile sprite above the collision tiles that we can scroll
        this.groundScroll = this.add.tileSprite(0, game.config.height-tileSize, game.config.width, tileSize, 'groundScroll').setOrigin(0);

        cursors = this.input.keyboard.createCursorKeys();

        // add physics collider
        this.physics.add.collider(this.robo, this.ground);
        // GAME OVER flag
        this.gameOver = false;

        this.anims.create({
            key: 'running',
            frames: this.anims.generateFrameNumbers('running', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });
    }

    update()
    {
       this.runnerBack.tilePositionX += this.SPEED;
       this.groundScroll.tilePositionX += this.SPEED;
       if(keyW.isDown && this.robo.y > game.config.height - tileSize*3){
           this.jump();
       }
    }

    jump(){
        this.robo.setVelocityY(-900);
    }

    injuredJump(){
        this.timer = this.time.addEvent({
            delay: 500,
            callback: this.jump(),
            callbackScope: this
        })
    }

    /*
    checkCollision(rocket, ship) 
    {
        // simple AABB checking
        //check if a rocket and ship have overlapping sprites
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) 
            {
                return true;
        } 
        else 
        {
            return false;
        }
    }

    */

}
