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
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //add scrolling background sprite TODO: custom asset
        this.bg = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'bg').setOrigin(0);
        this.clouds = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'clouds').setOrigin(0);
        this.runnerBack = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'runnerBack').setOrigin(0);
    
        //add our robo boy sprite TODO: custom sprite/animation
        this.robo = this.physics.add.sprite(120, game.config.height - tileSize*4, 'robo').setScale(SCALE);
        this.robo.setGravityY(2200);
        // display score
        this.health = 3;
        score = 0;
        let scoreConfig = 
        {
            fontFamily: 'Courier',
            fontSize: '28px',
            color: '#BEBEBE',
            align: 'left',
            padding: {
            top: 5,
            bottom: 5,
            },
        }
        
        //this.healthCount = this.add.text(10, 38, "Health: " + this.health, scoreConfig);
        this.scoreCount = this.add.text(10, 0, "Score: " + score, scoreConfig);

        // music
        this.music = this.sound.add('bgm');
        this.music.setLoop(true);
        this.music.play();

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
        })
        this.time.delayedCall(3500, () => {
            this.createTopBarrier();
        })

        this.anims.create({
            key: 'walking',
            frames: 'walk',
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'dmgwalking',
            frames: 'dmgwalk',
            frameRate: 8,
            repeat: -1
        });

        this.robo.anims.play('walking');

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
        gameOver = false;

        //background for the repair section of the screen
        this.repairBack = this.add.tileSprite(game.config.width - 200 ,game.config.height, game.config.width / 3, game.config.height * 3, 'repairBack');


        this.gearbox = this.add.sprite(game.config.width - 310, 420, 'gearbox');
        this.trash = this.add.sprite(game.config.width - 93, 420, 'trash');

        //gears and screw dragging and dropping set up with reference to Nathan Altice's "They Are Listening" repo
        this.screw1 = this.add.sprite(game.config.width - 300, 200, 'screw');
        this.screw1.setInteractive({
            dropZone: true
        });
        this.screw2 = this.add.sprite(game.config.width - 130, 110, 'screw');
        this.screw2.setInteractive({
            dropZone: true
        });

        
        //GEAR 1
        this.gear1 = this.add.sprite(game.config.width - 300, 200, 'gear');
        this.gear1.setInteractive({
            draggable: true,
            useHandCursor: true
        });
        this.gear1.input.draggable = false;

        this.gear1.on('drag', (pointer, dragX, dragY)=>{
            this.gear1.x = dragX;
            this.gear1.y = dragY;

        });
        
        this.gear1.on('dragend', (pointer, dragX, dragY) => {

            //reset gear location when dragged off of repair screen
            if(pointer.x > game.config.width - 200 && pointer.y > game.config.height - 200)
            {
                this.gear1.x = game.config.width - 300;
                this.gear1.y = game.config.height - 50;
                this.gear1.setTexture('gear');

            }
        });
        

        this.gear1.on('drop', (pointer, target) => {
            if (target.texture.key === 'screw') {
                this.gear1.input.draggable = false;
                if (player.anims.getCurrentKey() === 'dmgwalking'){
                    this.robo.anims.stop();
                    this.robo.setTexture('robo');
                    this.robo.anims.play('walking');
                }
            }
        });
        
        //GEAR 2
        this.gear2 = this.add.sprite(game.config.width - 130, 110, 'gear');
        this.gear2.setInteractive({
            draggable: true,
            useHandCursor: true
        });
        this.gear2.input.draggable = false;

        this.gear2.on('drag', (pointer, dragX, dragY)=>{
            this.gear2.x = dragX;
            this.gear2.y = dragY;

        });
        
        this.gear2.on('dragend', (pointer, dragX, dragY) => {

            //reset gear location when dragged off of repair screen
            if(pointer.x > game.config.width - 200 && pointer.y > game.config.height - 200)
            {
                this.gear2.x = game.config.width - 300;
                this.gear2.y = game.config.height - 50;
                this.gear2.setTexture('gear');

            }
        });
        

        this.gear2.on('drop', (pointer, target) => {
            if (target.texture.key === 'screw') {
                if (player.anims.getCurrentKey() === 'dmgwalking'){
                    this.robo.anims.stop();
                    this.robo.setTexture('robo');
                    this.robo.anims.play('walking');
                }
                this.gear2.input.draggable = false;
            }
        });
        
        
    }

    update()
    { 
        if(!gameOver)
        {
            if(this.gear1.texture.key != 'gearBroke'){
                this.gear1.angle -= 0.5;
            }
            if(this.gear2.texture.key != 'gearBroke'){
                this.gear2.angle += 0.5;
            }
        }

        if(gameOver && Phaser.Input.Keyboard.JustDown(keyR))
        {
            this.scene.restart();
        }
        
        //variable jumping was set up with reference to Nathan Altice's "Movement Studies" repo
        // check if robo is grounded
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
       
       if(!gameOver)
       {
        this.runnerBack.tilePositionX += this.SPEED;
        this.groundScroll.tilePositionX += this.SPEED;
        this.clouds.tilePositionX += this.SPEED/4;
       }
       
       if(keyW.isDown && this.robo.y > game.config.height - tileSize*3 && !gameOver)
       {
           this.jump();
       }

       if(this.robo.isGrounded && this.robo.anims.isPaused && this.robo.texture.key != "dead"){
           this.robo.anims.resume();
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

        if(!gameOver) 
        {
            score += 1;
            this.scoreCount.text = "Score: " + score;
        }

        
    }

    jump(){
        this.robo.anims.pause();
        this.robo.setVelocityY(-1000);
        
    }

    createBotBarrier()
    {
        //creat new barrier and pass it a speed
        let botBarrier = new BotBarrier(this, this.barrierSpeed);
        this.time.delayedCall(Math.random() * (2000 - 1000) + 1000, () => {
            this.botBarrierGroup.add(botBarrier);
        });
    }

    createTopBarrier()
    {
        //creat new barrier and pass it a speed
        let topBarrier = new TopBarrier(this, this.barrierSpeed);
        this.time.delayedCall(Math.random() * (5000 - 3000) + 3000, () => {
            this.topBarrierGroup.add(topBarrier);
        });
        
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
        //this.health -= 1;
        //this.healthCount.text = "Health: " + this.health;
        //check state of the first gear
        if(this.gear1.texture.key == 'gear')
        {
            //if not yet broken, change sprite to broken
            this.gear1.setTexture('gearBroke');
            // and let it be draggable
            this.gear1.input.draggable = true;

        }
        //if one gear is broke, go to else
        else
        {
            //if both gears are broke when hit, go here
            if(this.gear2.texture.key == 'gearBroke')
            {
                //console.log('hit when both gears are broke');
                
                let topGroupArr = this.topBarrierGroup.getChildren();
                console.log(topGroupArr);
                for(let i = 0; i < topGroupArr.length; i++)
                {
                    topGroupArr[i].destroy();
                    //console.log('destroying top group');
                }

                let botGroupArr = this.botBarrierGroup.getChildren();
                for(let i = 0; i < botGroupArr.length; i++)
                {
                    botGroupArr[i].destroy();
                }
                gameOver = true;
                //this.health -= 1;
                //this.healthCount.text = "Health: " + this.health;
                this.robo.anims.stop();
                this.music.stop();
                this.robo.setTexture("dead");
                
                this.time.delayedCall(1000, () => {
                    this.sound.play('gameover');
                });

                this.time.delayedCall(3000, () => {
                    if(score > bestScore) {
                        bestScore = score;
                    }
                    this.scene.start('gameoverScene');
                });

                this.gear1.destroy();
                this.gear2.destroy();
                //console.log('destroying gears at the end');
                
            }
            else
            {
                this.gear2.setTexture('gearBroke');
                this.gear2.input.draggable = true;
                this.robo.anims.stop();
                this.robo.anims.play('dmgwalking');
            }
            
            
        }


    }

    topCollision()
    {
        let topGroupArr = this.topBarrierGroup.getChildren();
        for(let i = 0; i < topGroupArr.length; i++)
        {
            //if(this.physics.world.overlap(this.robo, topGroupArr[i]))
            //{
            //    topGroupArr[i].destroy();
            //}

            if((this.robo.y > topGroupArr[i].y) && (this.physics.world.overlap(this.robo, topGroupArr[i])))
            {
                topGroupArr[i].destroy();
            }
        }
    }
    
    takeDamage()
    {
        this.sound.play('gethit');
        this.cameras.main.flash(250, 255,0, 0)
        /*
        if(this.health == 1){
            /*
            this.health -= 1;
            this.healthCount.text = "Health: " + this.health;
            this.robo.anims.stop();
            this.music.stop();
            this.robo.setTexture("dead");
            gameOver = true;
            
            this.time.delayedCall(1000, () => {
                this.sound.play('gameover');
            });

            this.time.delayedCall(3000, () => {
                if(this.score > bestScore) {
                    bestScore = this.score;
                }
                this.scene.start('menuScene');

            });

            this.gear1.destroy();
            this.gear2.destroy();

            let topGroupArr = this.topBarrierGroup.getChildren();
            for(let i = 0; i < topGroupArr.length; i++)
            {
                topGroupArr[i].destroy();
            }

            let botGroupArr = this.botBarrierGroup.getChildren();
            for(let i = 0; i < botGroupArr.length; i++)
            {
                botGroupArr[i].destroy();
            }

            
        }

        if(this.health == 2){
            this.health -= 1;
            this.robo.setTexture("hurt");
            this.healthCount.text = "Health: " + this.health;
            this.robo.anims.stop();
            this.robo.anims.play('dmgwalking');
        }
        */
        
    }
}
