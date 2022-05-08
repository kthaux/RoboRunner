class Instructions extends Phaser.Scene {
    constructor() {
        super("instructionScene");
    }
    
    create() {
        let infoConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#BEBEBE',
            color: '#000000',
            align: 'center',
            padding: {
            top: 5,
            bottom: 5,
            },
            maxLines: 100,
            lineSpacing: 5,
        }
  
        this.danger = this.add.text(centerX, centerY, "Hi there! My name is Bitsy!\nIf I get hit while both of my gears are broken, I'm done for!\n\nInstructions:\nPress W to jump\nUse the mouse to drag any broken gears into the trash bin\nGrab new gears from the gear bin and put them in the right spot\n\nPress Space to start", infoConfig).setOrigin(0.5);
        this.danger.setFontSize(20);

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);    
  
      this.bg = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'bg').setOrigin(0);
      this.clouds = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'clouds').setOrigin(0);
      this.runnerBack = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'runnerBack').setOrigin(0);
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
      this.danger.setDepth(100);
      this.Bitsy = this.robo = this.physics.add.sprite(120, game.config.height - tileSize*2.8, 'robo').setScale(SCALE);
      
    }
    
    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('playScene');   
          }
    }
  }