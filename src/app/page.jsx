"use client";

// Libraries
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  Fragment,
} from "react";
import Video from "next-video";
import "./globals.css";
import dynamic from "next/dynamic";
import { chunk } from "lodash"; // Make sure to import the chunk utility
import Lenis from "lenis";
import { motion } from "framer-motion";
import { easeInOut } from "framer-motion/dom";

// components
import Curves from "./Curves";
import LandingTitle from "./components/SVG/LandingTitle";
import InternetIcon from "./components/SVG/InternetIcon";
import GithubIcon from "./components/SVG/GithubIcon";
import CaseStudyButton from "./components/CaseStudyButton";
import PreLoader from "./components/PreLoader";

// assets
import visualL from "../../public/videos/VisualLandscape.mp4";
import visualP from "../../public/videos/VisualPortrait.mp4";

export default function Home() {
  // states

  const [screenWidth, setScreenWidth] = useState();
  const [screenHeight, setScreenHeight] = useState();
  const [button, setButton] = useState(false);
  // const [contentLoaded, setContentLoaded] = useState(true);
  const [contentLoaded, setContentLoaded] = useState(false);
  const [iconChunks, setIconChunks] = useState([]);
  const [visualContentOpen, setVisualContentOpen] = useState(false);
  const [plotTwistContentOpen, setPlotTwistContentOpen] = useState(false);
  const [reineContentOpen, setReineContentOpen] = useState(false);
  const [visualVidSrc, setVisualVidSrc] = useState("");
  const [loadingProgress, setLoadingProgress] = useState({});

  // refs

  const visualVidRef = useRef(null);

  // content to be loaded

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
      id: "Tailwind",
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
  const visTechIcons = [
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
      id: "Tailwind",
      src: "/images/Icons/Tech/TailwindIcon.png",
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
      id: "Plasmo",
      src: "/images/Icons/Tech/PlasmoIcon.png",
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
      id: "Illustrator",
      src: "/images/Icons/Tech/IllustratorIcon.png",
    },
  ];
  const plotTwistIcons = [
    {
      id: "React Native",
      src: "/images/Icons/Tech/ReactNativeIcon.png",
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
      id: "Node.js",
      src: "/images/Icons/Tech/NodeIcon.png",
    },
    {
      id: "SQL",
      src: "/images/Icons/Tech/SQLIcon.png",
    },
    {
      id: "Supabase",
      src: "/images/Icons/Tech/SupabaseIcon.png",
    },
  ];
  const projectContent = [
    { id: "visualThumb", src: "/images/Thumbs/VisualThumb.png" },
    { id: "PlotTwistThumb", src: "/images/Thumbs/PlotTwistThumb.png" },
    { id: "RCThumb", src: "/images/Thumbs/RCThumb.png" },
    { id: "ChromeWebstore", src: "/images/Icons/Webstore.png" },
    { id: "visWF1", src: "/images/Wireframes/visWF1.jpg" },
    { id: "PTLanding", src: "/images/TitleStripPT.png" },
    { id: "PT_Listbook", src: "/images/PT_Listbook.png" },
    { id: "PT_ReqSwap", src: "/images/PT_ReqSwap.png" },
    { id: "PT_Chat", src: "/images/PT_Chat.png" },
    { id: "PT_Offer", src: "/images/PT_Offer.png" },
    { id: "PTWF_1", src: "/images/Wireframes/PTWF_1.jpg" },
    { id: "PTWF_2", src: "/images/Wireframes/PTWF_2.jpg" },
    { id: "PTWF_3", src: "/images/Wireframes/PTWF_3.jpg" },
  ];
  const noOfContentItems =
    aboutContent.length + techIcons.length + projectContent.length + 1;

  // functions

  // if (targetElement) {
  //   event.preventDefault();
  //   setOpenMenu(false);
  //   targetElement.scrollIntoView({ behavior: "smooth" });
  // } else {
  //   console.error(`Target element with ID "${targetId}" not found.`);
  // }

  const scrollTo = (section) => {
    const element = document.getElementById(section);
    if (section) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth" });
      }, 250);
    }
    else {
      console.error(`${section} not found`)
    }
  };

  const handleResize = useCallback(() => {
    let visualSrc = "";
    if (window) {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);

      if (window.innerWidth < window.innerHeight) {
        setIconChunks(chunk(techIcons, 4));
        if (visualVidSrc !== visualP) {
          visualSrc = visualP;
        }
      } else {
        setIconChunks(chunk(techIcons, 8));
        if (visualVidSrc !== visualL) {
          visualSrc = visualL;
        }
      }
    }
    setVisualVidSrc(visualSrc);
  }, [setScreenWidth, setScreenHeight, setVisualVidSrc]);

  const handleContentLoad = (imgId, bool = true) => {
    setLoadingProgress((prevState) => ({
      ...prevState,
      [imgId]: bool,
    }));
  };

  // use effects

  useEffect(() => {
    // smooth scrolling
    const lenis = new Lenis();
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
    // checks if all content has loaded and there is the correct amount of props in the loading progress object
    if (
      Object.values(loadingProgress).every((item) => item === true) &&
      Object.keys(loadingProgress).length === noOfContentItems &&
      window !== undefined
    ) {
      setTimeout(() => {
        setContentLoaded(true);
      }, 1000);

      return;
    }
    setContentLoaded(false);
  }, [loadingProgress]);

  // framer motion

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

  const caseStudyButton = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const pccSection = {
    transition: {
      duration: 1,
    },
  };

  return (
    <main
      className={`min-h-screen w-full flex flex-col bg-custom-grey items-center justify-between p-0 overflow-hidden`}
    >
      {/* <PreLoader contentLoaded={contentLoaded} /> */}

      <section
        id="landing"
        className="flex w-full h-screen top-0 justify-center items-center overflow-hidden"
      >
        <div className="flex fixed justify-center items-center w-screen h-screen overflow-hidden">
          <div className="w-full h-full flex  left-0">
            <Curves
              screenWidth={screenWidth}
              screenHeight={screenHeight}
              className="z-0"
            />
          </div>
          {contentLoaded && (
            <motion.div
              className="absolute w-full h-full flex justify-center items-center p-10"
              initial={{
                opacity: 0,
                filter: "blur(12px)",
              }}
              whileInView={{
                opacity: 1,
                filter: "blur(0)",
                transition: {
                  duration: 1, // Animation duration
                  delay: 1,
                },
              }}
            >
              <LandingTitle className="max-h-screen max-w-screen text-custom-white-50" />
            </motion.div>
          )}
        </div>
      </section>

      <section
        id="content"
        className={`relative top-[0vh] overflow-x-hidden flex-col gap-0 w-full min-h-screen items-center justify-center ${
          contentLoaded ? "flex" : "hidden"
        }`}
      >
        <div className=" bg-gradient-to-t from-[#1a1a1a] to-transparent w-screen h-[50vh] "></div>
        <div id="intro" className="content-wrapper bg-custom-grey">
          <div className="content-container flex flex-col md:flex-row md:justify-between">
            <motion.div
              className="flex-[4_4_0%] w-[80%] md:w-full justify-center items-center flex relative"
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
                className="relative w-full h-full z-10 rounded-[14px] scale-[0.99]"
              ></img>
              <div className="gradBorderCore blur-[2px]" />
              <div className="gradBorder blur-sm" />
              <div className="gradBorder blur-md" />
            </motion.div>
            <div className=" flex-[1_1_0%]"></div>
            <div className=" w-[80%] md:flex-[7_7_0%]">
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
                  amount: "some",
                  once: true,
                }}
              >
                I’m an industrial designer turned digital designer & developer.
              </motion.h2>
            </div>
          </div>
        </div>
        <div id="tech" className="content-wrapper bg-custom-white-50">
          <div className="content-container flex-col justify-around">
            <motion.div className="w-full flex-col justify-around">
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
                      <h1 className="tech-icon-label group-hover:tech-icon-label-h">
                        {id}
                      </h1>
                      <img
                        src={src}
                        onLoad={() => handleContentLoad(id)}
                        className="tech-icon-img"
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        <div
          id="projects"
          className="content-wrapper bg-custom-white-50 flex-col gap-24 "
        >
          {/* Visual card & content */}

          <div className="project-card">
            <div className="project-thumb ">
              <img
                src={projectContent[0].src}
                onLoad={() => {
                  handleContentLoad(projectContent[0].id);
                }}
                className="project-card-img"
              ></img>
            </div>
            <div className="project-flex-spacer" />
            <div className="project-card-info">
              <h1 className="project-card-title">Visual</h1>

              <p className="project-card-desc">
                A chrome extension for visualising music
              </p>
              <div className="h-auto w-full flex flex-row gap-8">
                <motion.button
                  className="project-button"
                  whileHover={caseStudyButton.hover}
                  whileTap={caseStudyButton.tap}
                  onClick={(event) => {
                    if (visualContentOpen === true) {
                      event.preventDefault();
                      setVisualContentOpen(false);
                      document.getElementById("visualVideo").pause();
                    } else {
                      event.preventDefault();
                      setVisualContentOpen(true);
                      document.getElementById("visualVideo").currentTime = 0;
                      document.getElementById("visualVideo").play();
                        scrollTo("visualContent");
                    }
                  }}
                >
                  Case Study
                </motion.button>
                <div className="h-12 w-auto">
                  <img
                    className="object-contain h-full"
                    src={projectContent[3].src}
                    onLoad={() => {
                      handleContentLoad(projectContent[3].id);
                    }}
                  ></img>
                </div>
              </div>
            </div>
          </div>

          <div
            id="visualContent"
            className={`project-content-parent ${
              visualContentOpen ? "max-h-[700vh]" : "max-h-0"
            }`}
          >
            <div className="w-full">
              <video
                id="visualVideo"
                src={visualVidSrc}
                onLoadStart={() => {
                  handleContentLoad("visualVid", false);
                }}
                onLoadedData={() => {
                  handleContentLoad("visualVid");
                }}
                loop
                muted
                className={`object-cover w-screen transition-[height] duration-1000 ease-in-out ${
                  visualContentOpen ? "h-screen" : "h-0"
                }`}
              />
            </div>
            <motion.div
              className={`project-collapsible-content ${
                visualContentOpen ? "pcc-open" : "pcc-closed"
              }`}
              initial={{ opacity: 0 }}
              animate={visualContentOpen ? { opacity: 1 } : { opacity: 0 }}
              transition={{
                duration: visualContentOpen ? 1 : 0,
                delay: visualContentOpen ? 1 : 0,
              }}
            >
              <div className="pcc-section">
                <h1 className="project-subHeading">Context</h1>
                <p className="body">
                  Visual is a chrome extension that can visualise audio from any
                  tab. The visualiser is created in a stand-alone tab which can
                  then be put onto a project or second monitor for the user to
                  enjoy. My role during the project focused on{" "}
                  <span className=" italic font-light">
                    UI/UX Design, Identity Design, Front-end development
                  </span>{" "}
                  & <span className=" italic font-light">3D Graphics</span>. The
                  project is currently in beta and we are conducting user
                  research which will inform the next round of development.
                </p>
              </div>
              <div
                className="pcc-section"
                initial={pccSection.initial}
                whileInView={pccSection.whileInView}
                viewport={pccSection.viewport}
              >
                <h1 className="project-subHeading">Technologies</h1>
                <div
                  className="project-icon-container"
                  variants={techIconContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{
                    amount: "some",
                    once: true,
                  }}
                >
                  {visTechIcons.map(({ id, src }, index) => (
                    <div
                      key={index}
                      className="tech-icon group"
                      variants={techIcon}
                    >
                      <h1 className="tech-icon-label group-hover:tech-icon-label-h">
                        {id}
                      </h1>
                      <img
                        src={src}
                        onLoad={() => handleContentLoad(id)}
                        className="tech-icon-img"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="pcc-section"
                initial={pccSection.initial}
                whileInView={pccSection.whileInView}
                viewport={pccSection.viewport}
              >
                <h1 className="project-subHeading">Process</h1>
                <img
                  src={projectContent[4].src}
                  onLoad={() => handleContentLoad(projectContent[4].id)}
                  className="w-full h-auto shadow-xl"
                />
              </div>
            </motion.div>
          </div>

          {/* PlotTwist card & content */}

          <div className="project-card">
            <div className="project-card-info">
              <div className="project-card-title-row">
                <h1 className="project-card-title">PlotTwist</h1>
                <button className="project-card-icon">
                  <GithubIcon />
                </button>
              </div>

              <p className="project-card-desc">
                A MVP mobile app for swapping books
              </p>

              <motion.button
                className="project-button"
                whileHover={caseStudyButton.hover}
                whileTap={caseStudyButton.tap}
                onClick={(event) => {
                  if (plotTwistContentOpen === true) {
                    setPlotTwistContentOpen(false);
                    event.preventDefault();
                  } else {
                    setPlotTwistContentOpen(true);
                    event.preventDefault();
                    scrollTo("PTContent");
                  }
                }}
              >
                Case Study
              </motion.button>
            </div>
            <div className="project-flex-spacer" />
            <div className="project-thumb order-first sm:order-2">
              <img
                src={projectContent[1].src}
                onLoad={() => {
                  handleContentLoad(projectContent[1].id);
                }}
                className="project-card-img"
              />
            </div>
          </div>

          <div
            id="PTContent"
            className={`project-content-parent ${
              plotTwistContentOpen ? "max-h-[4000vh]" : "max-h-0"
            }`}
          >
            <div className="w-full">
              <img
                src={projectContent[5].src}
                onLoad={() => {
                  handleContentLoad(projectContent[5].id);
                }}
                className={`object-cover w-screen transition-[max-height] duration-1000 ease-in-out ${
                  plotTwistContentOpen ? "max-h-screen" : "max-h-0"
                }`}
              />
            </div>
            <motion.div
              className={`project-collapsible-content ${
                plotTwistContentOpen ? "pcc-open" : "pcc-closed"
              }`}
              initial={{ opacity: 0 }}
              animate={plotTwistContentOpen ? { opacity: 1 } : { opacity: 0 }}
              transition={{
                duration: plotTwistContentOpen ? 1 : 0,
                delay: plotTwistContentOpen ? 1 : 0,
              }}
            >
              <div className="pcc-section">
                <h1 className="project-subHeading">Context</h1>
                <p className="body">
                  PlotTwist is a mobile app that allows users to swap books with
                  each other. This project was taken up to a proof of concept
                  stage and was developed during my time at a coding bootcamp. I
                  was part of a team of six and my role was to work on{" "}
                  <span className=" italic font-light">
                    UI/UX Design, Identity Design, Front-end Development
                  </span>{" "}
                  and occasionally{" "}
                  <span className=" italic font-light">
                    Back-end Development
                  </span>
                  .
                </p>
              </div>

              <div
                className="pcc-section"
                initial={pccSection.initial}
                whileInView={pccSection.whileInView}
                viewport={pccSection.viewport}
              >
                <h1 className="project-subHeading">Technologies</h1>
                <div
                  className="project-icon-container"
                  variants={techIconContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{
                    amount: "some",
                    once: true,
                  }}
                >
                  {plotTwistIcons.map(({ id, src }, index) => (
                    <div
                      key={index}
                      className="tech-icon group"
                      variants={techIcon}
                    >
                      <h1 className="tech-icon-label group-hover:tech-icon-label-h">
                        {id}
                      </h1>
                      <img
                        src={src}
                        onLoad={() => handleContentLoad(id)}
                        className="tech-icon-img"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <h1 className="project-subHeading">Features</h1>
              <div
                className="pcc-section justify-center items-center gap-24"
                initial={pccSection.initial}
                whileInView={pccSection.whileInView}
                viewport={pccSection.viewport}
              >
                <div className="features-section">
                  <p className="features-copy pr-8 text-right">
                    List your unused books easily with Google Books API
                  </p>
                  <div className="features-img-parent">
                    <img
                      src={projectContent[6].src}
                      onLoad={() => {
                        handleContentLoad(projectContent[6].id);
                      }}
                      className="features-img"
                    />
                  </div>
                </div>
                <div className="features-section">
                  <div className="features-img-parent">
                    <img
                      src={projectContent[7].src}
                      onLoad={() => {
                        handleContentLoad(projectContent[7].id);
                      }}
                      className="features-img"
                    />
                  </div>
                  <p className="features-copy pl-8">
                    Find people with the books you want
                  </p>
                </div>
                <div className="features-section">
                  <p className="features-copy text-right pr-8">
                    Arrange swaps with our integrated chat
                  </p>
                  <div className="features-img-parent">
                    <img
                      src={projectContent[8].src}
                      onLoad={() => {
                        handleContentLoad(projectContent[8].id);
                      }}
                      className="features-img"
                    />
                  </div>
                </div>
                <div className="features-section flex-col">
                  <div className="features-img-parent w-full">
                    <img
                      src={projectContent[9].src}
                      onLoad={() => {
                        handleContentLoad(projectContent[9].id);
                      }}
                      className="features-img"
                    />
                  </div>
                  <p className="features-copy w-full text-center py-2 sm:py-12">
                    Finalise your offer
                  </p>
                </div>
              </div>

              <div
                className="pcc-section"
                initial={pccSection.initial}
                whileInView={pccSection.whileInView}
                viewport={pccSection.viewport}
              >
                <h1 className="project-subHeading">Process</h1>
                <div className="w-full h-auto shadow-xl">
                  <img
                    src={projectContent[10].src}
                    onLoad={() => {
                      handleContentLoad(projectContent[10].id);
                    }}
                    className="w-full h-auto"
                  />
                  <img
                    src={projectContent[11].src}
                    onLoad={() => {
                      handleContentLoad(projectContent[11].id);
                    }}
                    className="w-full h-auto"
                  />
                  <img
                    src={projectContent[12].src}
                    onLoad={() => {
                      handleContentLoad(projectContent[12].id);
                    }}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Reine Creative card & content */}

          <div className="project-card">
            <div className="project-thumb ">
              <img
                src={projectContent[2].src}
                onLoad={() => {
                  handleContentLoad(projectContent[2].id);
                }}
                className="project-card-img"
              ></img>
            </div>
            <div className="project-flex-spacer" />
            <div className="project-card-info">
              <div className="project-card-title-row">
                <h1 className="project-card-title">Reine Creative</h1>
                <button className="project-card-icon">
                  <InternetIcon />
                </button>
              </div>

              <p className="project-card-desc">
                A website for a film production company
              </p>

              <CaseStudyButton />
            </div>
          </div>
        </div>

        <div id="footer" className="content-container h-screen"></div>
      </section>
    </main>
  );
}
