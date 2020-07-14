import * as PIXI from 'pixi.js';
import Game from './game';
import DirtStrip from './DirtStrip';
import DirtField from './DirtField';

export default class DirtGrain {
    private game: Game;
    private dirtField: DirtField;
    private dirtStrip: DirtStrip;
    private size: number;
    public depth: number;
    public el: PIXI.Graphics;
    public color: number = 0xffffff;
    public order: number;

    constructor(
        game: Game,
        dirtField: DirtField,
        dirtStrip: DirtStrip,
        depth: number,
        order: number
    ) {
        this.game = game;
        this.dirtField = dirtField;
        this.dirtStrip = dirtStrip;
        this.size = dirtField.dirtGrainSize;
        this.depth = depth;
        this.order = order;
        this.color = this.getColor();
        this.init();
    }

    init() {
        this.el = new PIXI.Graphics();
        this.dirtStrip.container.addChild(this.el);
    }

    getColor() {
        if (this.order > 24) {
            return 0x150e0c;
        } else if (this.order > 16) {
            return 0x301a14;
        } else if (this.order > 8) {
            return 0x73341d;
        } else if (this.order > 2) {
            return 0x421c0e;
        } else {
            return 0x74c050;
        }
    }

    top() {
        return this.depth;
    }
    bottom() {
        return this.depth + this.size;
    }
    left() {
        return this.dirtStrip.pos.x;
    }
    right() {
        return this.dirtStrip.pos.x + this.size;
    }
}
