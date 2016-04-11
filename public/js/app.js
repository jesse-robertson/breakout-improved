import BreakoutAi        from './breakout-ai.js';
import BreakoutGame from './model/breakout-game.js';
new BreakoutGame();

// Invoke the AI when a key is pressed
var aiEnabled = false;
document.onkeyup = function() {
    if (aiEnabled) return;
    aiEnabled = true;
    //BreakoutAi(game, bricks, paddle, ball);
};