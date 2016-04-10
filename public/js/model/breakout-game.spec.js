/* global Phaser */
import {expect} from 'chai';
import BreakoutGame from './breakout-game';

describe('BreakoutGame', () => {
    it('should be a Phaser Game', () => {
        var breakoutGame = new BreakoutGame();
        expect(breakoutGame).to.an.instanceof(Phaser.Game);
    });
});
