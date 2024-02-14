class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }
    init(){
        this.platformWidth = 31;  // Replace with the actual width of your platform
        this.platformHeight = 10;  // Replace with the actual height of your platform
        this.platformOffsetX = 0;  // Replace with the actual X offset of your platform
        this.platformOffsetY = 8;  //platform initliazes            
    }  

    create() {

//GAME ENVIRONMENT (background, player physics, platforms etc)
        // Enable jumping for Mikkie
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Background
        this.background = this.add.tileSprite(0, 0, 1280, 650, 'background').setScale(2);

        // Creating invisible ground
        this.ground = this.physics.add.sprite(game.config.width / 2, game.config.height / 1.5, 'ground').setScale(2).setOrigin(0.5, 0);
        this.ground.body.setCollideWorldBounds(true);


        // Create platforms
        this.platform1 = this.createPlatform(game.config.width / 4, 'platform').setScale(3).setOrigin(0.5);
        this.platform2 = this.createPlatform(game.config.width / 2, 'platform').setScale(3).setOrigin(0.5);
        this.platform3 = this.createPlatform(game.config.width / 1.3, 'platform').setScale(3).setOrigin(0.5);
        this.platform4 = this.createPlatform(game.config.width / 1, 'platform').setScale(3).setOrigin(0.5);
        

        //moon
        this.moon = this.add.sprite(game.config.width / 13, game.config.height - this.game.config.height / 1.125, 'moon').setScale(3.5).setOrigin(0.5);

        // Player model and animations
        this.player1 = this.physics.add.sprite(game.config.width / 5, game.config.height - this.game.config.height / 3, 'mikkie', 'mikkie 0.png').setScale(5).setOrigin(0.5);
        this.player1.body.setSize(9, 10.5).setOffset(21, 20);

    

        this.player1.anims.play('run');

        // Physics for player
        this.player1.body.setGravityY(900);
        this.player1.body.setGravityX(0);

        



//MOBS

        //bird mob creation
        this.bird = this.physics.add.sprite(game.config.width / 1.5, game.config.height - this.game.config.height / 2, 'bird', 'bird 0.png').setScale(5).setOrigin(0.5) 
        this.bird.body.setSize(10, 8).setOffset(17,19)
        this.birdSpeed = this.bird.body.setVelocityX(-150)
        this.bird.anims.play('run2');

        this.growl = this.sound.add('growl', { volume: 1 });
        this.eagle = this.sound.add('eagle', { volume: 1 });

        //dog creation
        this.dogCreated = false;
        this.time.addEvent({
            delay: 9000, // 10 seconds in milliseconds
            callback: () => {
                this.dog = this.physics.add.sprite(game.config.width / 1.5, game.config.height / 1.5, 'dog', 'dog 0.png').setScale(5).setOrigin(0.5);
                this.dog.body.setSize(8, 10).setOffset(20,20);
                this.dogSpeed = this.dog.body.setVelocityX(-150);
                this.dog.anims.play('run3');
                this.dogCreated = true;
                this.growl.play()
            },
            callbackScope: this,
            loop: false 
        });

         //dog creation
         this.dog2Created = false;
         this.time.addEvent({
             delay: 29000, // 10 seconds in milliseconds
             callback: () => {
                 this.dog2 = this.physics.add.sprite(game.config.width / 1.5, game.config.height / 1.5, 'dog', 'dog 0.png').setScale(5).setOrigin(0.5);
                 this.dog2.body.setSize(8, 10).setOffset(20,20);
                 this.dog2Speed = this.dog2.body.setVelocityX(-150);
                 this.dog2.anims.play('run3');
                 this.dog2Created = true;
                 //play growling sound
                 this.growl.play()
             },
             callbackScope: this,
             loop: false 
         });
 


        this.birdCreated = false;
        this.time.addEvent({
            delay: 60000, // 60 seconds in milliseconds
            callback: () => {
                // Create the second bird
                this.bird2 = this.physics.add.sprite(game.config.width / 1.5, this.game.config.height / 4.5, 'bird', 'bird 0.png').setScale(5).setOrigin(0.5) 
                this.bird2.body.setSize(8, 10).setOffset(20,20);
                this.bird2Speed = this.bird2.body.setVelocityX(-150);
                this.bird2.anims.play('run2');
                this.birdCreated = true;
                this.eagle.play()
            },
            callbackScope: this,
            loop: false // Set to true if you want the event to repeat
        });


//CLOCK and GAMESTATE
         timer = game.settings.gameTimer;

         let timeConfig = {
             fontFamily: 'fantasy',
             fontSize: '30px',
             backgroundColor: 'rgba(173, 216, 230, 0.1)',
             color: '#f2d13d',
             align: 'right',
             padding: {
                 top: 5,
                 bottom: 5,
             },
             fixedWidth: 0
         };
 
         this.timerDisplay = this.add.text(game.config.width / 2, borderUISize + borderPadding * 0.5, timer / 1000, timeConfig).setOrigin(0.5, 0);

        // Timer event for updating timer display
        this.clock = this.time.addEvent({
            delay: 1000,
            callback: () => {
                timer += 1;
                this.timerDisplay.text = timer;
            },
            callbackScope: this,
            loop: true
        });
        

    // Game over flag
        this.gameOver = false;

//MUSIC, AUDIO
        let loopConfig = {
            volume: 0.1,
            loop: true
        };

        this.music = this.sound.add('bgm', loopConfig);
        // this.speedUp = this.sound.add('speedUp', { volume: 0.2 });
        this.dead = this.sound.add('dead', { volume: 0.2 });
        this.yowl = this.sound.add('yowl', { volume: 0.2 });
        

        // Pause music
        if (!this.gameOver) {
            this.music.play();
        } else {
            this.music.stop();
        }

        // Audio
        this.jump = this.sound.add('jump', { volume: 0.2 });
    }

    update() {
        
        // Move background
        this.background.tilePositionX -= -1 * 2;

        // Platform reset
        this.resetPlatform(this.platform1);
        this.resetPlatform(this.platform2);
        this.resetPlatform(this.platform3);
        this.resetPlatform(this.platform4);


        //bird logic handling
        let random = Phaser.Math.Between(0 + this.bird.height / 1.21, game.config.height / 2.1)
        let random2 = Phaser.Math.Between(0 + this.bird.height / 1, game.config.height / 2)

        this.time.delayedCall(1000,()=>{
            this.birdSpeed = this.bird.body.setVelocityX(-500);
        },null,this)
        if (this.bird.x <= 0){
            this.bird.x = game.config.width
            this.bird.y = random
        }

        //floor killer dog logic
        if(this.dogCreated){
            this.time.delayedCall(1000,()=>{
                this.dogSpeed = this.dog.body.setVelocityX(-450);
            },null,this)
        }
        if (this.dog && this.dog.x <= 0) {
            this.dog.x = game.config.width;
            this.dog.y = game.config.height / 1.5;
        }

        if(this.dog2Created){
            this.time.delayedCall(1000,()=>{
                //this.dogSpeed = this.dog.body.setVelocityX(-400);
                this.dog2Speed = this.dog2.body.setVelocityX(-405);
            },null,this)
        }
        if (this.dog2 && this.dog2.x <= 0) {
            this.dog2.x = game.config.width;
            this.dog2.y = game.config.height / 1.5;
        }



        if(this.birdCreated){
            this.time.delayedCall(1000,()=>{
                this.bird2Speed = this.bird2.body.setVelocityX(-450);
            },null,this)
        }
        if (this.bird2 && this.bird2.x <= 0) {
            this.bird2.x = game.config.width
            this.bird2.y = random2
        }
        
        


        // double jump mechanicsm [complete, works really good :3]

        this.canJump = true;

        if (this.player1.body.touching.down) {
            this.jumpCount = 0;
            this.canJump = true;
        }
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            if (this.canJump) {
                if (this.player1.body.touching.down || this.jumpCount < 2) {
                    // Allow double jump if player is on the ground or hasn't performed double jump yet
                    this.player1.body.setVelocity(0, -1 * 450); // Adjust jump velocity as needed
                    this.jump.play();
                    this.jumpCount++;
        
                    if (this.jumpCount === 2) {
                        // Play double jump sound
                    }
                    this.canJump = false;
                }
            }
        }

        // Colliders for player and obstacles
        this.physics.add.collider(this.player1, this.ground);
        this.physics.add.collider(this.player1, this.platform1);
        this.physics.add.collider(this.player1, this.platform2);
        this.physics.add.collider(this.player1, this.platform3);
        this.physics.add.collider(this.player1, this.platform4);


        //collider logic for mobs-------------------------------------------------------- [incomplete rn]

        this.physics.add.collider(this.player1, this.bird, (player1,bird)=>{
            this.handleCollision()
        })
        
        if(this.dog){
            this.physics.add.collider(this.player1, this.dog, (player1,dog)=>{
               this.handleCollision()
            })
            

        }

        if(this.dog2){
            this.physics.add.collider(this.player1, this.dog2, (player1,dog2)=>{
               this.handleCollision()
            })
            

        }

        if(this.bird2){
            this.physics.add.collider(this.player1, this.bird2, (player1,bird2)=>{
               this.handleCollision()
            })
            

        }
        
    }

    // Function to handle collision and game over
    handleCollision() {
        this.player1.body.setVelocity(0);

        if (timer > highScore) {
            highScore = timer;
        }
        this.yowl.play();
        this.dead.play();
        this.music.stop();
        this.gameOver = true;
        this.scene.start('gameOverScene');
    }

    //randomizes height
    getRandomHeight() {
    // Define a reasonable range for platform heights
    const minHeight = game.config.height / 1.7; // Adjust as needed
    const maxHeight = game.config.height / 3; // Adjust as needed

    // Generate a random height within the defined range
    return Phaser.Math.Between(minHeight, maxHeight);
    }

    //platform creation
    createPlatform(x, key) {
        const platform = this.physics.add.sprite(x, this.getRandomHeight(), key);
        let platformMoveConfig = {
            targets: platform,
            x: '-=' + (game.config.width + 2 * this.platformWidth),
            ease: 'Linear',
            duration: 4750,
            repeat: -1,
        };
        this.tweens.add(platformMoveConfig);
    
        platform.body.setSize(this.platformWidth, this.platformHeight).setOffset(this.platformOffsetX, this.platformOffsetY);
        platform.body.setImmovable(true).setGravity(0);
    
        return platform;
    }

    

    //platform reset and handling, need to add an alpha to delay and hide
    resetPlatform(platform) {
        if (platform.x <= 0) {
            platform.alpha = 0; // Hide the platform
            platform.x = game.config.width;
            platform.y = this.getRandomHeight();
    
            // Delay the platform showing for a certain duration
            this.time.delayedCall(400, () => {
                platform.alpha = 1; // Show the platform after a delay
            }, null, this);

            
        }
    }
    
}







/*
Programming tasks we want to do:

-add credits section
-turn off debug


*/