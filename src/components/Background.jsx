import { Sphere, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export const Background = () => {
  const material = useRef(new THREE.MeshBasicMaterial({ side: THREE.BackSide, toneMapped: false }));
  const color = useRef(new THREE.Color("#363062"));
  const data = useScroll();

  const tl = useRef(gsap.timeline());

  useFrame(() => {
    const progress = data.scroll.current; // assuming progress is between 0 and 1
    tl.current.progress(progress);
    material.current.color.copy(color.current);
  });

  useEffect(() => {
    tl.current.to(color.current, { r: 77 / 255, g: 76 / 255, b: 125 / 255 }); // Color: "#4D4C7D"
    tl.current.to(color.current, { r: 1, g: 0.85882352941, b: 0.76470588235 }); // Color: "#FFDBC3"
    tl.current.to(color.current, { r: 0.96078431372, g: 0.96078431372, b: 0.96078431372 }); // Color: "#F5F5F5"
  }, []);

  return (
    <group>
      <Sphere scale={[30, 30, 30]}>
        <primitive object={material.current} />
      </Sphere>
    </group>
  );
};
