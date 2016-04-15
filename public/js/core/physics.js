import Phaser from '../helper/phaser-helper';
import {
    BallHitWall,
    BallHitPaddle, 
    BallHitBrick
} from './events';

export default class Physics {
    static Create(state) {
        state.game.physics.startSystem(Phaser.Physics.ARCADE);    
    }
    
    static Update(state) {
        const {game, ball, paddle, walls, bricks} = state;
        game.physics.arcade.collide(ball, walls,  BallHitWall.publish);
        game.physics.arcade.collide(ball, paddle, BallHitPaddle.publish);
        game.physics.arcade.collide(ball, bricks, BallHitBrick.publish);
    }
}