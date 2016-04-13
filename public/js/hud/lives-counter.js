import TextCounter from './base/text-counter';

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
    }
}