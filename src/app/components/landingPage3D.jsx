import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { Color, Vector3, Quaternion } from "three";
import * as THREE from "three";

export default function LandingPage3D() {

  const CustomGeometryParticles = (props) => {
    const { count, shape } = props;

    // This reference gives us direct access to our points
    const points = useRef();

    // Generate our positions attributes array
    const particlesPosition = useMemo(() => {
      const positions = new Float32Array(count * 3);

      if (shape === "box") {
        for (let i = 0; i < count; i++) {
          let x = (Math.random() - 0.5) * 2;
          let y = (Math.random() - 0.5) * 2;
          let z = (Math.random() - 0.5) * 2;

          positions.set([x, y, z], i * 3);
        }
      }

      if (shape === "sphere") {
        const distance = 1;

        for (let i = 0; i < count; i++) {
          const theta = THREE.MathUtils.randFloatSpread(360);
          const phi = THREE.MathUtils.randFloatSpread(360);

          let x = distance * Math.sin(theta) * Math.cos(phi)
          let y = distance * Math.sin(theta) * Math.sin(phi);
          let z = distance * Math.cos(theta);

          positions.set([x, y, z], i * 3);
        }
      }

      return positions;
    }, [count, shape]);

    return (
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlesPosition.length / 3}
            array={particlesPosition}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.015} color="#5786F5" sizeAttenuation depthWrite={false} />
      </points>
    );
  };

  const TwistedBox = () => {
    // This reference gives us direct access to the mesh
    const mesh = useRef();
    const quaternion = new Quaternion();

    useEffect(() => {
      // Get the current attributes of the geometry
      const currentPositions = mesh.current.geometry.attributes.position;
      // Copy the attributes
      const originalPositions = currentPositions.clone();
      const originalPositionsArray = originalPositions?.array || [];

      // Go through each vector (series of 3 values) and modify the values
      for (let i = 0; i < originalPositionsArray.length; i = i + 3) {
        const modifiedPositionVector = new Vector3(originalPositionsArray[i], originalPositionsArray[i + 1], originalPositionsArray[i + 2]);
        const upVector = new Vector3(0, 1, 0);

        // Rotate along the y axis (0, 1, 0)
        quaternion.setFromAxisAngle(
          upVector,
          (Math.PI / 180) * (modifiedPositionVector.y + 10) * 100 // the higher along the y axis the vertex is, the more we rotate
        );
        modifiedPositionVector.applyQuaternion(quaternion);

        // Apply the modified position vector coordinates to the current position attributes array
        currentPositions.array[i] = modifiedPositionVector.x
        currentPositions.array[i + 1] = modifiedPositionVector.y
        currentPositions.array[i + 2] = modifiedPositionVector.z
      }
      // Set the needsUpdate flag to "true"
      currentPositions.needsUpdate = true;
    }, [])

    return (
      <mesh ref={mesh} position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1, 10, 10, 10]} />
        <meshLambertMaterial color="hotpink" emissive="hotpink" />
      </mesh>
    );
  };

  return (
    <>
    <Canvas camera={{ position: [1.5, 1.5, 1.5] }}>
        <ambientLight intensity={0.5} />
        {/* Try to change the shape prop to "box" and hit reload! */}

        {/* <CustomGeometryParticles count={2000} shape="sphere" /> */}
        <TwistedBox />
        {/* <OrbitControls autoRotate /> */}
    </Canvas> 
    </>
  )
}