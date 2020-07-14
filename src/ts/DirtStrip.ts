import * as PIXI from 'pixi.js';
import Victor = require('victor');
import Game from './game';
import DirtField from './DirtField';
import DirtGrain from './DirtGrain';

export default class DirtStrip {
    private game: Game;
    private dirtField: DirtField;
    public pos: Victor;
    public id: number;
    public size: Victor;
    public container: PIXI.Container;
    public dirtGrainCount: number;
    public dirtGrains: DirtGrain[];

    constructor(
        game: Game,
        dirtField: DirtField,
        id: number,
        dirtGrainCount: number
    ) {
        this.game = game;
        this.dirtField = dirtField;
        this.id = id;
        this.pos = new Victor(id, 0);
        this.size = new Victor(id, dirtField.size.y);
        this.dirtGrainCount = Math.max(dirtGrainCount, 1);
        this.container = new PIXI.Container();
        this.init();
    }

    init() {
        this.container.x = this.pos.x;
        this.container.y = this.pos.y;
        this.dirtField.container.addChild(this.container);
        this.initGrains();
    }

    initGrains() {
        this.dirtGrains = [...Array(this.dirtGrainCount)]
            .map((grain, index) => {
                const depth = this.size.y - index;
                const order = this.dirtGrainCount - index;
                return new DirtGrain(
                    this.game,
                    this.dirtField,
                    this,
                    depth,
                    order
                );
            })
            .reverse();
    }
}
