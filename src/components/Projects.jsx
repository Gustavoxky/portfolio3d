import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";

import { motion } from "framer-motion-3d";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

export const projects = [
  {
    title: "API project",
    url: "https://github.com/Gustavoxky/ApiProject",
    image: "projects/APIs.png",
    description: "Uma API com 7 endpoints desenvolvida com typescrit, node.js SQLite e jest",
  },
  {
    title: "Cloud project",
    url: "https://github.com/Gustavoxky/CloudProject",
    image: "projects/cloud.jpeg",
    description: "Um simulador de cloud computing desenvolvido em java com cloudSimPlus ",
  },
  {
    title: "Social media app",
    url: "https://github.com/Gustavoxky/SocialMediaApp",
    image: "projects/tinder.png",
    description: "Clone do tinder desenvolvido em swift e swiftUI",
  },
  {
    title: "Blockchain",
    url: "https://github.com/Gustavoxky/blockchain_go",
    image: "projects/blockchain.jpeg",
    description: "Blockchain desenvolvida em Go",
  },
];

const Project = (props) => {
  const { project, highlighted } = props;

  const background = useRef();
  const bgOpacity = useMotionValue(0.4);

  useEffect(() => {
    animate(bgOpacity, highlighted ? 0.5 : 0.2);
  }, [highlighted]);

  useFrame(() => {
    background.current.material.opacity = bgOpacity.get();
  });

  return (
    <group {...props}>
      <mesh
        position={[0, -2.5, -0.001]}
        rotation-x={-0.2}
        onClick={() => window.open(project.url, "_blank")}
        ref={background}
      >
      <planeBufferGeometry
        args={[5.5, 3.8, 32, 32]} // Adicionamos mais segmentos para suavizar as bordas
        attach="geometry"
      />        
        <meshBasicMaterial color="black" transparent opacity={0.4} />
      </mesh>
      <Image
        scale={[4.8, 2.2, 2]}
        url={project.image}
        toneMapped={false}
        position-y={-2}
        rotation-x={-0.2}
        position-z={0.5}
      />
      <Text
        maxWidth={3}
        anchorX={"left"}
        anchorY={"top"}
        fontSize={0.2}
        position={[-1, -3.1, 1]}
      >
        {project.title.toUpperCase()}
      </Text>
      <Text
        maxWidth={3.5}
        anchorX="left"
        anchorY="top"
        fontSize={0.18}
        position={[-1.5, -3.5, 1]}
      >
        {project.description}
      </Text>
    </group>
  );
};

export const currentProjectAtom = atom(Math.floor(projects.length / 2));

export const Projects = () => {
  const { viewport } = useThree();
  const [currentProject] = useAtom(currentProjectAtom);

  return (
    <group position-y={-viewport.height * 2 + 1}>
      {projects.map((project, index) => (
        <motion.group
          key={"project_" + index}
          position={[index * 5, 0, -3]}
          animate={{
            x: 0 + (index - currentProject) * 5,
            y: currentProject === index ? 0 : -1,
            z: currentProject === index ? -2 : -5,
            rotateX: currentProject === index ? 0 : -Math.PI / 3,
            rotateZ: currentProject === index ? 0 : -0.1 * Math.PI,
          }}
        >
          <Project project={project} highlighted={index === currentProject} />
        </motion.group>
      ))}
    </group>
  );
};
