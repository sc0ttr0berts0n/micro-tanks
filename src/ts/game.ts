import * as PIXI from 'pixi.js';
import { Howler } from 'howler';
import GraphicAssets from './graphics';
import ParticleField from './ParticleField';
import MouseObserver from './MouseObserver';

export default class Game {
    private canvas: HTMLCanvasElement;
    public app: PIXI.Application;
    public graphics: GraphicAssets;
    public particleField: ParticleField;
    public mouseObserver: MouseObserver;
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
        this.particleField = new ParticleField(this, 8);
        this.mouseObserver = new MouseObserver(this);
        this.init();
    }

    private init() {
        this.app.stage.interactive = true;
        this.app.ticker.add((delta) => this.update(delta));
        console.log('booted');
    }

    private update(delta: number) {
        if (!this.paused) {
            this.frameCount++;
            this.particleField.update();
        }
    }
    public reinit() {
        this.lastRestart = this.frameCount;
    }
}
