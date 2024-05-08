'use client'

import { OrbitControls, useFBO } from "@react-three/drei";
import { Canvas, useFrame, extend, createPortal } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import './globals.css';

import SimulationMaterial from './SimulationMaterial';
import Example3D from "./Example3D"

import vertexShader from "!!raw-loader!./vertexShader.glsl";
import fragmentShader from "!!raw-loader!./fragmentShader.glsl";
extend({ SimulationMaterial: SimulationMaterial });

export default function Home() {

  const ref = useRef(null);
  const handleClick = (section) => {
    const element = document.getElementById(section)
    element.scrollIntoView({ behavior: 'smooth' });
  };

  // 3D

  const FBOParticles = () => {
    const size = 128;

    const points = useRef();
    const simulationMaterialRef = useRef();

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1 / Math.pow(2, 53), 1);
    const positions = new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0]);
    const uvs = new Float32Array([0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0]);

    const renderTarget = useFBO(size, size, {
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      format: THREE.RGBAFormat,
      stencilBuffer: false,
      type: THREE.FloatType,
    });

    const particlesPosition = useMemo(() => {
      const length = size * size;
      const particles = new Float32Array(length * 3);
      for (let i = 0; i < length; i++) {
        let i3 = i * 3;
        particles[i3 + 0] = (i % size) / size;
        particles[i3 + 1] = i / size / size;
      }
      return particles;
    }, [size]);

    const uniforms = useMemo(() => ({
      uPositions: {
        value: null,
      }
    }), [])

    useFrame((state) => {
      const { gl, clock } = state;

      gl.setRenderTarget(renderTarget);
      gl.clear();
      gl.render(scene, camera);
      gl.setRenderTarget(null);

      points.current.material.uniforms.uPositions.value = renderTarget.texture;

      simulationMaterialRef.current.uniforms.uTime.value = clock.elapsedTime;
    });

    return (
      <>
        {createPortal(
          <mesh>
            <simulationMaterial ref={simulationMaterialRef} args={[size]} />
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={positions.length / 3}
                array={positions}
                itemSize={3}
              />
              <bufferAttribute
                attach="attributes-uv"
                count={uvs.length / 2}
                array={uvs}
                itemSize={2}
              />
            </bufferGeometry>
          </mesh>,
          scene
        )}
        <points ref={points}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={particlesPosition.length / 3}
              array={particlesPosition}
              itemSize={3}
            />
          </bufferGeometry>
          <shaderMaterial
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            fragmentShader={fragmentShader}
            vertexShader={vertexShader}
            uniforms={uniforms}
          />
        </points>
      </>
    );
  };

  // 3D

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-0">

      <nav className="flex h-16 w-full items-center justify-end pr-16 fixed top-0 z-10 bg-custom-grey backdrop-filter backdrop-blur bg-opacity-50">
        <div className="w-[18rem]">
          <div className="flex w-full justify-between">
            <button onClick={() => handleClick("home")} class="btn-header">Home</button>
            <button onClick={() => handleClick("about")} class="btn-header">About</button>
            <button onClick={() => handleClick("projects")} class="btn-header">Projects</button>
            <button onClick={() => handleClick("contact")} class="btn-header">Contact</button>
          </div>
        </div>
      </nav>

      <div id="home" className="flex bg-custom-grey w-full h-screen top-0 justify-center items-center">
        <div className="justify-center items-center flex-col">
          <div className="text-white font-LexendGiga font-extralight text-7xl text-center py-6"> Naveed Gujral </div>
          <div className="text-white font-LexendGiga font-thin text-5xl text-center py-6"> Developer | Designer </div>
        </div>

        {/* <Canvas camera={{ position: [2, 2, 2] }}>
          <ambientLight intensity={0.5} />
          <FBOParticles />
          <OrbitControls/>
        </Canvas> */}

        <Example3D/>

      </div>

      <div id="about" className="flex bg-custom-white-50 w-full h-screen items-center justify-center ">
      </div>

      <div id="projects" className="flex bg-green-500 w-full h-screen items-center justify-center ">
        <p className="text-white"> Projects </p>
      </div>

      <div id="contact" className="flex bg-violet-600 w-full h-screen items-center justify-center ">
        <p className="text-white"> Contact </p>
      </div>

    </main>


  );
}

