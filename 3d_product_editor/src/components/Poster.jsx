import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { CanvasTexture } from "./ModelWrapper";

export function Poster(props) {
  const { nodes, materials } = useGLTF("/poster2.glb");
  const woodenTexture = useTexture("./wooden.jpg");
  return (
    <group {...props} dispose={null}>
      <group name="Scene" scale={0.25} rotation={[0, Math.PI / 2, Math.PI / 2]}>
        <mesh
          name="Plane007"
          castShadow
          receiveShadow
          geometry={nodes.Plane007.geometry}
          material={materials["Material.002"]}
          position={[-0.194, 1.208, 0.072]}
          rotation={[1.572, 0.047, -1.579]}
          scale={0.746}
        >
          <meshMatcapMaterial map={woodenTexture} />
        </mesh>
        <mesh
          name="Plane006"
          castShadow
          receiveShadow
          geometry={nodes.Plane006.geometry}
          material={materials["Material.003"]}
          position={[-0.212, 1.447, 0.072]}
          rotation={[0.001, 0.008, 1.618]}
          scale={0.771}
        >
          <meshMatcapMaterial map={woodenTexture} />
        </mesh>
        <mesh
          name="Cube004"
          castShadow
          receiveShadow
          geometry={nodes.Cube004.geometry}
          material={materials["Glass Simple"]}
          position={[-0.207, 1.418, 0.05]}
          rotation={[0.001, 0.008, 0.047]}
          scale={[0.009, 0.771, 0.771]}
        >
          <CanvasTexture />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload("/poster2.glb");
