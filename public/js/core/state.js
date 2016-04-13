import Phaser      from '../helper/phaser-helper';
import Game        from './game';
import Hud         from '../hud/';
import GameObjects from '../game-objects/';
import Ai          from '../helper/ai.js';

const PRELOAD = 'Preload';
const CREATE  = 'Create';
const UPDATE  = 'Update';

export default class BreakoutState extends Phaser.State {

    constructor(game) {
        super(game);
        this.game = game;
        this.components = [ Game, ...Hud, ...GameObjects,  Ai ];
    }
  
    /**
     * Delegates preload responsibility to game the components themselves
     */ 
    preload() { this.all(PRELOAD); }
    
    /**
     * Delegates create responsibility to the game components themselves
     */ 
    create() { this.all(CREATE); }
    
    /**
     * Delegates update responsibility to the game components themselves.
     * 
     * NOTE: No component .Update() methods exist yet.  When possible, the
     * object instances themselves should determine update behavior
     */ 
    update() { this.all(UPDATE); }
    
    /**
     * Invokes a given method on all components
     * @param {string} methodName String name of component method
     */
    all(methodName) {
        this.components.forEach( component => {
            let method = component[methodName];
            if(method) {
                method(this); 
            }
        });
    }
}
