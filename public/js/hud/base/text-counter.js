import Phaser from '../../helper/phaser-helper';

export default class TextCounter extends Phaser.Text {
    constructor(game, x = 0, y = 0, prefix = '', value = 0, style) {
        super(game, x, y, '', style);
        this.prefix = prefix;
        this.value = value;
        if (game) game.add.existing(this);
        this.text = this.getText();
    }
    
    increment(amount = 1) {
        this.value += amount;
        this.text = this.getText();
    }
    
    decrement(amount = 1) {
        this.increment(-amount);
    }
    
    getText() {
        return `${this.prefix}${this.value}`;
    }
    
    get none() {
        return 0 === this.value;
    }
}