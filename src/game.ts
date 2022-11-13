import 'phaser';

const SCREEN_WIDTH = window.innerWidth
const SCREEN_HEIGHT = window.innerHeight

const CENTER_X = SCREEN_WIDTH / 2
const CENTER_Y = SCREEN_HEIGHT / 2

export default class Game extends Phaser.Scene
{
    constructor ()
    {
        super('game');
    }

    preload ()
    {
        this.load.image('logo', 'assets/drumkick-logo.png');
        this.load.image('shadow', 'assets/drumkick-logo.png');
        this.load.image('background', 'assets/background.png');
        this.load.image('background-image', 'assets/background-image.png');
        this.load.image('start', 'assets/start.png');
        this.load.image('credits', 'assets/credits.png');
        this.load.image('score', 'assets/score.png');
    }

    create ()
    {
        const background = this.add.image(0, 0, 'background-image');
        background.setDisplaySize(SCREEN_WIDTH * 2, SCREEN_HEIGHT * 2)
        this.add.tileSprite(0, 0, SCREEN_WIDTH * 2, SCREEN_HEIGHT * 2, 'background');
        const logo = this.add.image(CENTER_X, CENTER_Y-100, 'logo');

        const credits = this.add.image(CENTER_X - 350, CENTER_Y + 200, 'credits')
        credits.setPipeline("Grayscale")
        const start = this.add.image(CENTER_X, CENTER_Y + 200, 'start')
        const score = this.add.image(CENTER_X + 350, CENTER_Y + 200, 'score')
        
        this.tweens.add({
            targets: logo,
            scale: 0.98,
            duration: 200,
            ease: 'Sine.inOut',
            yoyo: true,
            repeat: -1
        })

        this.time.addEvent({
            delay: 400,                // ms
            callback: () => {
                const shadow = this.add.sprite(CENTER_X, CENTER_Y-100, 'shadow');
                shadow.setAlpha(0.2);
                this.tweens.add({
                    targets: shadow,
                    scale: 1.2,
                    alpha: 0,
                    duration: 400,
                    ease: 'Sine.inOut',
                })
            },
            callbackScope: this,
            repeat: -1
        });

        window.addEventListener("resize", () => {
            this.game.scale.resize(SCREEN_WIDTH, SCREEN_HEIGHT)
        })
    }
}

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#191919',
    width: window.innerWidth,
    height: window.innerHeight,
    scene: Game
};

const game = new Phaser.Game(config);
