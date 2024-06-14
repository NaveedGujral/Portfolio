import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const count = 500

const vertexShader = `
uniform float uPixelRatio;
uniform float uSize;
uniform float time;
uniform vec3 mousePos;

attribute float vScale;

void main() {
  vec3 tempPos = vec3(position.xyz);
  
  vec3 seg = position - mousePos;
  vec3 dir = normalize(seg);
  float dist = length(seg);
  if (dist < 30.){
    float force = clamp(1. / (dist * dist), 0., 1.);
    tempPos += dir * force * 1.1;
  }

  vec4 modelPosition = modelMatrix * vec4(tempPos, 1.);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;

 

  gl_Position = projectionPosition;
  gl_PointSize = uSize * vScale * uPixelRatio;
  gl_PointSize *= (1.0 / -viewPosition.z);
}`

const fragmentShader = `
void main() {
  float _radius = 0.4;
  vec2 dist = gl_PointCoord - vec2(0.5);
  float strength = 1.-smoothstep(
    _radius-(_radius*0.4),
        _radius+(_radius*0.3),
        dot(dist,dist)*4.0
    );

  gl_FragColor = vec4(0.2, 0.2, 6., strength);
}
`
const uniforms = {
  uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
  uSize: { value: 100 },
  time: {
    value: 0
  },
  mousePos: { value: new THREE.Vector3() }
}

export default function ParticlePath() {
    const CurveAnimation = () => {
      const pointsRef = useRef()
      const shaderMaterial = useRef()
    
      const points = [
        new THREE.Vector3(-3.4, -3.5, 0),
        new THREE.Vector3(1, 0, 0),
        new THREE.Vector3(6, 0, 0),
        new THREE.Vector3(8, 0, 0)
        // Add more points here (200 points in total)
      ]
      const curve = new THREE.CatmullRomCurve3(points)
      const numPoints = count
    
      const progresses = useRef(new Array(numPoints).fill(0).map(() => Math.random()))
    
      useEffect(() => {
        if (pointsRef.current) {
          pointsRef.current.geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(numPoints * 3), 3))
          pointsRef.current.geometry.setAttribute("vScale", new THREE.BufferAttribute(new Float32Array(numPoints), 1))
        }
      }, [])
    
      const offset = new Float32Array(numPoints * 3)
    
      for (let i = 0; i < numPoints; i++) {
        const xOffset = Math.random() * 0.29
        const yOffset = Math.random() * 0.29
        offset[i * 3] = xOffset
        offset[i * 3 + 1] = yOffset
        offset[i * 3 + 2] = 0
      }
    
      useFrame(({ clock }) => {
        const updatedPositions = new Float32Array(numPoints * 3)
        const vScale = new Float32Array(numPoints)
    
        const pointOnCurve = new THREE.Vector3()
    
        for (let i = 0; i < numPoints; i++) {
          progresses.current[i] += 0.0006 // Adjust the animation speed here (smaller value for slower animation)
    
          if (progresses.current[i] >= 1) {
            progresses.current[i] = 0 // Reset progress to 0 when it reaches 1
          }
    
          const progress = progresses.current[i]
    
          curve.getPointAt(progress, pointOnCurve)
    
          updatedPositions[i * 3] = pointOnCurve.x + offset[i * 3]
          updatedPositions[i * 3 + 1] = pointOnCurve.y + offset[i * 3 + 1]
          updatedPositions[i * 3 + 2] = pointOnCurve.z + offset[i * 3 + 1]
    
          vScale[i] = Math.random() * 1.1
        }
    
        if (pointsRef.current && pointsRef.current.geometry.attributes && pointsRef.current.geometry.attributes.position) {
          pointsRef.current.geometry.attributes.position.array = updatedPositions
          pointsRef.current.geometry.attributes.vScale.array = vScale
          pointsRef.current.geometry.attributes.position.needsUpdate = true
    
          shaderMaterial.current.uniforms.time.value = clock.elapsedTime
        }
      })
    
      return (
        <group>
          <mesh
            position={[-5, -3.5, 0]}
            onPointerMove={(e) => {
              console.log("hello")
              uniforms.mousePos.value.x = e.point.x
              uniforms.mousePos.value.y = e.point.y
            }}
            onPointerOut={() => {
              uniforms.mousePos.value.x = -150
              uniforms.mousePos.value.y = -150
            }}>
            <planeGeometry args={[100, 100]} />
            <meshBasicMaterial color={"#28282b"} />
          </mesh>
          <points ref={pointsRef}>
            <bufferGeometry attach="geometry">
              <bufferAttribute
                attachObject={["attributes", "position"]}
                array={new Float32Array(numPoints * 3)}
                itemSize={3}
                onUpdate={(self) => (self.needsUpdate = true)}
              />
              <bufferAttribute
                attachObject={["attributes", "vScale"]}
                array={new Float32Array(numPoints)}
                itemSize={1}
                onUpdate={(self) => (self.needsUpdate = true)}
              />
            </bufferGeometry>
            <shaderMaterial ref={shaderMaterial} transparent depthWite={false} fragmentShader={fragmentShader} vertexShader={vertexShader} uniforms={uniforms} />
            {/* <pointsMaterial color="red" size={0.1} /> */}
          </points>
        </group>
      )
    
    }
    
    return (
      <Canvas shadows camera={{ position: [0, 0, 24], fov: 60 }}>
        <pointLight position={[-10, 0, -20]} color="black" intensity={1} />
        <pointLight position={[0, -10, 0]} color="black" intensity={1} />
        <group position={[-5, -3.5, 0]}>
          <mesh receiveShadow castShadow>
            <boxGeometry args={[4, 3, 3]} />
            <meshLambertMaterial color={"black"} />
          </mesh>
        </group>
        <CurveAnimation />
        <OrbitControls />
      </Canvas>
    )
}
