import Victor = require('victor');
import Game from './game';

interface GameMouseEvent extends MouseEvent {
    target: HTMLCanvasElement;
}

export default class MouseObserver {
    private game: Game;

    constructor(game: Game) {
        this.game = game;
        this.init();
    }
    init() {
        document.addEventListener('click', (e: GameMouseEvent) => {
            this.handleClick(e);
        });
    }

    handleClick(e: GameMouseEvent) {
        if (e.target === this.game.app.view) {
            const renderer = this.game.app.renderer;
            const domElement = e.target.getBoundingClientRect();
            const xScale = renderer.width / domElement.width;
            const yScale = renderer.height / domElement.height;

            const x = (e.clientX - domElement.x) * xScale;
            const y = (e.clientY - domElement.y) * yScale;

            const target = new Victor(x, y);
            this.game.particleField.removeDirt(target);
        }
    }
}
