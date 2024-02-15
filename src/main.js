/*Name: Mohammad Taquie
Title: Super Mikkie
Time: 30 hours+


Creative Tilt Justification:

Visual aspect------------------------------------------------------------------------------------------------------------------------------------------------


This game was inspired by a real life story actually. 
My cat Mikkie once managed to get lost into a neighbor's backyard and their backyard had an aggressive guard dog. This game and artwork is loosely inspired by Mikkie’s adventure.
All artwork that is displayed within this game was done by me using Asperite (except for the title screen, I used a font generator for that).
I am very proud of the visual aesthetics of my game as this was my first time doing pixel art and doing my own animations. 
I found doing the animations a little bit tricky at first but I’m very happy with how the animations specifically for the cat turned out.
I really enjoyed working with Asperite and trying to create unique artwork for my game. 
I also really enjoyed adding sound effects to my game, like when the dog spawns into the game for the first time you can hear growling sounds and when the second bird spawns there is an eagle screech. 
I also wanted to give my game a retro feel given that the art was pixelated so I tried to use sounds that would give that effect.
I also really like the music I ended up choosing for the game as it ties into the visual aesthetic to deliver a nice and relaxing vibe, even if the game gets hectic and more difficult as time starts to pass by. 




Technical aspect--------------------------------------------------------------------------------------------------------------------------------------------

I wanted to make a simple endless runner that included random platforming to include a sense of life within my game. 
I didn’t really want the game to feel as if it was just the same platforms endlessly looping. 
Implementing the platforms was challenging and It was difficult to manage how to spawn and reset the platforms. 
I feel like I did an okay job with the platforms and the platforms serve as a double-edged sword. 
They can allow you to jump higher and dodge mobs however they also spawn randomly and last minute and can act as obstacles which makes the game overall more difficult.
 I wanted my game to be playable and simple however I didn’t want to make it necessarily too easy.
I think the platforms do a good job of this by randomly spawning and sometimes they act as blocks that directly spawn over the cat's head so the cat cannot jump on top of it. 
After playing a few rounds of the game, the player will learn quickly that staying in the air with proper timing is there best bet of survival

I applied randomness logic to the bird sprites so that when they reset they spawn at a different y-axis so it’s not necessarily the same.
I’m also proud of managing flags and how to use delayed calls while creating these mobs. 
For example, the first dog mob spawns after 10 seconds, the second dog spawns at 30 seconds and the last mob spawns at 60 seconds. 
I feel as if adding these animals throughout the game makes it feel as if there is more life to it. 

The logic from randomness and delayed creations can be found in Play.js under create() 


*/


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
            debug: false,
        }
    },
    scene: [Load, Menu, Play, GameOver, Credit]
}


let game = new Phaser.Game(config);
let scoreConfig;
let highScore = 0;
let timer;

//reserve keyboard vars
let keySPACE, keyRIGHT, keyLEFT, keyR;

//set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;