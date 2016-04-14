import Phaser from '../helper/phaser-helper';

export default class Physics {
    static Create(state) {
        state.game.physics.startSystem(Phaser.Physics.ARCADE);
    }
}