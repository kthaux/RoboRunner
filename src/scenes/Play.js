class Play extends Phaser.Scene
{
    constructor()
    {
        super("playScene");
    }

    create()
    {
        this.SPEED = 4;
        this.barrierSpeed = -300;
        //this.physics.world.gravity.y = 2600;
        this.ACCELERATION = 1500;
        this.MAX_X_VEL = 500;   // pixels/second
        this.MAX_Y_VEL = 5000;
        this.DRAG = 600;    // DRAG < ACCELERATION = icy slide
        this.MAX_JUMPS = 2; // change for double/triple/etc. jumps 🤾‍♀️
        this.JUMP_VELOCITY = -700;

        // define keys maybe not needed with cursors
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //add scrolling background sprite TODO: custom asset
        this.runnerBack = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'runnerBack').setOrigin(0);
        //add our robo boy sprite TODO: custom sprite/animation
        this.robo = this.physics.add.sprite(120, game.config.height - tileSize*3, 'robo').setScale(SCALE);
        this.robo.setGravityY(2200);
        // display score
        this.health = 2;
        this.score = 0;
        let scoreConfig = 
        {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'left',
            padding: {
            top: 5,
            bottom: 5,
            },
        }
        
        this.healthCount = this.add.text(0, 0, "Health: " + this.health, scoreConfig);
        this.scoreCount = this.add.text(0, 38, "Score: " + this.score, scoreConfig);

        this.healthCount = this.add.text(0, 0, "Health: " + this.health, scoreConfig);
        this.scoreCount = this.add.text(0, 38, "Score: " + this.score, scoreConfig);
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

        //background for the repair section of the screen
        this.repairBack = this.add.tileSprite(game.config.width - 200 ,game.config.height, game.config.width / 3, game.config.height * 3, 'repairBack');

        this.gear1 = this.add.sprite(game.config.width/ 2,game.config.height /2,300, 300, 'gear');
    }

    update()
    {
       // check if alien is grounded
	    this.robo.isGrounded = this.robo.body.touching.down;
	    // if so, we have jumps to spare 
	    if(this.robo.isGrounded) {
	    	this.jumps = this.MAX_JUMPS;
	    	this.jumping = false;
	    }

        if(this.jumps > 0 && Phaser.Input.Keyboard.DownDuration(cursors.up, 150)) {
	        this.robo.body.velocity.y = this.JUMP_VELOCITY;
	        this.jumping = true;
	    }
       
       if(this.jumping && Phaser.Input.Keyboard.UpDuration(cursors.up)) {
	    	this.jumps--;
	    	this.jumping = false;
	    }
       
       
       
        this.groundScroll.tilePositionX += this.SPEED;
       this.runnerBack.tilePositionX += this.SPEED;
       if(keyW.isDown && this.robo.y > game.config.height - tileSize*3)
       {
           this.jump();
       }
       
       //check for bot collision
       
       if(this.physics.world.overlap(this.robo, this.botBarrierGroup))
       {
           this.botCollision();
           this.takeDamage();
       }
       //check for top collision
       if(this.physics.world.overlap(this.robo, this.topBarrierGroup))
       {
           this.topCollision();
        }

        if(!this.gameOver) {
            this.score += 1;
            this.scoreCount.text = "Score: " + this.score;
        }
        
    }

    takeDamage()
    {
        this.cameras.main.flash(250, 255,0, 0)
        if(this.health == 1){
            this.health -= 1;
            this.healthCount.text = "Health: " + this.health;
            this.robo.setTexture("dead");
            this.gameOver = true;
        }
        if(this.health == 2){
            this.health -= 1;
            this.robo.setTexture("hurt");
            this.healthCount.text = "Health: " + this.health;
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
        let botGroupArr = this.botBarrierGroup.getChildren();
        for(let i = 0; i < botGroupArr.length; i++)
        {
            if(this.physics.world.overlap(this.robo, botGroupArr[i]))
            {
                botGroupArr[i].destroy();
            }
        }
    }
    topCollision()
    {
        let topGroupArr = this.topBarrierGroup.getChildren();
        for(let i = 0; i < topGroupArr.length; i++)
        {
            if(this.physics.world.overlap(this.robo, topGroupArr[i]))
            {
                topGroupArr[i].destroy();
            }
        }
    }
    
    takeDamage()
    {
        this.cameras.main.flash(250, 255,0, 0)
        if(this.health == 1){
            this.health -= 1;
            this.healthCount.text = "Health: " + this.health;
            this.robo.setTexture("dead");
            this.gameOver = true;
        }
        if(this.health == 2){
            this.health -= 1;
            this.robo.setTexture("hurt");
            this.healthCount.text = "Health: " + this.health;
        }
        
    }
}
