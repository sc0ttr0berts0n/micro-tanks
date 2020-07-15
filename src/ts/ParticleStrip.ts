import * as PIXI from 'pixi.js';
import Victor = require('victor');
import Game from './game';
import ParticleField from './ParticleField';
import Particle from './Particle';
import Dirt from './Dirt';
import Air from './Air';

export default class ParticleStrip {
    private game: Game;
    private particleField: ParticleField;
    public pos: Victor;
    public id: number;
    public size: Victor;
    public container: PIXI.Container;
    public dirtCount: number;
    public slots: Array<Particle>;

    constructor(
        game: Game,
        particleField: ParticleField,
        id: number,
        dirtCount: number
    ) {
        this.game = game;
        this.particleField = particleField;
        this.id = id;
        this.pos = new Victor(id, 0);
        this.size = new Victor(1, particleField.size.y);
        this.dirtCount = Math.max(dirtCount, 1);
        this.container = new PIXI.Container();
        this.slots = [...Array(this.size.y)].map((el, index) => {
            return new Air(this.game, this.particleField, this, index, index);
        });
        this.init();
    }

    init() {
        this.container.x = this.pos.x;
        this.container.y = this.pos.y;
        this.particleField.container.addChild(this.container);
        this.initDirt();
        this.updatePos();
    }

    initDirt() {
        const start = this.size.y - this.dirtCount;
        for (let index = start; index < this.size.y; index++) {
            const depth = index;
            const order = index - start;
            this.slots[index] = new Dirt(
                this.game,
                this.particleField,
                this,
                depth,
                order
            );
        }
    }

    particlesAreSettled() {
        const firstNonAirIndex = this.slots.findIndex(
            (el) => el.name !== 'air'
        );
        const totalAir = this.slots.filter((el) => el.name === 'air').length;
        return firstNonAirIndex === totalAir;
    }

    updatePos() {
        this.slots = this.slots.map((particle, index) => {
            particle.pos.y = index;
            return particle;
        });
    }
}
