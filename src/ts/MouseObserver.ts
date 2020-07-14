import Victor = require('victor');
import Game from './game';

export default class MouseObserver {
    private game: Game;

    constructor(game: Game) {
        this.game = game;
        this.init();
    }
    init() {
        document.addEventListener('mouseup', this.handleClick.bind(this));
    }

    handleClick(e: MouseEvent) {
        const target = new Victor(e.clientX, e.clientY);
        this.game.dirtField.removeDirt(target);
    }
}
