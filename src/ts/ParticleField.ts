import * as PIXI from 'pixi.js';
import Victor = require('victor');
import Game from './game';
import ParticleStrip from './ParticleStrip';
import Air from './Air';

export default class ParticleField {
    private game: Game;
    private particleStrips: ParticleStrip[];
    public container: PIXI.Container = new PIXI.Container();
    public el: PIXI.Graphics = new PIXI.Graphics();
    public particleGrainSize: number;
    public size: Vec2;

    constructor(game: Game, particleGrainSize: number) {
        this.game = game;
        this.particleGrainSize = particleGrainSize;
        this.size = {
            x: Math.floor(game.app.renderer.width / particleGrainSize),
            y: Math.floor(game.app.renderer.height / particleGrainSize),
        };
        this.particleStrips = this.initParticleStrips();
        this.init();
    }

    init() {
        this.container.interactive = true;
        this.el.interactive = true;
        this.el.buttonMode = true;
        this.container.addChild(this.el);
        this.game.app.stage.addChild(this.container);
    }

    initParticleStrips() {
        // ensure count is an integer
        const stripCount = this.size.x;
        let particleGrainCount = Math.floor(this.size.y * 0.5);

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
                particleGrainCount += 1;
            } else if (random >= 0.8) {
                particleGrainCount += 2;
            } else if (random >= 0.7) {
                particleGrainCount += 3;
            } else if (random >= 0.6) {
                particleGrainCount += -1;
            } else if (random >= 0.5) {
                particleGrainCount += -2;
            } else if (random >= 0.4) {
                particleGrainCount += -3;
            }
            return new ParticleStrip(this.game, this, id, particleGrainCount);
        });
    }

    update() {
        this.settleParticles();
        this.particleStrips.forEach((particle) => particle.updatePos());
        this.render();
    }

    render() {
        this.el.clear();
        this.particleStrips.forEach((strip) => {
            strip.slots.forEach((grain) => {
                this.el.beginFill(grain.color);
                const x = strip.pos.x * this.particleGrainSize;
                const y = grain.pos.y * this.particleGrainSize;
                const w = this.particleGrainSize;
                const h = this.particleGrainSize;
                this.el.drawRect(x, y, w, h);
                this.el.endFill();
            });
        });
    }

    removeDirt(pos: Victor, radius: number = 11) {
        const gridX = this.getGridValue(pos.x);
        const gridY = this.getGridValue(pos.y);
        const gridPos = new Victor(gridX, gridY);
        const startStrip = Math.max(0, gridPos.x - radius);
        const lengthStrips = radius * 2;

        for (let i = startStrip; i < startStrip + lengthStrips; i++) {
            for (let j = 0; j < this.particleStrips[0].slots.length; j++) {
                let particle = this.particleStrips[i]?.slots[j];
                if (!particle) debugger;
                const dist = gridPos.distance(particle.pos);
                if (dist < radius) {
                    // debugger;
                    this.particleStrips[i].slots[j] = new Air(
                        particle.game,
                        particle.particleField,
                        particle.particleStrip,
                        particle.depth,
                        particle.order
                    );
                }
            }
        }
    }

    getGridValue(num: number) {
        return Math.floor(num / this.particleGrainSize);
    }

    getStrips(
        startStrip: number = 0,
        length: number = this.particleStrips.length
    ) {
        let arr = this.particleStrips;
        if (startStrip && length) {
            arr = this.particleStrips.slice(startStrip, startStrip + length);
        }
        return arr.map((strip) => strip.slots);
    }

    settleParticles() {
        for (let i = 0; i < this.particleStrips.length; i++) {
            for (let j = this.particleStrips[i].slots.length - 1; j >= 0; j--) {
                const target = this.particleStrips[i].slots[j];
                const above = this.particleStrips[i].slots[j - 1];
                if (target?.name === 'dirt' && above?.name === 'air') {
                    const firstAir = this.particleStrips[i].slots.splice(
                        j - 1,
                        1
                    )[0];
                    this.particleStrips[i].slots.unshift(firstAir);
                    break;
                }
            }
        }
    }
}
