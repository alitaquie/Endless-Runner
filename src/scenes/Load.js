//preloading of all games and assets 


class Load extends Phaser.Scene{
    constructor(){
        super("loadScene")
    }

    preload(){
        this.load.image('background', './assets/background.png');
        this.load.atlas('mikkie', './assets/mikkie.png', './assets/mikkie.json')
        this.load.atlas('bird', './assets/bird.png', './assets/bird.json')
        this.load.atlas('dog', './assets/dog.png', './assets/dog.json')


        this.load.image('ground', './assets/ground.png')

        
        this.load.image('moon', './assets/moon.png')

        //platform
        this.load.image('platform','/assets/platform.png')

        //bgm
        this.load.audio('bgm', './assets/bgm.mp3')

        //sound effects
        this.load.audio('jump', './assets/jump.mp3')
        this.load.audio('select', './assets/select.mp3')
        this.load.audio('growl', './assets/growl.mp3')
        this.load.audio('yowl', './assets/yowl.mp3')
        this.load.audio('eagle', './assets/eagle.mp3')

        // this.load.audio('speedUp', './assets/speedUp.mp3')
        this.load.audio('dead', './assets/dead.mp3')


    }

    create(){

        this.textures.addSpriteSheetFromAtlas('mikkie 0.png', {frameHeight: 32, frameWidth: 16, atlas: 'mikkie', frame: 'mikkie 0.png'})
        this.textures.addSpriteSheetFromAtlas('bird 0.png', {frameHeight: 32, frameWidth: 16, atlas: 'bird', frame: 'bird 0.png'})
        this.textures.addSpriteSheetFromAtlas('dog 0.png', {frameHeight: 32, frameWidth: 16, atlas: 'dog', frame: 'dog 0.png'})

        this.anims.create({
            key: "run",
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNames(
                'mikkie', {
                    prefix: 'mikkie ',
                    start: 0,
                    end: 3,
                    suffix: '.png'  
            })
        })

        this.anims.create({
            key: "run2",
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNames(
                'bird', {
                    prefix: 'bird ',
                    start: 0,
                    end: 5,
                    suffix: '.png'  
            })
        })

        this.anims.create({
            key: "run3",
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNames(
                'dog', {
                    prefix: 'dog ',
                    start: 3,
                    end: 0,
                    suffix: '.png'  
            })
        })

        this.scene.start('menuScene')
    }

}