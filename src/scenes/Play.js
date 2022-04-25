class Play extends Phaser.Scene
{
    constructor()
    {
        super("playScene");
    }

    create()
    {
        this.SPEED = 4;
        this.barrierSpeed = -450;
        //this.physics.world.gravity.y = 2600;

        // define keys maybe not needed with cursors
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //add scrolling background sprite TODO: custom asset
        this.runnerBack = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'runnerBack').setOrigin(0);
        //add our robo boy sprite TODO: custom sprite/animation
        this.robo = this.physics.add.sprite(120, game.config.height - tileSize*3, 'robo').setScale(SCALE);
        this.robo.setGravityY(2400);
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

        //establish group for bottom barriers
        this.botBarrierGroup = this.add.group({
            runChildUpdate: true
        });
        //establish group for top barriers
        this.topBarrierGroup = this.add.group({
            runChildUpdate: true
        });
        //start spawning barriers after 2.5 seconds
        this.time.delayedCall(2500, () => {
            this.createBotBarrier();
            this.createTopBarrier();
        })


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
       if(keyW.isDown && this.robo.y > game.config.height - tileSize*3)
       {
           this.jump();
       }
       //alternate type of collision detection
       //this.physics.world.collide(this.robo, this.botBarrierGroup, this.botCollision, null, this);
       //this.physics.world.collide(this.robo, this.topBarrierGroup, this.topCollision, null, this);
       
       //check for bot collision
       if(this.physics.world.overlap(this.robo, this.botBarrierGroup))
       {
           this.botCollision();
       }
       //check for top collision
       if(this.physics.world.overlap(this.robo, this.topBarrierGroup))
       {
           this.topCollision();
       }
    }


    jump(){
        this.robo.setVelocityY(-1000);
    }

    createBotBarrier()
    {
        //creat new barrier and pass it a speed
        let botBarrier = new BotBarrier(this, this.barrierSpeed);
        this.botBarrierGroup.add(botBarrier);
    }

    createTopBarrier()
    {
        //creat new barrier and pass it a speed
        let topBarrier = new TopBarrier(this, this.barrierSpeed);
        this.topBarrierGroup.add(topBarrier);
    }

    botCollision()
    {
        console.log('detected collision with bot barrier');
    }
    topCollision()
    {
        console.log('detected collision with top barrier');
    }

    

}
