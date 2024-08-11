import { Sketch } from "@p5-wrapper/react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";

export default function testGradient() {
    const inc = 0.05;
    const zInc = 0.0001
    const scale = 60;
    const particleNo = 300;
    const speedCap = 3
    let cols, rows;
    let zOffset = 0;
    let particles = [];
    let flowfield = [];

    function sketch(p5) {

        p5.setup = () => {
            p5.createCanvas(600, 600, p5.WEBGL)
            p5.background(255)

            p5.fill(0)

            p5.circle(0, 0, 20)
        };

        p5.draw = () => {
        };
        p5.noLoop()
    }

    return (
        <NextReactP5Wrapper sketch={sketch} />
    )
}