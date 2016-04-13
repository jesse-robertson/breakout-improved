import Phaser             from '../helper/phaser-helper';
import {clamp}            from '../helper/utility-functions';

export default class Paddle {
    
    static Preload(){}
    
    static Create(state) {
        const paddleStartX = state.game.world.centerX;
        const paddleStartY = 500;
        state.paddle = state.game.add.sprite(paddleStartX, paddleStartY, 'breakout', 'paddle_big.png');
        state.paddle.anchor.setTo(0.5, 0.5);
        state.game.physics.enable(state.paddle, Phaser.Physics.ARCADE);
        state.paddle.body.collideWorldBounds = true;
        state.paddle.body.bounce.set(1);
        state.paddle.body.immovable = true;
        state.paddle.update = () => {
            state.paddle.x = clamp(state.game.input.x, 24, state.game.width-24);
        };
    }
}