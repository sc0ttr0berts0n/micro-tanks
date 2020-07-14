import * as PIXI from 'pixi.js';
import { Howler } from 'howler';
import GraphicAssets from './graphics';
import DirtField from './DirtField';
import MouseObserver from './MouseObserver';

export default class Game {
    private canvas: HTMLCanvasElement;
    public app: PIXI.Application;
    public mouseObserver: MouseObserver = new MouseObserver(this);
    public graphics: GraphicAssets;
    public dirtField: DirtField;
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
        this.dirtField = new DirtField(this, 8);
        this.init();
    }

    private init() {
        this.app.ticker.add((delta) => this.update(delta));
        console.log('booted');
    }

    private update(delta: number) {
        if (!this.paused) {
            this.frameCount++;
            this.dirtField.update();
        }
    }
    public reinit() {
        this.lastRestart = this.frameCount;
    }
}
