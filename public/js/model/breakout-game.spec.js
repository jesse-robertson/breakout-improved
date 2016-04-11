import {expect} from 'chai';
import Phaser from '../helper/phaser-helper';
import BreakoutGame from './breakout-game';

describe('BreakoutGame', () => {
    
    it('should be a Phaser Game', () => {
        const breakoutGame = new BreakoutGame();
        expect(breakoutGame).to.an.instanceof(Phaser.Game);
    });
    
    it('should be 800px wide', () => {
        const breakoutGame = new BreakoutGame();
        expect(breakoutGame.width).to.equal(800);
    });
    
    it('should be 600px high', () => {
        const breakoutGame = new BreakoutGame();
        expect(breakoutGame.height).to.equal(600);
    });
});
