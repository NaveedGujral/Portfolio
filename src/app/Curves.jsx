import { Sketch } from "@p5-wrapper/react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";

export default function Curves({ screenWidth, screenHeight }) {

    // flow field controls

    const inc = 0.5; // flow field variance - increase for more variation
    const zInc = 0.0001 // flow field variance over time - increase for more variation but less smooth
    const scale = 75; // size of flow field cells, decreasing can impact performance
    
    // const particleNo = 1; // number of lines drawn
    const particleNo = 450; // number of lines drawn
    
    const speedCap = 2 // speed of particles drawing the lines
    const angleSeed = Math.PI * 2 // a random angle is picked from 0 to this value in radians
    // const angleSeed = Math.PI * 2 // a random angle is picked from 0 to this value in radians
    const crossLimit = 2
    const brushFactor = 9
    // const brushFactor = 9

    const canvasX = screenWidth
    const canvasY = screenHeight

    // colours
    const bgCol = {r:26, g:26 , b:26}
    const col1 = {r:151, g:71, b:255} // purple
    const col2 = {r:255, g:61, b:31} // orange



    // const bgCol = {r:0, g:2 , b:51}
    // const col1 = {r:255, g:113, b:91}

    let cols, rows;
    let zOffset = 0;
    let particles = [];
    let flowfield = [];
    let crossCountArr = []

    function Particle(p5) {
        this.crossCount = 0
        this.arrayPushCount = 0

        this.pos = p5.createVector(p5.width / 2, p5.random(-p5.height / brushFactor, p5.height / brushFactor), 10)
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
            
            // top to bottom LOOKS GOOD
            this.outR = p5.map(this.pos.y, -p5.height/2, p5.height/2, col1.r, col2.r, true)
            this.outG = p5.map(this.pos.y, -p5.height/2, p5.height/2, col1.g, col2.g, true)
            this.outB = p5.map(this.pos.y, -p5.height/2, p5.height/2, col1.b, col2.b, true)
            
            // center to out looks shit

            // this.dist = Math.sqrt((this.pos.x ** 2) + (this.pos.y ** 2))
            // this.maxDist = Math.sqrt(((p5.height/4) ** 2) + ((p5.width/4) ** 2))

            // this.outR = p5.map(this.dist, 0, this.maxDist, col1.r, col2.r, true)
            // this.outG = p5.map(this.dist, 0, this.maxDist, col1.g, col2.g, true)
            // this.outB = p5.map(this.dist, 0, this.maxDist, col1.b, col2.b, true)
            
            p5.fill(this.outR, this.outG, this.outB, 15)
            // p5.fill(col1.r, col1.g, col1.b, 5)
            p5.strokeWeight(0)
            p5.ellipse(this.pos.x, this.pos.y, 2)


            // this.updatePrev()
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
            p5.background(bgCol.r, bgCol.g, bgCol.b)
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
        };

        if (crossCountArr.length >= particleNo) {
            console.log("loop stopped")
            p5.noLoop()
        }
    }

    return (
        <NextReactP5Wrapper sketch={sketch} />
    )
}