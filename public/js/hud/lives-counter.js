import TextCounter from './base/text-counter';
import {BallLost, GameOver, RestartBall} from '../core/events';

export default class LivesCounter extends TextCounter{
    
    static Create(state){
        state.lives = new LivesCounter(state.game, 680, 550);   
    }
    
    constructor(game, x, y) {
        super(game, x, y, 'lives: ', 3, {
            font: "20px Arial",
            fill: "#ffffff",
            align: "left"
        });
        
        BallLost.subscribe( () => {
            this.decrement();
            if (this.value === 0) {
                GameOver.publish(this.game);
            } else {  
                RestartBall.publish();
            } 
        });
    }
}