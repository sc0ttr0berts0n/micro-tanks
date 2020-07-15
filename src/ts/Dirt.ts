import * as PIXI from 'pixi.js';
import Game from './game';
import ParticleStrip from './ParticleStrip';
import ParticleField from './ParticleField';
import Victor = require('victor');
import Particle from './Particle';

export default class Dirt extends Particle {
    constructor(
        game: Game,
        particleField: ParticleField,
        particleStrip: ParticleStrip,
        depth: number,
        order: number
    ) {
        super(game, particleField, particleStrip, depth, order);
        this.name = 'dirt';
        this.color = this.getColor();
        this.init();
    }

    init() {
        this.el = new PIXI.Graphics();
        this.particleStrip.container.addChild(this.el);
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
}
