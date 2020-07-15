import * as PIXI from 'pixi.js';
import Game from './game';
import ParticleStrip from './ParticleStrip';
import ParticleField from './ParticleField';
import Victor = require('victor');
import Particle from './Particle';

export default class Air extends Particle {
    constructor(
        game: Game,
        particleField: ParticleField,
        particleStrip: ParticleStrip,
        depth: number,
        order: number
    ) {
        super(game, particleField, particleStrip, depth, order);
        this.name = 'air';
        this.color = 0x000000;
        this.init();
    }

    init() {
        this.el = new PIXI.Graphics();
        this.particleStrip.container.addChild(this.el);
    }
}
