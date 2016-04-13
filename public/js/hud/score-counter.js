import TextCounter from './base/text-counter';

export default class ScoreCounter extends TextCounter{
    
    static Preload(){}
    
    static Create(state){
        state.score = new ScoreCounter(state.game, 32, 550);
    }
    
    constructor(game, x, y) {
        super(game, x, y, 'score: ', 0, {
            font: "20px Arial",
            fill: "#ffffff",
            align: "left"
        });
    }
}