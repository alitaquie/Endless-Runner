class GameOver extends Phaser.Scene{
    constructor(){
        super('gameOverScene')
    }

    preload(){

    }

    create(){

        //display game over
        let gameOverConfig = {
            fontFamily: 'Courier New',
            fontSize: '30px',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //game over text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Game Over', gameOverConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Press "R" to go back to menu', gameOverConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/3, 'You survived ' + timer + ' seconds', gameOverConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/1.2, 'Press "->" key to see credits', gameOverConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/1.5, 'High Score: ' + highScore, gameOverConfig).setOrigin(0.5);

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