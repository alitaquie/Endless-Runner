class GameOver extends Phaser.Scene{
    constructor(){
        super('gameOverScene')
    }

    preload(){
        this.load.image('GameCat', './assets/sad_Mikku.png'); 

    }

    create(){

        this.cameras.main.setBackgroundColor('#f5624c');
        //display game over
        let gameOverConfig = {
            fontFamily: 'fantasy',
            fontSize: '36px',
            backgroundColor: '#f5624c',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.add.image(game.config.width/2, game.config.height/1.4, 'GameCat').setScale(6).setOrigin(0.5);

        //game over text
        this.add.text(game.config.width/2, game.config.height/2.5 - borderUISize - borderPadding, 'GAME OVER!', gameOverConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2.5, 'Press "R" to go back to menu', gameOverConfig).setOrigin(0.5);
        this.add.text(game.config.width/5.2, game.config.height/10.5, 'You survived ' + timer + ' seconds!', gameOverConfig).setOrigin(0.5);
        this.add.text(game.config.width/1.23 , game.config.height/1.2, 'Press "-->" key for credits', gameOverConfig).setOrigin(0.5);
        this.add.text(game.config.width/1.15, game.config.height/10.5, 'High Score: ' + highScore, gameOverConfig).setOrigin(0.5);

        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        this.select = this.sound.add('select', {volume: 0.2})

    }


    update(){

        if (Phaser.Input.Keyboard.JustDown(keyR)){
            this.select.play()
            this.scene.start('menuScene')

        }

        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            this.select.play()
            this.scene.start('creditScene')


        }

    }

}