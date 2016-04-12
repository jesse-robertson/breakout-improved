import {expect} from 'chai';
import Phaser from '../helper/phaser-helper';
import BreakoutState from './breakout-state';
import BreakoutBall from '../game-objects/breakout-ball';
import StubPhaserGame from '../../../test-utils/phaser-stubs/stub-phaser-game';

describe('BreakoutState', () => {
    
    it('should be an instance of Phaser.State', () => {
        var state = new BreakoutState();
        expect(state).to.be.an.instanceof(Phaser.State);
    });
    
    it('should have a preload() method', () => {
        var state = new BreakoutState();
        expect(state.preload).to.be.an.instanceof(Function);
    });
    
    it('should have an update() method', () => {
        var state = new BreakoutState();
        expect(state.update).to.be.an.instanceof(Function);
    });
    
    describe('Creation', () => {
        it('should have a create() method', () => {
            var state = new BreakoutState();
            expect(state.create).to.be.an.instanceof(Function);
        });
        
        it('should create a .ball property of type BreakoutBall', () => {
            var game = StubPhaserGame();
            var state = new BreakoutState(game);
            state.create();
            expect(state.ball).to.be.an.instanceof(BreakoutBall);
        });    
    });
});