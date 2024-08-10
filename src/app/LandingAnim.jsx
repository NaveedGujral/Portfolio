'use client'

/*

1) Fill Canvas with perlin noise values X
    1a) convert greyscale vals to vectors - X
2) Change perlin noise over time with a third noise value
4) draw particles on one side of the screen
5) have the particles accelerate based on it's positon and relevant vector, acceleration needs to be capped
6) have the mouse repulse particles around it

*/

import { Sketch } from "@p5-wrapper/react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";

export default function LandingAnim() {
    const inc = 0.05;
    const zInc = 0.0005
    const scale = 50;
    const particleNo = 800;
    const speedCap = 3
    let cols, rows;
    let zOffset = 0;
    let particles = [];
    let flowfield = [];

    function Particle(p5) {

        this.pos = p5.createVector((p5.random(-p5.width / 2, p5.width / 2)), (p5.random(-p5.height / 2, p5.height / 2)))
        this.vel = p5.createVector(0, 0)
        this.acc = p5.createVector(0, 0)
        this.maxSpeed = speedCap

        this.follow = function (vectors) {
            let x = p5.floor(this.pos.x / scale);
            let y = p5.floor(this.pos.y / scale);
            let index = x + y * cols;
            let force = vectors[index]
            this.applyForce(force)
        }

        this.applyForce = function (force) {
            this.acc.add(force)
        }

        this.show = function () {
            p5.stroke(0);
            p5.strokeWeight(4)
            p5.point(this.pos.x, this.pos.y)
        }

        this.edges = function () {
            if (this.pos.x > p5.width / 2) {
                this.pos.x = - p5.width / 2
            }
            if (this.pos.x < - p5.width / 2) {
                this.pos.x = p5.width / 2
            }
            if (this.pos.y > p5.height / 2) {
                this.pos.y = - p5.height / 2
            }
            if (this.pos.y < - p5.height / 2) {
                this.pos.y = p5.height / 2
            }
        }

        this.update = function () {
            this.vel.add(this.acc)
            this.vel.limit(this.maxSpeed)
            this.pos.add(this.vel)
            this.acc.mult(0)
        }
    }

    function sketch(p5) {

        p5.setup = () => {
            p5.createCanvas(1920, 1080, p5.WEBGL)
            p5.pixelDensity(1)
            cols = p5.floor(p5.width / scale)
            rows = p5.floor(p5.height / scale)

            flowfield = new Array(cols * rows);

            for (let i = 0; i < particleNo; i++) {
                particles[i] = new Particle(p5);
            }

        };

        p5.draw = () => {
            p5.background(255)
            let xOffset = 0
            for (let x = -cols; x < cols; x++) {
                let yOffset = 0
                for (let y = -rows; y < rows; y++) {

                    let index = (x + y * cols);
                    let angle = p5.noise(xOffset, yOffset, zOffset) * (Math.PI * 2)
                    let vector = p5.constructor.Vector.fromAngle(angle);
                    vector.setMag(0.1)
                    flowfield[index] = vector;
                    yOffset += inc

                    p5.stroke(0, 50);
                    p5.push();
                    p5.translate(x * scale, y * scale);
                    p5.rotate(vector.heading());
                    p5.strokeWeight(1)
                    // p5.line(0, 0, scale, 0)
                    p5.pop();
                }
                xOffset += inc
                // console.log(p5.frameRate())
                zOffset += zInc
            }

            for (let i = 0; i < particles.length; i++) {
                particles[i].follow(flowfield)
                particles[i].update();
                particles[i].show();
                particles[i].edges();
            }
        };
    }

    return (
        <NextReactP5Wrapper sketch={sketch} />
    )
}