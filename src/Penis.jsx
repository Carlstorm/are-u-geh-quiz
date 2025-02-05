import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function Penis({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const { nodes } = useGLTF("/test2.glb");
  const penisRef = useRef();

  useFrame(() => {
    if (penisRef.current) {
      penisRef.current.position.set(position[0], position[1], position[2]);
      penisRef.current.rotation.set(rotation[0], rotation[1], rotation[2]);
    }
  });

  return (
    <group ref={penisRef} dispose={null}>
      <mesh geometry={nodes.Sphere.geometry} scale={0.16}>
        <meshToonMaterial color="#ddae9b" gradientMap={null} />
      </mesh>
    </group>
  );
}

useGLTF.preload("/test.glb");
