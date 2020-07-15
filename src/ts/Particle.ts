import * as PIXI from 'pixi.js';
import Game from './game';
import particleStrip from './ParticleStrip';
import particleField from './particleField';
import Victor = require('victor');

export default class Particle {
    public name = 'particle';
    public game: Game;
    public particleField: particleField;
    public particleStrip: particleStrip;
    public pos: Victor;
    public size: number;
    public depth: number;
    public el: PIXI.Graphics;
    public color: number = 0xffffff;
    public order: number;
    public destroyed = false;

    constructor(
        game: Game,
        particleField: particleField,
        particleStrip: particleStrip,
        depth: number,
        order: number
    ) {
        this.game = game;
        this.particleField = particleField;
        this.particleStrip = particleStrip;
        this.pos = new Victor(this.particleStrip.id, depth);
        this.size = particleField.particleGrainSize;
        this.depth = depth;
        this.order = order;
    }

    init() {
        this.el = new PIXI.Graphics();
        this.particleStrip.container.addChild(this.el);
    }

    getAbove() {
        const index = this.particleStrip.slots.indexOf(this);
        console.log(index);
    }
}
