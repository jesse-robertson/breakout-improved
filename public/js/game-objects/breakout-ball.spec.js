import {expect} from 'chai';
import Phaser from '../helper/phaser-helper';
import BreakoutBall from './breakout-ball';
import StubPhaserGame from '../../../test-utils/phaser-stubs/stub-phaser-game';

describe('BreakoutBall', () => {
    let game;
    
    const replaceOwnMethodsWith = (object, replacement) => {
        Object.getOwnPropertyNames(object).forEach( name => {
            if ('function' === typeof object[name]) {
                object[name] = replacement;
            }
        });
    };
    
    beforeEach( () => {
        game = StubPhaserGame();
    });
    
    it('should be an instance of Phaser.Sprite', () => {
        var ball = new BreakoutBall(game);
        expect(ball).to.be.an.instanceof(Phaser.Sprite);
    });
    
    it('should accept a phaser game and be added to it', () => {
        var addExistingArgument = null;
        
        game.add.existing = entity => addExistingArgument = entity;
        
        var ball = new BreakoutBall(game);
        
        expect(addExistingArgument).to.equal(ball);
    });
    
    it('should accept x and y coordinates', () => {
        var ball = new BreakoutBall(game, 42, 53);
        expect(ball.x).to.equal(42);
        expect(ball.y).to.equal(53);
    });
    
    it('should enable ARCADE physics on itself', () => {
        var entityEnabled = null;
        var physicsTypeEnabled = null;
        game.physics.enable = (entity, type) => {
            entityEnabled = entity;
            physicsTypeEnabled = type;
            return StubPhaserGame().physics.enable(entity, type);
        };
        var ball = new BreakoutBall(game);
        
        expect(entityEnabled).to.equal(ball);
        expect(physicsTypeEnabled).to.equal(Phaser.Physics.ARCADE);
    });
    
    it('should have a static .Preload method to load its assets', () => {
        let aLoaderMethodWasCalled = false;
        replaceOwnMethodsWith(game.load, () => {
            aLoaderMethodWasCalled = true;
        });
        expect(aLoaderMethodWasCalled).to.equal(false);
        expect(BreakoutBall).to.have.property('Preload');
        BreakoutBall.Preload(game);
        expect(aLoaderMethodWasCalled).to.equal(true);
    });
});
