import * as PIXI from 'pixi.js';
import Game from './game';

export default class GraphicAssets {
    private game: Game;
    constructor(game: Game) {
        this.game = game;
    }

    public placeAssets(): void {}
}
