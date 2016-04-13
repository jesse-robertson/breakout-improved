import Phaser     from '../helper/phaser-helper';
import Game        from './game';
import Hud         from '../hud/';
import GameObjects from '../game-objects/';
import Ai          from '../helper/ai.js';

export default class BreakoutState extends Phaser.State {

    constructor(game) {
        super(game);
        this.game = game;
        this.components = [ Game, ...Hud, ...GameObjects,  Ai ];
    }
  
    /**
     * Delegates preloading responsibility to game the components themselves
     */ 
    preload() { 
        this.components.forEach( component => {
            component.Preload(this); 
        }); 
    }
    
    /**
     * Delegates creation responsibility to the game components themselves
     */ 
    create() { 
        this.components.forEach( component => {
            component.Create(this); 
        }); 
    }
}
