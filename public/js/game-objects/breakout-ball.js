import Phaser from '../helper/phaser-helper';

export default class BreakoutBall extends Phaser.Sprite {
    
    static Preload(game) {
        game.load.atlas(
            'breakout',
            'img/breakout-spritemap.png',
            'img/breakout-spritemap.json'
        );
    }
    
    constructor(game, x, y) {
        super(game, x, y, 'breakout', 'ball_1.png');
        
        if (this.game) {
            this.game.add.existing(this);   
            this.game.physics.enable(this, Phaser.Physics.ARCADE);
            if (this.body) {
                this.body.collideWorldBounds = false;
                this.body.bounce.set(1);
            }
        }
        this.anchor.set(0.5);
        this.checkWorldBounds = true;
        this.addAnimations();
    }
    
    addAnimations() {
        const animations = this.defineAnimations();
        Object.getOwnPropertyNames(animations).forEach( name => {
            const { frames, fps, isLooped } = animations[name];
            this.animations.add(name, frames, fps, isLooped);
        });
    }
    
    defineAnimations() {
        return {
            spin: this.defineSpinAnimation() 
        };
    }
    
    defineSpinAnimation() {
        return {
            spin : {
                isLooped: true,
                fps: 50,
                frames: [
                    'ball_1.png', 
                    'ball_2.png', 
                    'ball_3.png', 
                    'ball_4.png', 
                    'ball_5.png'
                ]
            }
        };   
    }
}