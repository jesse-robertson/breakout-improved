import Phaser from '../helper/phaser-helper';
import config from '../config.js';
import {clamp}            from '../helper/utility-functions';
import PseudoMultiplayer  from '../pseudo-multiplayer.js';

export default class Ball extends Phaser.Sprite {
    
    static get Image() { 
        return config.assets.mainAtlas;
    }
    
    static Preload(state) {
        const {key, textureUrl, atlasUrl} = Ball.Image;
        state.game.load.atlas(key, textureUrl, atlasUrl);
    }
    
    static Create(state) {
        // BreakoutBall
        const ballStartY = 484;
        const ballStartX = state.game.world.centerX;
        state.ball = new Ball(state.game, ballStartX, ballStartY);
        
        // PlayerBall
        const resetBall = () => {
            state.ballOnPaddle = true;
            state.ball.reset(ballStartX, ballStartY);
            state.ball.animations.stop();
        };
        
        state.ballOnPaddle = true;
        state.ball.events.onOutOfBounds.add( () => {
            
            state.lives.decrement();
            
            if (state.lives.none) {
                state.ball.body.velocity.setTo(0, 0);
                state.introText.showGameOver();
            } else {  
                resetBall();
            }
        });
        const releaseBall = () => {
            if (state.ballOnPaddle) {
                state.ballOnPaddle = false;
                state.ball.body.velocity.y = -300;
                state.ball.body.velocity.x = -75;
                state.ball.animations.play('spin');
                state.introText.hide();
            }
        };
        state.game.input.onDown.add(releaseBall);
        state.ballManager = new PseudoMultiplayer.BallManager(state.game, state.ball)
            .addCollision(state.bricks, (ball, brick) => {
                brick.kill();
            
                state.score.increment(10);
                
                //  Are they any bricks left?
                if (state.bricks.countLiving() == 0) {
                    
                    //  New level starts
                    state.score.increment(1000);
                    state.introText.showNextLevel();
                    
                    //  Let's move the ball back to the paddle
                    resetBall();
            
                    //  And bring the bricks back from the dead :)
                    state.bricks.callAll('revive');
                }
            })
            .addCollision(state.paddle, (ball, paddle) => {
                var diff = ball.x - paddle.x;
            
                if (0 === diff) {
                    diff = Math.Random() - 0.5;
                }
            
                ball.body.velocity.x = 10 * diff;
            })
            .addCollision(state.walls);
        state.ball.update = () => {
            if (state.ballOnPaddle) {
                state.ball.body.x = clamp(state.game.input.x, 24, state.game.width-24);
            }
            else {
                // Have ball manager check player ball collisions
                state.ballManager.checkCollisions();
            }  
        };
        
    }
    
    
    
    
    constructor(game, x, y) {
        super(game, x, y, Ball.Image.key, 'ball_1.png');
        
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
        this.defineAnimations().forEach( animation => {
            const {name, frames, frameRate, loop, useNumericIndex} = animation;
            this.animations.add(name, frames, frameRate, loop, useNumericIndex);
        });
    }
    
    defineAnimations() {
        return [
            this.defineSpinAnimation() 
        ];
    }
    
    defineSpinAnimation() {
        return {
            name: 'spin',
            loop: true,
            frameRate: 50,
            frames: [
                'ball_1.png', 
                'ball_2.png', 
                'ball_3.png', 
                'ball_4.png', 
                'ball_5.png'
            ],
            useNumericIndex: false
        };   
    }
}