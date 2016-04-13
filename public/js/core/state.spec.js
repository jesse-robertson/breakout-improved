import {expect} from 'chai';
import Phaser from '../helper/phaser-helper';
import State from './state';
import Ball from '../game-objects/ball';
import StubPhaserGame from '../../../test-utils/phaser-stubs/stub-phaser-game';

describe('State', () => {
    
    it('should be an instance of Phaser.State', () => {
        var state = new State();
        expect(state).to.be.an.instanceof(Phaser.State);
    });
    
    it('should have a preload() method', () => {
        var state = new State();
        expect(state.preload).to.be.an.instanceof(Function);
    });
    
    describe('Creation', () => {
        it('should have a create() method', () => {
            var state = new State();
            expect(state.create).to.be.an.instanceof(Function);
        });
        
        it('should create a .ball property of type Ball', () => {
            var game = StubPhaserGame();
            var state = new State(game);
            state.create();
            expect(state.ball).to.be.an.instanceof(Ball);
        });    
    });
});