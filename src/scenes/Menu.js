class Menu extends Phaser.Scene {
  constructor() {
      super("menuScene");
  }
  
  create() {
      let menuConfig = {
          fontFamily: 'OCR A Std',
          fontSize: '60px',
          color: '#BEBEBE',
          align: 'right',
          padding: {
          top: 5,
          bottom: 5,
          },
      }
      let scoreConfig = 
        {
            fontFamily: 'Cheri',
            fontSize: '28px',
            color: '#BEBEBE',
            align: 'left',
            padding: {
            top: 5,
            bottom: 5,
            },
        }

      this.title = this.add.text(game.config.width/2, centerY / 5, 'Robo Runner', menuConfig).setOrigin(0.5);
      this.begin = this.add.text(game.config.width/2, centerY + 160, 'Press Space to Start Running', menuConfig).setOrigin(0.5);
      menuConfig.backgroundColor = '#00FF00';
      menuConfig.color = '#000';
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
    this.title.setDepth(100);
    this.begin.setDepth(100);
    this.Bitsy = this.robo = this.physics.add.sprite(120, game.config.height - tileSize*2.8, 'robo').setScale(SCALE);
    this.bestScoreCount = this.add.text(10, 0, "Best Score: " + bestScore, scoreConfig);
    
  }
  
  update() {
      if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
          this.scene.start('instructionScene');   
        }
  }
}