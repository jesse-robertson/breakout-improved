import {expect} from 'chai';
import Phaser from '../../helper/phaser-helper';
import TextCounter from './text-counter';
import StubPhaserGame from '../../../../test-utils/phaser-stubs/stub-phaser-game';

describe('TextCounter', () => {
    let game, text;
    
    beforeEach( () => {
        game = StubPhaserGame();
        text = new TextCounter(game, 0, 0, 'prefix: ');
    });
    
    it('should inherit from Phaser.Text', () => {
        expect(text).to.be.an.instanceof(Phaser.Text);
    });
    
    it('should accept a phaser game and be added to it', () => {
        var addExistingArgument = null;
        game.add.existing = entity => addExistingArgument = entity;
        text = new TextCounter(game);
        expect(addExistingArgument).to.equal(text);
    });
    
    it('should have a field called "value" that starts at 0', () => {
        expect(text).to.have.property('value');
        expect(text.value).to.equal(0);
    });
    
    it('should have a field called "text" which returns the prefixed string counter value', () => {
        expect(text).to.have.property('text');
        expect(text.text).to.equal('prefix: 0');
    });
    
    it('should have an increment() method', () => {
        expect(text).to.have.property('increment');
        expect(text.increment).to.be.an.instanceof(Function);
        expect(text.value).to.equal(0);
        expect(text.text).to.equal('prefix: 0');
        text.increment();
        expect(text.value).to.equal(1);
        expect(text.text).to.equal('prefix: 1');
        text.increment();
        expect(text.value).to.equal(2);
        expect(text.text).to.equal('prefix: 2');
        text.increment();
        expect(text.value).to.equal(3);
        expect(text.text).to.equal('prefix: 3');
    });
    
    it('should have a decrement() method', () => {
        expect(text).to.have.property('decrement');
        expect(text.decrement).to.be.an.instanceof(Function);
        expect(text.value).to.equal(0);
        expect(text.text).to.equal('prefix: 0');
        text.decrement();
        expect(text.value).to.equal(-1);
        expect(text.text).to.equal('prefix: -1');
        text.decrement();
        expect(text.value).to.equal(-2);
        expect(text.text).to.equal('prefix: -2');
        text.decrement();
        expect(text.value).to.equal(-3);
        expect(text.text).to.equal('prefix: -3');
    });
    
    it('should accept an initial value', () => {
        var textWithInitalValue = new TextCounter(StubPhaserGame(), 0, 0, 'initial: ', 42) ;
        expect(textWithInitalValue.value).to.equal(42);
        expect(textWithInitalValue.text).to.equal('initial: 42');
    });
    
    it('should allow incrementing by an arbitrary value', () => {
        expect(text.value).to.equal(0);
        expect(text.text).to.equal('prefix: 0');
        text.increment(5);
        expect(text.value).to.equal(5);
        expect(text.text).to.equal('prefix: 5');
        text.increment(7);
        expect(text.value).to.equal(12);
        expect(text.text).to.equal('prefix: 12');
        text.increment(9);
        expect(text.value).to.equal(21);
        expect(text.text).to.equal('prefix: 21');
    });
    
    it('should allow decrementing by an arbitrary value', () => {
        expect(text.value).to.equal(0);
        expect(text.text).to.equal('prefix: 0');
        text.decrement(5);
        expect(text.value).to.equal(-5);
        expect(text.text).to.equal('prefix: -5');
        text.decrement(7);
        expect(text.value).to.equal(-12);
        expect(text.text).to.equal('prefix: -12');
        text.decrement(9);
        expect(text.value).to.equal(-21);
        expect(text.text).to.equal('prefix: -21');
    });
    
    it('should have a property "none" which is true for value===0', () => {
        expect(text.none).to.equal(true);
        text.increment();
        expect(text.value).to.equal(1);
        expect(text.none).to.equal(false);
        text.decrement();
        text.decrement();
        expect(text.value).to.equal(-1);
        expect(text.none).to.equal(false);
    });
});