class Credit extends Phaser.Scene{
    constructor(){
        super('creditScene')
    }

    preload(){

    }

    create(){

        //credit config
        let creditConfig = {
            fontFamily: 'Courier New',
            fontSize: '30px',
            // backgroundColor: '#F3B141',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.select = this.sound.add('select', {volume: 0.2})
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)

        // let credit = this.add.text(this.game.config.width / 2, this.game.config.height /2, 
        // 'Credits:\n\n Background Music used from Pixabay: https://pixabay.com/music/search/mood/happy/\n\n Sound Effects used from Pixabay: https://pixabay.com/sound-effects/search/select/\n\n Pixel art for background and sprites done by me using Aseprite\n\n Programming done by me\n\n',{
        //     fontFamily: 'Times New Roman',
        //     fontSize: '18px',
        //     color: '#000000',
        //     backgroundColor: '#FFFFFF',
        // }).setOrigin(0.5)
        
        
        this.add.text(game.config.width/2, game.config.height/1.2, 'Press "<-" to go back to the menu', creditConfig).setOrigin(0.5);

    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)){
            //console.log("why no work")
            // this.select.play()
            // this.select.play()
            // this.scene.start('creditScene')

            this.select.play()
            this.scene.start('menuScene')

        }

    }


}