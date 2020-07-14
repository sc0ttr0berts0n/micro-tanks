import * as PIXI from 'pixi.js';
import Victor = require('victor');
import Game from './game';
import DirtStrip from './DirtStrip';

export default class DirtField {
    private game: Game;
    private dirtStrips: DirtStrip[];
    public container: PIXI.Container = new PIXI.Container();
    public el: PIXI.Graphics = new PIXI.Graphics();
    public dirtGrainSize: number;
    public size: Vec2;

    constructor(game: Game, dirtGrainSize: number) {
        this.game = game;
        this.dirtGrainSize = dirtGrainSize;
        this.size = {
            x: Math.floor(game.app.renderer.width / dirtGrainSize),
            y: Math.floor(game.app.renderer.height / dirtGrainSize),
        };
        this.dirtStrips = this.initDirtStrips();
        this.init();
    }

    init() {
        this.container.addChild(this.el);
        this.game.app.stage.addChild(this.container);
    }

    initDirtStrips() {
        // ensure count is an integer
        const stripCount = this.size.x;
        let dirtGrainCount = Math.floor(this.size.y * 0.5);

        return [...new Array(stripCount)].map((el, id) => {
            // get a random float
            const random = Math.random();

            // 40% height stays the same
            // 10% up one
            // 10% up two
            // 10% up three
            // 10% down one
            // 10% down two
            // 10% down three

            if (random >= 0.9) {
                dirtGrainCount += 1;
            } else if (random >= 0.8) {
                dirtGrainCount += 2;
            } else if (random >= 0.7) {
                dirtGrainCount += 3;
            } else if (random >= 0.6) {
                dirtGrainCount += -1;
            } else if (random >= 0.5) {
                dirtGrainCount += -2;
            } else if (random >= 0.4) {
                dirtGrainCount += -3;
            }
            return new DirtStrip(this.game, this, id, dirtGrainCount);
        });
    }

    update() {
        this.render();
    }

    render() {
        this.el.clear();
        this.dirtStrips.forEach((strip) => {
            strip.dirtGrains.forEach((grain) => {
                this.el.beginFill(grain.color);
                const x = strip.pos.x * this.dirtGrainSize;
                const y = grain.depth * this.dirtGrainSize;
                const w = this.dirtGrainSize;
                const h = this.dirtGrainSize;
                this.el.drawRect(x, y, w, h);
                this.el.endFill();
            });
        });
    }

    removeDirt(pos: Victor) {}
}
