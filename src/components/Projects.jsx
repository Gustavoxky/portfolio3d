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
    url: "https://www.youtube.com/watch?v=pGMKIyALcK0",
    image: "projects/tinder.png",
    description: "Clone do tinder desenvolvido em swift e swiftUI",
  },
  {
    title: "Blockchain",
    url: "https://github.com/Gustavoxky/blockchain_go",
    image: "projects/blockchain.jpeg",
    description: "Use React Three Fiber to create a 3D game",
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
        position-z={-0.001}
        onClick={() => window.open(project.url, "_blank")}
        ref={background}
      >
        <planeGeometry args={[5, 3.5]} />
        <meshBasicMaterial color="black" transparent opacity={0.4} />
      </mesh>
      <Image
        scale={[4.8, 2.2, 2]}
        url={project.image}
        toneMapped={false}
        position-y={0.5}
      />
      <Text
        maxWidth={2}
        anchorX={"left"}
        anchorY={"top"}
        fontSize={0.2}
        position={[-1, -0.7, 0]}
      >
        {project.title.toUpperCase()}
      </Text>
      <Text
        maxWidth={2.5}
        anchorX="left"
        anchorY="top"
        fontSize={0.18}
        position={[-1, -1, 0]}
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
            y: currentProject === index ? 0 : -0.1,
            z: currentProject === index ? -2 : -3,
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
