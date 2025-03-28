import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Bloom,
  EffectComposer,
  DepthOfField,
} from "@react-three/postprocessing";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
uniform float u_particleHeight;
uniform float u_time;
uniform float u_t_coeff;
uniform float u_noise_factor;
varying vec3 adjustedPosition;
varying float particleHeight;

// perlin noise - start

vec3 mod289(vec3 x)
{
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x)
{
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x)
{
    return mod289(((x*34.0)+10.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
    return 1.79284291400159 - 0.85373472095314 * r;
}

vec3 fade(vec3 t) {
    return t*t*t*(t*(t*6.0-15.0)+10.0);
}

float pnoise(vec3 P, vec3 rep)
{
    vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period
    vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period
    Pi0 = mod289(Pi0);
    Pi1 = mod289(Pi1);
    vec3 Pf0 = fract(P); // Fractional part for interpolation
    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;

    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);

    vec4 gx0 = ixy0 * (1.0 / 7.0);
    vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);

    vec4 gx1 = ixy1 * (1.0 / 7.0);
    vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);

    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;

    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);

    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
    return 2.2 * n_xyz;
}

// perlin noise - end

void main() {
    
    adjustedPosition = position;

    adjustedPosition.y = ((sin(pnoise(position/u_noise_factor  + u_time * u_t_coeff, vec3(15.0))) * 0.5) + 0.5) * u_particleHeight;

    particleHeight = adjustedPosition.y/u_particleHeight;

    gl_PointSize = 2.0;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(adjustedPosition, 1.0);
}
`;

const fragmentShader = `
uniform vec3 u_colorA;
uniform vec3 u_colorB;
varying vec3 adjustedPosition;
varying float particleHeight;

void main() {
    

    // Create a circular shape by checking distance from center
    vec2 coord = gl_PointCoord - vec2(1.0); // Move origin to center
      if (dot(coord, coord) > 1.0) { // 0.25 is radius squared
        discard; // Outside circle, don't render
      }
        
        // Create a soft edge effect
    float distance = length(coord);
    float alpha = 2.0 - smoothstep(0.95, 1.0, distance);

    float colorMix = clamp(particleHeight - 0.425, 0.0, 1.0);
    float opacityMix = clamp(particleHeight - 0.425, 0.0, 1.0) * alpha;
    
    vec3 color = mix(vec3(u_colorA), vec3(u_colorB), colorMix);
    
    // gl_FragColor = vec4(u_colorA, opacityMix);
    gl_FragColor = vec4(color, opacityMix);
}
`;

export default function LandingVis() {
  const planeGap = 0.25;
  const planeDim = 150;

  const positions = useMemo(() => {
    const posArr = [];
    for (let x = -planeDim; x <= planeDim; x += planeGap) {
      for (let z = -planeDim; z <= planeDim; z += planeGap) {
        posArr.push(x, 0, z);
      }
    }
    return posArr;
  }, [planeGap]);

  function Particles() {
    const planeRef = useRef();
    const { viewport } = useThree();

    const uniforms = useMemo(
      () => ({
        u_colorA: { value: new THREE.Color("#9747ff") },
        u_colorB: { value: new THREE.Color("#ffffff") },
        u_time: { type: "f", value: 0.0 },
        u_t_coeff: { type: "f", value: 0.05 },
        u_noise_factor: { type: "f", value: 60.0 },
        u_particleHeight: { type: "f", value: 75.0 },
      }),
      []
    );

    useFrame(({ clock }) => {
      // updating values for perlin noise
      uniforms.u_time.value = clock.getElapsedTime();
    });

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
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent={true}
        />
      </points>
    );
  }

  function CameraTracker() {
    // Use useFrame to get updates every frame
    useFrame((state) => {
      console.log("Camera position:", state.camera.position);
      // Optional: Log rotation if needed
      console.log("Camera rotation:", state.camera.rotation);
    });

    // Component doesn't render anything
    return null;
  }

  return (
    <Canvas
      camera={{ position: [105, 85, -105], fov: 25 }}
      className="h-screen w-screen"
    >
      <Particles />
      <OrbitControls />
    </Canvas>
  );
}
