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

export default function Curves({ screenWidth, screenHeight }) {

    // flow field controls

    const inc = 0.5; // flow field variance - increase for more variation
    const zInc = 0.0001 // flow field variance over time - increase for more variation but less smooth
    const scale = 75; // size of flow field cells, decreasing can impact performance
    const particleNo = 600; // number of lines drawn
    const speedCap = 2 // speed of particles drawing the lines
    const angleSeed = Math.PI * 2 // a random angle is picked from 0 to this value in radians
    const crossLimit = 3
    const brushFactor = 9

    const canvasX = screenWidth
    const canvasY = screenHeight
    // const canvasX = 600
    // const canvasY = 600
    let cols, rows;
    let zOffset = 0;
    let particles = [];
    let flowfield = [];
    let crossCountArr = []

    function Particle(p5) {
        this.crossCount = 0
        this.arrayPushCount = 0

        this.pos = p5.createVector(-p5.width / 2, p5.random(-p5.height / brushFactor, p5.height / brushFactor), 10)
        // this.pos = p5.createVector(p5.random(-p5.width / brushFactor, p5.width / brushFactor), -p5.height / 2)
        // this.pos = p5.createVector((p5.random(-p5.width / brushFactor, p5.width / brushFactor)), (p5.random(-p5.height / brushFactor, p5.height / brushFactor)))
        // this.pos = p5.createVector((p5.random(-p5.width / 2, p5.width / 2)), (p5.random(-p5.height / 2, p5.height / 2)))
        this.vel = p5.createVector(0, 0)
        this.acc = p5.createVector(0, 0)
        this.maxSpeed = speedCap

        this.prevPos = this.pos.copy();

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

        this.updatePrev = function () {
            this.prevPos.x = this.pos.x
            this.prevPos.y = this.pos.y
        }

        this.show = function () {

            // p5.stroke(255, 113, 91, 10); // determines line colour - pastel red
            // p5.strokeWeight(1)
            // p5.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y)

            p5.fill(255, 113, 91, 5)
            p5.strokeWeight(0)
            p5.ellipse(this.pos.x, this.pos.y, 2.5)


            this.updatePrev()
        }

        this.edges = function () {
            if (this.crossCount < crossLimit) {
                if (this.pos.x > p5.width / 2) {
                    this.pos.x = - p5.width / 2;
                    this.pos.y = - this.pos.y;
                    this.updatePrev();
                    this.crossCount++
                }
                if (this.pos.x < - p5.width / 2) {
                    this.pos.x = p5.width / 2
                    this.pos.y = - this.pos.y;
                    this.updatePrev();
                    this.crossCount++
                }
                if (this.pos.y > p5.height / 2) {
                    this.pos.y = - p5.height / 2
                    this.pos.x = - this.pos.x;
                    this.updatePrev();
                    this.crossCount++
                }
                if (this.pos.y < - p5.height / 2) {
                    this.pos.y = p5.height / 2
                    this.pos.x = - this.pos.x;
                    this.updatePrev();
                    this.crossCount++
                }
            }
            else {
                if (this.arrayPushCount === 0) {
                    if (this.pos.x > p5.width / 2) {
                        crossCountArr.push(true)
                        this.arrayPushCount++
                    }
                    if (this.pos.x < - p5.width / 2) {
                        crossCountArr.push(true)
                        this.arrayPushCount++
                    }
                    if (this.pos.y > p5.height / 2) {
                        crossCountArr.push(true)
                        this.arrayPushCount++
                    }
                    if (this.pos.y < - p5.height / 2) {
                        crossCountArr.push(true)
                        this.arrayPushCount++
                    }
                }
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
            p5.createCanvas(canvasX, canvasY, p5.WEBGL)
            p5.pixelDensity(1)
            p5.background(0, 2 ,51)
            // p5.background('#ff715b') // deep purple
            // p5.background('#2e2f2f')
            // p5.background(255)
            cols = p5.floor(p5.width / scale)
            rows = p5.floor(p5.height / scale)

            flowfield = new Array(cols * rows);

            for (let i = 0; i < particleNo; i++) {
                particles[i] = new Particle(p5);
            }

        };

        p5.draw = () => {

            // p5.background(29,7,108, 5) // debugging

            let xOffset = 0
            for (let x = -cols; x < cols; x++) {
                let yOffset = 0
                for (let y = -rows; y < rows; y++) {

                    let index = (x + y * cols);
                    let angle = p5.noise(xOffset, yOffset, zOffset) * (angleSeed)
                    let vector = p5.constructor.Vector.fromAngle(angle);
                    vector.setMag(0.1)
                    flowfield[index] = vector;
                    yOffset += inc

                    p5.stroke(255); // debugging
                    p5.push();
                    p5.translate(x * scale, y * scale);
                    p5.rotate(vector.heading());
                    p5.strokeWeight(1)
                    // p5.line(0, 0, scale, 0) // debugging
                    p5.pop();
                }
                xOffset += inc
                zOffset += zInc
            }

            for (let i = 0; i < particles.length; i++) {
                particles[i].follow(flowfield)
                particles[i].update();
                particles[i].edges();
                particles[i].show();
            }
            if (crossCountArr.length > particleNo) {
                console.log("loop stopped")
                p5.noLoop()
            }
        };
    }

    return (
        <NextReactP5Wrapper sketch={sketch} />
    )
}