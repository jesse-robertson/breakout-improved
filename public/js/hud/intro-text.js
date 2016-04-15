import Phaser from '../helper/phaser-helper';
import {GameOver, BallReleased, NextLevel} from '../core/events';

const WELCOME_TEXT    = '- click to start -';
const NEXT_LEVEL_TEXT = '- Next Level -';
const GAME_OVER_TEXT  = 'Game Over!';

export default class IntroText extends Phaser.Text {
    
    static Create(state) {
        state.introText = new IntroText(state.game, state.game.world.centerX, 400);
    }
    
    constructor(game, x = 0, y = 0) {
        super(game, x, y, WELCOME_TEXT, {
            font: "40px Arial",
            fill: "#ffffff",
            align: "center"
        });
        this.anchor.setTo(0.5, 0.5);
        if (game) game.add.existing(this);
        
        GameOver.subscribe( () => {
            this.showGameOver();
        });
        BallReleased.subscribe( () => {
            this.clear();
        });
        NextLevel.subscribe( () => {
            this.showNextLevel();
        });
    }
    
    showGameOver(){
        this.text = GAME_OVER_TEXT;
        this.visible = true;
    }
    
    showNextLevel(){
        this.text = NEXT_LEVEL_TEXT;
        this.visible = true;
    }
    
    clear() {
        this.text = '';
        this.visible = false;
    }
}