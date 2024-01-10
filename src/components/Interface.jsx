import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { currentProjectAtom, projects } from "./Projects";

const Section = (props) => {
  const { children } = props;

  return (
    <motion.section
      className={`
  h-screen w-screen p-8 max-w-screen-2xl mx-auto
  flex flex-col items-start justify-center
  `}
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 1,
          delay: 0.6,
        },
      }}
    >
      {children}
    </motion.section>
  );
};

export const Interface = (props) => {
  const { setSection } = props;
  return (
    <div className="flex flex-col items-center w-screen">
      <AboutSection setSection={setSection} />
      <div className="mt-24">
        <SkillsSection />
      </div>
      <div className="mt-24">
        <ProjectsSection />
      </div>
        <ContactSection />
    </div>

  );
};

const AboutSection = (props) => {
  const { setSection } = props;
  return (
    <Section>
      <h1 className="text-6xl text-gray-100 font-extrabold leading-snug">
        Hi, I'm
        <br />
        <span className="bg-gray-800 px-8 italic shadow-2xl rounded-lg ">Gustavo correia</span>
      </h1>
      <motion.p
        className="text-lg text-gray-100 mt-4"
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 1.5,
        }}
      >
        I'm a software developer
        <br />
        
      </motion.p>
      <motion.button
        onClick={() => setSection(3)}
        className={`bg-indigo-600 text-white py-4 px-8 
      rounded-lg font-bold text-lg mt-16 shadow hover:shadow-2xl hover:bg-indigo-800`}
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 2,
        }}
      >
        Contact me
      </motion.button>
    </Section>
  );
};

const skills = [
  {
    title: "Threejs / React Three Fiber",
    level: 70,
  },
  {
    title: "React / React Native",
    level: 90,
  },
  {
    title: "Nodejs",
    level: 90,
  },
  {
    title: "Typescript",
    level: 60,
  },
  {
    title: "SQL/Docker",
    level: 40,
  },
  {
    title: "C#",
    level: 40,
  },
  {
    title: "Java/Kotlin",
    level: 40,
  },
];
const languages = [
  {
    title: "🇺🇸 English",
    level: 60
  },
  {
    title: "🇪🇸 Spanish",
    level: 60,
  },
  {
    title: "🇧🇷 Portuguese-BR",
    level: 90,
  }
];

const SkillsSection = () => {
  return (
    <Section>
      <motion.div whileInView={"visible"}>
        <h2 className="text-5xl font-bold text-blue-500">Skills</h2>
        <div className=" mt-8 space-y-4 bg-white p-4 opacity-80 shadow-2xl rounded-lg ">
          {skills.map((skill, index) => (
            <div className="w-64" key={index}>
              <motion.h3
                className="text-xl font-bold text-gray-700"
                initial={{
                  opacity: 0,
                }}
                variants={{
                  visible: {
                    opacity: 1,
                    transition: {
                      duration: 1,
                      delay: 1 + index * 0.2,
                    },
                  },
                }}
              >
                {skill.title}
              </motion.h3>
              <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                <motion.div
                  className="h-full bg-indigo-500 rounded-full "
                  style={{ width: `${skill.level}%` }}
                  initial={{
                    scaleX: 0,
                    originX: 0,
                  }}
                  variants={{
                    visible: {
                      scaleX: 1,
                      transition: {
                        duration: 1,
                        delay: 1 + index * 0.2,
                      },
                    },
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-5xl font-bold mt-10 text-blue-500">Languages</h2>
          <div className=" mt-8 space-y-4 bg-white p-4 opacity-80 shadow-2xl rounded-lg">
            {languages.map((lng, index) => (
              <div className="w-64" key={index}>
                <motion.h3
                  className="text-xl font-bold text-gray-700"
                  initial={{
                    opacity: 0,
                  }}
                  variants={{
                    visible: {
                      opacity: 1,
                      transition: {
                        duration: 1,
                        delay: 2 + index * 0.2,
                      },
                    },
                  }}
                >
                  {lng.title}
                </motion.h3>
                <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                  <motion.div
                    className="h-full bg-indigo-500 rounded-full "
                    style={{ width: `${lng.level}%` }}
                    initial={{
                      scaleX: 0,
                      originX: 0,
                    }}
                    variants={{
                      visible: {
                        scaleX: 1,
                        transition: {
                          duration: 1,
                          delay: 2 + index * 0.2,
                        },
                      },
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </Section>
  );
};

const ProjectsSection = () => {
  const [currentProject, setCurrentProject] = useAtom(currentProjectAtom);

  const nextProject = () => {
    setCurrentProject((currentProject + 1) % projects.length);
  };

  const previousProject = () => {
    setCurrentProject((currentProject - 1 + projects.length) % projects.length);
  };

  return (
    <Section>
      <div className="flex w-full h-full gap-8 items-center justify-center">
        <button
          className="hover:text-indigo-600 transition-colors text-blue-500 z-index-10 mt-96"
          onClick={previousProject}
        >
          ← Previous
        </button>
        <h2 className="text-5xl font-bold text-gray-500 mt-96">Projects</h2>
        <button
          className="hover:text-indigo-600 transition-colors text-blue-500 z-index-10 mt-96"
          onClick={nextProject}
        >
          Next →
        </button>
      </div>
    </Section>
  );
};

const ContactSection = () => {
  return (
    <Section>
      <div className="mt-8 p-8 rounded-md bg-gray-700 w-full max-w-full opacity-50 shadow-2xl fixed bottom-40 left-0">
        <div className="flex flex-col space-y-4">
          <a href="mailto:seuemail@example.com" className="text-white hover:text-blue-500" target="_blank" rel="noopener noreferrer">
            Email
          </a>
          <a href="https://wa.me/+5511999582931" className="text-white hover:text-green-500" target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          <a href="https://www.linkedin.com/in/gustavo-correia-dos-santos-6039641a6/" className="text-white hover:text-blue-500" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="https://github.com/Gustavoxky" className="text-white hover:text-gray-500" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>
        <footer className="bg-gray-100 text-gray-700 bg-opacity-50 p-4">
          <div className="container mx-auto">
            <div className="text-2xl font-bold flex items-center">Gustavo Correia &copy;</div>
          </div>
        </footer>
      </div>     
    </Section>

  );
};
