"use client";

// Libraries
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  Fragment,
} from "react";
import "./globals.css";
import dynamic from "next/dynamic";
import { chunk } from "lodash"; // Make sure to import the chunk utility

// components
import Curves from "./Curves";
import LandingTitle from "./components/SVG/LandingTitle";
import TypedComp from "./components/TypedComp";
import Lenis from "lenis";
import { motion } from "framer-motion";
import { easeInOut } from "framer-motion/dom";

export default function Home() {
  const [screenWidth, setScreenWidth] = useState();
  const [screenHeight, setScreenHeight] = useState();
  const [button, setButton] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);
  const [iconChunks, setIconChunks] = useState([]);
  const handleClick = (section) => {
    const element = document.getElementById(section);
    element.scrollIntoView({ behavior: "smooth" });
  };
  const typed1Ref = useRef(null);

  const aboutContent = [{ id: "profilePic", src: "/images/Me.png" }];

  const techIcons = [
    {
      id: "HTML",
      src: "/images/Icons/Tech/HTMLIcon.png",
    },
    {
      id: "Javascript",
      src: "/images/Icons/Tech/JavascriptIcon.png",
    },
    {
      id: "CSS",
      src: "/images/Icons/Tech/CSSIcon.png",
    },
    {
      id: "Python",
      src: "/images/Icons/Tech/PythonIcon.png",
    },
    {
      id: "C++",
      src: "/images/Icons/Tech/CIcon.png",
    },
    {
      id: "Tailwind CSS",
      src: "/images/Icons/Tech/TailwindIcon.png",
    },
    {
      id: "React Native",
      src: "/images/Icons/Tech/ReactNativeIcon.png",
    },
    {
      id: "React",
      src: "/images/Icons/Tech/ReactIcon.png",
    },
    {
      id: "Node.js",
      src: "/images/Icons/Tech/NodeIcon.png",
    },
    {
      id: "Next.js",
      src: "/images/Icons/Tech/NextIcon.png",
    },
    {
      id: "React Spring",
      src: "/images/Icons/Tech/ReactSpringIcon.png",
    },
    {
      id: "Framer Motion",
      src: "/images/Icons/Tech/FramerMotionIcon.png",
    },
    {
      id: "Plasmo",
      src: "/images/Icons/Tech/PlasmoIcon.png",
    },
    {
      id: "p5.js",
      src: "/images/Icons/Tech/P5JSIcon.png",
    },
    {
      id: "Three.js",
      src: "/images/Icons/Tech/ThreeIcon.png",
    },
    {
      id: "GLSL",
      src: "/images/Icons/Tech/GLSLIcon.png",
    },
    {
      id: "SQL",
      src: "/images/Icons/Tech/SQLIcon.png",
    },
    {
      id: "postgresSQL",
      src: "/images/Icons/Tech/PostGresSQLIcon.png",
    },
    {
      id: "Supabase",
      src: "/images/Icons/Tech/SupabaseIcon.png",
    },
    {
      id: "Figma",
      src: "/images/Icons/Tech/FigmaIcon.png",
    },
    {
      id: "Photoshop",
      src: "/images/Icons/Tech/PhotoshopIcon.png",
    },
    {
      id: "Illustrator",
      src: "/images/Icons/Tech/IllustratorIcon.png",
    },
    {
      id: "Indesign",
      src: "/images/Icons/Tech/IndesignIcon.png",
    },
    {
      id: "Blender",
      src: "/images/Icons/Tech/BlenderIcon.png",
    },
  ];

  const projectContent = [
    { id: "visualThumb", src: "/images/Thumbs/VisualThumb.png" },
    { id: "PlotTwistThumb", src: "/images/Thumbs/PlotTwistThumb.png" },
    { id: "RCThumb", src: "/images/Thumbs/RCThumb.png" },
  ];

  const noOfContentItems =
    aboutContent.length + techIcons.length + projectContent.length;

  const [loadingProgress, setLoadingProgress] = useState({});
  const handleContentLoad = (imgId) => {
    setLoadingProgress((prevState) => ({
      ...prevState,
      [imgId]: true,
    }));
  };

  const handleResize = useCallback(() => {
    if (window) {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);

      if (window.innerWidth < window.innerHeight) {
        setIconChunks(chunk(techIcons, 4));
      } else setIconChunks(chunk(techIcons, 8));
    }
  }, [setScreenWidth, setScreenHeight]);

  // smooth scrolling
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis();

    // Use requestAnimationFrame to continuously update the scroll
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  useEffect(() => {
    handleResize();

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    // console.log(loadingProgress)
    console.log(Object.keys(loadingProgress).length);
    // checks if all content has loaded and there is the correct amount of props in the loading progress object
    if (
      Object.values(loadingProgress).every((item) => item === true) &&
      Object.keys(loadingProgress).length === noOfContentItems &&
      window !== undefined
    ) {
      setContentLoaded(true);
      console.log("content loaded");
      return;
    }

    setContentLoaded(false);
  }, [loadingProgress]);

  // framer motion variants

  const techIconContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  const techIcon = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  //

  return (
    <main
      className={`min-h-screen w-screen flex-col bg-custom-grey items-center justify-between p-0 overflow-x-hidden`}
    >
      <section
        id="landing"
        className="flex w-screen h-screen top-0 justify-center items-center overflow-hidden"
      >
        <motion.div
          className="flex fixed justify-center items-center w-screen h-screen overflow-hidden"
          initial={{
            opacity: 0,
            filter: "blur(12px)",
          }}
          animate={{
            opacity: 1,
            filter: "blur(0)",
          }}
          transition={{
            duration: 1,
            easings: easeInOut,
          }}
        >
          <div className="w-full h-full flex  left-0">
            <Curves
              screenWidth={screenWidth}
              screenHeight={screenHeight}
              className="z-0"
            />
          </div>

          <div className="absolute w-full h-full flex justify-center items-center p-10">
            <LandingTitle className="max-h-screen max-w-screen text-custom-white-50" />
          </div>
        </motion.div>
      </section>

      <section
        id="content"
        className={`relative top-[0vh] overflow-x-hidden flex-col w-screen min-h-screen items-center justify-center ${
          contentLoaded ? "flex" : "hidden"
        }`}
      >
        <div className=" bg-gradient-to-t from-[#1a1a1a] to-transparent w-screen h-[50vh] "></div>
        <div id="intro" className="content-wrapper bg-custom-grey">
          <div className="content-container">
            <motion.div
              className="w-[284px] h-[284px] md:w-[209px] md:h-[209px] lg:w-[276px] lg:h-[276px] xl:w-[405px] xl:h-[405px] 2xl:w-[488px] 2xl:h-[488px] justify-center items-center flex relative"
              initial={{
                opacity: 0,
                y: 50,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 1, // Animation duration
                },
              }}
              viewport={{
                amount: "some",
                once: true,
              }}
            >
              <img
                src={aboutContent[0].src}
                onLoad={() => handleContentLoad(aboutContent[0].id)}
                className="relative w-[280px] h-[280px] md:w-[205px] md:h-[205px] lg:w-[272px] lg:h-[272px] xl:w-[401px] xl:h-[401px] 2xl:w-[484px] 2xl:h-[484px] z-10 rounded-xl"
              ></img>
              <div className="gradBorderCore blur-[2px]" />
              <div className="gradBorder blur-sm" />
              <div className="gradBorder blur-md" />
            </motion.div>
            <div className="w-[284px] gap-4 md:w-[368px] md:h-[209px] lg:w-[492px] lg:h-[276px] xl:w-[720px] xl:h-[405px] 2xl:w-[866px] 2xl:h-[488px] flex flex-col justify-around">
              <motion.h2
                className="subHeading text-custom-white-50 pt-8 pb-2 md:p-0"
                initial={{
                  opacity: 0,
                  x: 50,
                  filter: "blur(12px)",
                }}
                whileInView={{
                  opacity: 1,
                  x: 0, // Slide in to its original position
                  filter: "blur(0)",
                  transition: {
                    duration: 1, // Animation duration
                  },
                }}
                viewport={{
                  amount: "all",
                  once: true,
                }}
              >
                I’m an industrial designer turned digital designer & developer.
              </motion.h2>
            </div>
          </div>
        </div>
        <div id="tech" className="content-wrapper bg-custom-white-50">
          <div className="content-container flex-col justify-around py-20">
            <div className="tech-icon-container">
              <motion.div className="content-container flex-col justify-around">
                {iconChunks.map((chunk, index) => (
                  <motion.div
                    key={index}
                    className="tech-icon-container"
                    variants={techIconContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{
                      amount: "some",
                      once: true,
                    }}
                  >
                    {chunk.map(({ id, src }, subIndex) => (
                      <motion.div
                        key={subIndex}
                        className="tech-icon group"
                        variants={techIcon}
                      >
                        <h1 className="body flex justify-center items-center text-lg font-light text-center absolute top-0 py-2 w-auto min-w-full -translate-y-[100%] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          {id}
                        </h1>
                        <img
                          src={src}
                          onLoad={() => handleContentLoad(id)}
                          className="w-auto h-full object-contain"
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
        <div id="projects" className="content-wrapper bg-custom-white-50">
          <div className="content-container flex-col">

            <div className="project-card">
              <div className="project-card-img">
                <img
                  src={projectContent[0].src}
                  onLoad={() => {
                    handleContentLoad(projectContent[0].id);
                  }}
                ></img>
              </div>
            </div>

            <div className="project-card">
              <div className="project-card-img">
                <img
                  src={projectContent[1].src}
                  onLoad={() => {
                    handleContentLoad(projectContent[1].id);
                  }}
                ></img>
              </div>
            </div>

            <div className="project-card">
              <div className="project-card-img">
                <img
                  src={projectContent[2].src}
                  onLoad={() => {
                    handleContentLoad(projectContent[2].id);
                  }}
                ></img>
              </div>
            </div>

          </div>
        </div>
        <div id="footer" className="content-container"></div>
      </section>

      <div className="absolute h-screen w-screen bg-red-500 z-50 top-0"></div>
    </main>
  );
}
