import BrickTargeter    from './brick-targeter';
import PaddlePositioner from './paddle-positioner';
import {callOnce}       from '../math-helper';
import {botMouse}       from '../input-helper';

/**
 * Breakout Artificial Intelligence
 * 
 * Simulates a (skilled) human breakout player to facilitate multiplayer testing
 * 
 * Press any key during game to toggle Ai
 * 
 * @author Jesse Robertson <jesse.robertson@ou.edu>
 * @param {Phaser.State} state
 */
export default class Ai {
 
    static Create(state) {
        // By default, Phaser pauses the game on a blur event. This needs to be 
        // disabled to allow for multiple concurrent games (for testing). 
        state.game.stage.disableVisibilityChange = true;  
    
        // Activate the Ai the first time a key is pressed
        state.game.input.keyboard.onPressCallback = callOnce( () => { 
            new Ai(state); 
        });
    }   
 
    constructor(state) {
        const {game, ball, bricks, paddle} = state;
        const targeter   = new BrickTargeter(bricks, ball);
        const positioner = new PaddlePositioner(paddle, ball);
        
        // Hijack mouse input. Yes I could just set the paddle position... but
        // this is way more fun.
        botMouse(game.input).setGetterX( mouse => {
            
            // Automatically Release ball on start/restart
            const ballIsWaitingOnPaddle = ( 0 === ball.body.velocity.y );
            if (ballIsWaitingOnPaddle) {
                mouse.click();
            }
           
            // Grab position of current target
            const brick = targeter.getBrick();
            
            // Compute and return the optimal paddle position
            return positioner.getPaddleX(brick);
        });
    }
} 
 