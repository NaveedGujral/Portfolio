'use client'

/*

1) Fill Canvas with perlin noise values X
    1a) convert greyscale vals to vectors
2) Change perlin noise over time with a third noise value
4) draw particles on one side of the screen
5) have the particles accelerate based on it's positon and relevant vector, acceleration needs to be capped
6) have the mouse repulse particles around it

*/

import { Sketch } from "@p5-wrapper/react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";

export default function LandingAnim() {
    const inc = 0.0025

    function sketch(p5) {

        p5.setup = () => {
            p5.createCanvas(800, 800, p5.WEBGL)
            p5.pixelDensity(1)
        };

        p5.draw = () => {
            let xOffset = 0
            p5.loadPixels();
            for (let x = 0; x < p5.width; x++) {
                let yOffset = 0
                for (let y = 0; y < p5.height; y++) {
                    const index = (x + y * p5.width) * 4
                    let r = p5.noise(xOffset, yOffset) * 255

                    p5.pixels[index] = r
                    p5.pixels[index + 1] = r
                    p5.pixels[index + 2] = r
                    p5.pixels[index + 3] = 255

                    yOffset += inc
                }
                xOffset += inc
            }
            p5.updatePixels();
        };
    }

    return (
        <NextReactP5Wrapper sketch={sketch} />
    )
}