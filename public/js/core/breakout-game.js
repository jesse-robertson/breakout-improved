import Phaser from '../helper/phaser-helper';
import BreakoutState  from './breakout-state.js';

export default class BreakoutGame extends Phaser.Game {
    constructor() {
        super(800, 600, Phaser.AUTO, 'phaser-root');
        const autoStartState = true;
        this.state.add('BreakoutState', BreakoutState, autoStartState);
    }
}