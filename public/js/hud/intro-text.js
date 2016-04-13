import Phaser from '../helper/phaser-helper';

export default class IntroText extends Phaser.Text {
    
    // Define Static class constants.
    // This is a little awkward, but it's the current ES6 way.
    static get WELCOME()    { return '- click to start -'; }
    static get NEXT_LEVEL() { return '- Next Level -'; }
    static get GAME_OVER()  { return 'Game Over!'; }
    
    static Preload() {}
    
    static Create(state) {
        state.introText = new IntroText(state.game, state.game.world.centerX, 400);
    }
    
    constructor(game, x = 0, y = 0) {
        super(game, x, y, IntroText.WELCOME, {
            font: "40px Arial",
            fill: "#ffffff",
            align: "center"
        });
        this.anchor.setTo(0.5, 0.5);
        if (game) game.add.existing(this);
    }
    
    showGameOver(){
        this.text = IntroText.GAME_OVER;
        this.visible = true;
    }
    
    showNextLevel(){
        this.text = IntroText.NEXT_LEVEL;
        this.visible = true;
    }
    
    hide() {
        this.text = '';
        this.visible = false;
    }
}