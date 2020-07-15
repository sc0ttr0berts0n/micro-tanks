declare global {
    interface Window {
        game: Game;
        canvas: HTMLCanvasElement;
    }

    interface Vec2 {
        x: number;
        y: number;
    }
}

import Game from './game';

const canvas = document.getElementById('game') as HTMLCanvasElement;
const game = new Game(canvas);
window.game = game;
window.canvas = canvas;
