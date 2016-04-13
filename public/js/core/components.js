import Game        from './game';
import Hud         from '../hud/';
import GameObjects from '../game-objects/';
import Ai          from '../breakout-ai.js';
export default [
    Game, 
    ...Hud, 
    ...GameObjects, 
    Ai
];