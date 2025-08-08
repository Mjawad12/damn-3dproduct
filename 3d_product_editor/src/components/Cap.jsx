import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { CanvasTexture } from "./ModelWrapper";

export function Cap(props) {
  const { nodes, materials } = useGLTF("/Cap.glb");
  return (
    <group {...props} dispose={null}>
      <group name="Scene" rotation={[Math.PI / 2, 0, 0]}>
        <mesh
          name="10131_BaseballCap_v2_L3"
          castShadow
          receiveShadow
          geometry={nodes["10131_BaseballCap_v2_L3"].geometry}
          material={materials["10131_BaseballCap_v02"]}
          rotation={[-0.039, -2.501, 0.102]}
          scale={0.025}
        >
          <CanvasTexture />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload("/Cap.glb");
