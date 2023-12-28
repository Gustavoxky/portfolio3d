import { Scroll, ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { MotionConfig } from "framer-motion";
import { Leva } from "leva";
import { useEffect, useState } from "react";
import { Experience } from "./components/Experience";
import { Interface } from "./components/Interface";
import { Menu } from "./components/Menu";
import { ScrollManager } from "./components/ScrollManager";
import { framerMotionConfig } from "./config";
import Loader from "./components/loader";
// import Footer from "./components/Footer";

function App() {
  const [section, setSection] = useState(0);
  const [menuOpened, setMenuOpened] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false); // Estado para controlar se a página está carregada

  useEffect(() => {
    // Simule um atraso de carregamento de 2 segundos
    const delay = setTimeout(() => {
      setPageLoaded(true);
    }, 2000);

    return () => clearTimeout(delay); // Limpe o timeout se o componente for desmontado antes do carregamento completo
  }, []);

  useEffect(() => {
    setMenuOpened(false);
  }, [section]);

  return (
    <>
      {!pageLoaded ? (
        // Renderize o loader enquanto a página estiver carregando
        <Loader />
      ) : (
        // Renderize o conteúdo quando a página estiver carregada
        <MotionConfig
          transition={{
            ...framerMotionConfig,
          }}
        >
          <Canvas shadows camera={{ position: [0, 3, 10], fov: 42 }}>
            <color attach="background" args={["#e6e7ff"]} />
            <ScrollControls pages={4} damping={0.1}>
              <ScrollManager section={section} onSectionChange={setSection} />
              <Scroll>
                <Experience section={section} menuOpened={menuOpened} />
              </Scroll>
              <Scroll html>
                <Interface setSection={setSection} />
              </Scroll>
            </ScrollControls>
          </Canvas>
          <Menu
            onSectionChange={setSection}
            menuOpened={menuOpened}
            setMenuOpened={setMenuOpened}
          />
        </MotionConfig>
      )}
       {/* <Footer/> */}
      <Leva hidden />
     
    </>
  );
}

export default App;
