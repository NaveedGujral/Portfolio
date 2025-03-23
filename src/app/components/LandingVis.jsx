import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
uniform float u_particleHeight;
varying vec3 adjustedPosition;
varying float distanceAsMixValue;
varying float gradientMix;

void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    worldPosition /= worldPosition.w;
    float vertexDistance = distance(vec3(0.0, 0.0, 0.0), worldPosition.xyz);
    float totalDistance = 31.5; 
    float distanceAsPercentage = vertexDistance / totalDistance;
    float indexLowerValue = floor(distanceAsPercentage * 256.0);
    float indexHigherValue = ceil(distanceAsPercentage * 256.0);
    float frequency = mix(u_frequencyArray[int(indexLowerValue)], u_frequencyArray[int(indexHigherValue)], fract(distanceAsPercentage));
    
    adjustedPosition = position;
    adjustedPosition.y = frequency/ 15.0;
    // adjustedPosition.y = frequency / u_particleHeight;
    gradientMix = (frequency / 256.0) - 0.125;
    distanceAsMixValue = clamp(adjustedPosition.y, 0.0, 1.0);
    gl_PointSize = 2.0;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(adjustedPosition, 1.0);
}
`;

const fragmentShader = `
uniform vec3 u_colorA;
uniform vec3 u_colorB;
varying vec3 adjustedPosition;
varying float distanceAsMixValue;
varying float gradientMix;

void main() {
    vec3 color = mix(vec3(u_colorA), vec3(u_colorB), gradientMix);
    gl_FragColor = vec4(color, distanceAsMixValue);
    // gl_FragColor = vec4(color, 1.0);
}
`;

export default function LandingVis({}) {
  const planeDistance = 31.5;
  const planeGap = -0.5;

  const positions = useMemo(() => {
    const posArr = [];
    for (let x = -planeDistance; x <= planeDistance; x += planeGap) {
      for (let z = planeDistance; z >= -planeDistance; z -= planeGap) {
        posArr.push(x, 0, z);
      }
    }
    return posArr;
  }, [planeGap]);

  function Plane() {
    const planeRef = useRef();

    const uniforms = useMemo(
      () => ({
        u_colorA: { value: new THREE.Color("#93DCE5") },
        u_colorB: { value: new THREE.Color("#E172DC") },
      }),
      []
    );

    return (
      <points ref={planeRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={new Float32Array(positions)}
            itemSize={3}
          />
        </bufferGeometry>
        {/* <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent={true}
        /> */}
      </points>
    );
  }
  return (
    <Canvas className="w-screen h-screen">
      <Plane />
    </Canvas>
  );
}
