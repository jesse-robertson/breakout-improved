import {expect} from 'chai';
import Phaser from '../helper/phaser-helper';
import State from './state';

describe('State', () => {
    
    it('should be an instance of Phaser.State', () => {
        var state = new State();
        expect(state).to.be.an.instanceof(Phaser.State);
    });
    
    it('should have a preload() method', () => {
        var state = new State();
        expect(state.preload).to.be.an.instanceof(Function);
    });
    
    it('should have a create() method', () => {
        var state = new State();
        expect(state.create).to.be.an.instanceof(Function);
    });
    
    it('should have an update() method', () => {
        var state = new State();
        expect(state.update).to.be.an.instanceof(Function);
    });
});