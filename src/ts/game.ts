import * as PIXI from 'pixi.js';
import { Howler } from 'howler';
import GraphicAssets from './graphics';

export default class Game {
    private canvas: HTMLCanvasElement;
    public app: PIXI.Application;
    public graphics: GraphicAssets;
    public paused = false;
    public frameCount = 0;
    private lastRestart = 0;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.app = new PIXI.Application({
            view: canvas,
            width: 1920,
            height: 1080,
            transparent: false,
        });
        this.init();
    }

    private init() {
        this.app.ticker.add((delta) => this.update(delta));
        console.log('booted');
    }

    private update(delta: number) {
        if (!this.paused) {
            this.frameCount++;
        }
    }
    public reinit() {
        this.lastRestart = this.frameCount;
    }
}
