import { useGLTF } from "@react-three/drei";
import React from "react";

export function Skyscraper(props) {
  const { nodes, materials } = useGLTF("models/Skyscraper.glb");

  // Ajuste a escala do prédio
  const scale = 2.5;

  // Retorne o grupo com o prédio escalado
  return (
    <group {...props} scale={[scale, scale, scale]} dispose={null}>
      <mesh
        geometry={nodes.skyscraperE_1.geometry}
        material={materials.trim}
        castShadow
      />
      <mesh
        geometry={nodes.skyscraperE_1_1.geometry}
        material={materials.window}
        castShadow
      />
      <mesh
        geometry={nodes.skyscraperE_1_2.geometry}
        material={materials.border}
        castShadow
      />
      <mesh
        geometry={nodes.skyscraperE_1_3.geometry}
        material={materials._defaultMat}
        castShadow
      />
      <mesh
        geometry={nodes.skyscraperE_1_4.geometry}
        material={materials.roof}
        castShadow
      />
      <mesh
        geometry={nodes.skyscraperE_1_5.geometry}
        material={materials.door}
        castShadow
      />
    </group>
  );
}

useGLTF.preload("/models/Skyscraper.glb");

// Componente que cria várias instâncias do prédio em posições fixas
export function City(props) {
  // Defina as posições fixas para os prédios
  const buildingPositions = [
    [-1, -1, -1],
    [5, -1, 1],
    [5, -3, -20],
    [-5, -1, 1],
    // [0, 0, -5],
  ];

  return (
    <group {...props}>
      {buildingPositions.map((position, index) => (
        <Skyscraper key={index} position={position} />
      ))}
    </group>
  );
}
