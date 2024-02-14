let config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 650,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
        }
    },
    scene: [Load, Menu, Play, GameOver, Credit]
}


let game = new Phaser.Game(config);
let scoreConfig;
let highScore = 0;
let timer;

//reserve keyboard vars
let keySPACE, keyRIGHT, keyLEFT, keyR,keyF;

//set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;