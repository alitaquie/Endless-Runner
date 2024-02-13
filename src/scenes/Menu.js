//starting scene explains everything that will be needed
//menu scene explains everything, basic code that will need to be improved eventually




class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    preload(){
        //load audio
        this.load.image('menuTitle', './assets/title_screen.png'); 
        this.load.image('TitleCat', './assets/title_Mikku.png'); 
        

    }

    create(){
        this.cameras.main.setBackgroundColor('#e2e670');
        let menuConfig = {
            fontFamily: 'Courier New',
            fontSize: '30px',
            backgroundColor: '#000000',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.add.image(game.config.width/2, game.config.height/4, 'menuTitle').setScale(0.5).setOrigin(0.5); // Add your image to the scene
        this.add.image(game.config.width/2, game.config.height/1.6, 'TitleCat').setScale(6).setOrigin(0.5); 
        //menu text
        //this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'SUPER MIKKIE', menuConfig).setOrigin(0.5);
        // this.add.text(game.config.width/2, game.config.height/2, 'Use "SPACEBAR" to avoid obstacles', menuConfig).setOrigin(0.5);
        // this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press SPACEBAR to start', menuConfig).setOrigin(0.5);
        
        //define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.select = this.sound.add('select', {volume: 0.2})
    }

    

    update(){
        //start the game
        if (Phaser.Input.Keyboard.JustDown(keySPACE)){
            this.select.play()
            this.scene.start('playScene')

            //start the game
            game.settings = {
                gameTimer: 0
            }


        }
    }

}