"use client";

// Libraries
import {
  motion,
  useInView,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Lenis from "lenis";
import { chunk } from "lodash"; // Make sure to import the chunk utility
import { useCallback, useEffect, useRef, useState } from "react";
import "./globals.css";

// components
import FlowField from "./components/FlowField";
import PreLoader from "./components/PreLoader";

// SVG's
import GithubIcon from "./components/SVG/GithubIcon";
import InternetIcon from "./components/SVG/InternetIcon";
import CVIcon from "./components/SVG/CV";
import LinkedIn from "./components/SVG/LinkedIn";
import LandingTitle from "./components/SVG/LandingTitle";
import Cross from "./components/SVG/Cross";

// assets
import visualL from "../../public/videos/VisualLandscape.mp4";
import visualP from "../../public/videos/VisualPortrait.mp4";

export default function Home() {
  // states

  const [screenWidth, setScreenWidth] = useState();
  const [screenHeight, setScreenHeight] = useState();
  const [landing, setLanding] = useState(true);
  const [seed, setSeed] = useState(5);
  const [debugFF, setDebugFF] = useState(false);
  // const [contentLoaded, setContentLoaded] = useState(true);
  const [contentLoaded, setContentLoaded] = useState(false);
  const [iconChunks, setIconChunks] = useState([]);
  const [visualContentOpen, setVisualContentOpen] = useState(false);
  const [plotTwistContentOpen, setPlotTwistContentOpen] = useState(false);
  const [reineContentOpen, setReineContentOpen] = useState(false);
  const [vCloseButton, setVCloseButton] = useState(false);
  const [pTCloseButton, setPTCloseButton] = useState(false);
  const [rCCloseButton, setRCCloseButton] = useState(false);
  const [visualVidSrc, setVisualVidSrc] = useState("");
  const [loadingProgress, setLoadingProgress] = useState({});
  const [loadingPercent, setLoadingPercent] = useState(0.0);

  const { scrollY } = useScroll();

  // refs

  const visualContentRef = useRef(null);
  const visualContentInView = useInView(visualContentRef, { amount: "some" });
  const pTContentRef = useRef(null);
  const pTContentInView = useInView(pTContentRef, { amount: "some" });
  const rCContentRef = useRef(null);
  const rCContentInView = useInView(rCContentRef, { amount: "some" });

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
  const visIcons = [
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
  const reineIcons = [
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
      id: "Email JS",
      src: "/images/Icons/Tech/EmailJS.png",
    },
    {
      id: "Vimeo",
      src: "/images/Icons/Tech/Vimeo.png",
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
      id: "Google Books API",
      src: "/images/Icons/Tech/GoogleBooksIcon.png",
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
    { id: "RC_TitleStrip", src: "/images/RCTitleStrip.png" },
    { id: "RWF_1", src: "/images/Wireframes/RWF_1.jpg" },
  ];
  const noOfContentItems =
    aboutContent.length + techIcons.length + projectContent.length + 4;

  // functions

  const scrollTo = (section, timing = 400) => {
    const element = document.getElementById(section);
    if (section) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth" });
      }, timing);
    } else {
      console.error(`${section} not found`);
    }
  };

  const handleResize = useCallback(() => {
    let visualSrc = "";
    if (typeof window !== "undefined") {
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

  const closeProject = (cardID, setState) => {
    scrollTo(cardID);
    setTimeout(() => {
      setState(false);
    }, 600);
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
    setLoadingPercent(
      Math.ceil(
        (Object.keys(loadingProgress).length.toFixed(1) /
          noOfContentItems.toFixed(1)) *
          100
      )
    );

    if (
      Object.values(loadingProgress).every((item) => item === true) &&
      Object.keys(loadingProgress).length === noOfContentItems
    ) {
      setTimeout(() => {
        setContentLoaded(true);
      }, 2000);

      return;
    }
    // setContentLoaded(false);
  }, [noOfContentItems, loadingProgress, loadingPercent]);

  useEffect(() => {
    if (visualContentOpen && visualContentInView) {
      setTimeout(() => {
        setVCloseButton(true);
      }, 400);
      return;
    }
    setVCloseButton(false);
  }, [visualContentInView, visualContentOpen, setVCloseButton]);

  useEffect(() => {
    if (plotTwistContentOpen && pTContentInView) {
      setTimeout(() => {
        setPTCloseButton(true);
      }, 400);
      return;
    }
    setPTCloseButton(false);
  }, [pTContentInView, plotTwistContentOpen, setPTCloseButton]);

  useEffect(() => {
    if (reineContentOpen && rCContentInView) {
      setTimeout(() => {
        setRCCloseButton(true);
      }, 400);
      return;
    }
    setRCCloseButton(false);
  }, [rCContentInView, reineContentOpen, setRCCloseButton]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest >= 2 * screenHeight) {
      console.log("Page scroll: ", latest);
      setLanding(false);
    } else {
      setLanding(true);
    }
  });

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
      <PreLoader
        contentLoaded={contentLoaded}
        loadingPercent={loadingPercent}
      />

      <section
        id="landing"
        className="flex w-full h-screen top-0 justify-center items-center overflow-hidden"
      >
        <div className="flex fixed justify-center items-center w-screen h-screen overflow-hidden">
          <div className="w-full h-full flex  left-0">
            {contentLoaded && (
              <FlowField
                screenWidth={screenWidth}
                screenHeight={screenHeight}
                seed={seed}
                className="z-0"
              />
            )}
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
              {landing ? (
                <>
                  <LandingTitle className="max-h-screen max-w-screen text-custom-white-50" />
                  {debugFF && (
                    <div className="absolute m-6 top-0 right-0 w-auto flex items-center gap-2">
                      <button
                        className="bg-white w-8 rounded-full"
                        onClick={() => {
                          setSeed(seed + 1);
                        }}
                      >
                        +
                      </button>
                      <p className="text-custom-white-50">{seed}</p>
                      <button
                        className="bg-white w-8 rounded-full"
                        onClick={() => {
                          setSeed(seed - 1);
                        }}
                      >
                        -
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <></>
              )}
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
        <div className=" bg-gradient-to-t from-[#1a1a1a] to-transparent w-full h-[50vh] "></div>
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
                I’m a digital designer & developer with a background in product
                design.
              </motion.h2>
            </div>
          </div>
        </div>
        <div id="tech" className="content-wrapper bg-custom-white-50">
          <div className="content-container flex-col justify-around">
            <motion.div className="w-full flex flex-col gap-6 sm:gap-12 justify-around">
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
                      <div className="flex justify-center items-center">
                        <h1 className="tech-icon-label group-hover:tech-icon-label-h">
                          {id}
                        </h1>
                      </div>
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

          <div id="visualCard" className="project-card">
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
            <button
              className={`project-close-button ${
                vCloseButton ? "translate-x-0" : "translate-x-[200%]"
              }`}
              onClick={() => {
                closeProject("visualCard", setVisualContentOpen);
              }}
            >
              <Cross className="text-custom-grey p-2" />
            </button>

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
              ref={visualContentRef}
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
              <div className="pcc-section">
                <h1 className="project-subHeading">Technologies</h1>
                <div className="project-icon-container">
                  {visIcons.map(({ id, src }, index) => (
                    <div key={index} className="tech-icon group">
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
              <div className="pcc-section">
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

          <div id="pTCard" className="project-card">
            <div className="project-card-info">
              <h1 className="project-card-title">PlotTwist</h1>
              <p className="project-card-desc">
                A MVP mobile app for swapping books
              </p>
              <div className="h-auto w-full flex flex-row gap-8">
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
                <div className="h-12 w-auto flex items-center">
                  <button className="project-card-icon">
                    <GithubIcon />
                  </button>
                </div>
              </div>
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
            <button
              className={`project-close-button ${
                pTCloseButton ? "translate-x-0" : "translate-x-[200%]"
              }`}
              onClick={() => {
                closeProject("pTCard", setPlotTwistContentOpen);
              }}
            >
              <Cross className="text-custom-grey p-2" />
            </button>

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
              ref={pTContentRef}
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

              <div className="pcc-section">
                <h1 className="project-subHeading">Technologies</h1>
                <div className="project-icon-container">
                  {plotTwistIcons.map(({ id, src }, index) => (
                    <div
                      key={index}
                      className={`tech-icon group ${
                        id === "Google Books API"
                          ? "w-1/2 md:w-1/4 lg:w-1/6"
                          : ""
                      }`}
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
              <div className="pcc-section justify-center items-center gap-24">
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

              <div className="pcc-section">
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

          <div id="rCCard" className="project-card">
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
              <h1 className="project-card-title">Reine Creative</h1>
              <p className="project-card-desc">
                A website for a film production company
              </p>
              <div className="h-auto w-full flex flex-row gap-8">
                <motion.button
                  className="project-button"
                  whileHover={caseStudyButton.hover}
                  whileTap={caseStudyButton.tap}
                  onClick={(event) => {
                    if (reineContentOpen === true) {
                      setReineContentOpen(false);
                      event.preventDefault();
                    } else {
                      setReineContentOpen(true);
                      event.preventDefault();
                      scrollTo("reineContent");
                    }
                  }}
                >
                  Case Study
                </motion.button>
                <div className="h-12 w-auto flex items-center">
                  <button className="project-card-icon">
                    <InternetIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            id="reineContent"
            className={`project-content-parent ${
              reineContentOpen ? "max-h-[700vh]" : "max-h-0"
            }`}
          >
            <div className="w-full">
              <img
                src={projectContent[13].src}
                onLoad={() => handleContentLoad(projectContent[13].id)}
                className={`object-cover w-screen transition-[max-height] duration-1000 ease-in-out ${
                  reineContentOpen ? "max-h-screen" : "max-h-0"
                }`}
              />
            </div>
            <button
              className={`project-close-button ${
                rCCloseButton ? "translate-x-0" : "translate-x-[200%]"
              }`}
              onClick={() => {
                closeProject("rCCard", setReineContentOpen);
              }}
            >
              <Cross className="text-custom-grey p-2" />
            </button>
            <div className="w-full"></div>
            <motion.div
              ref={rCContentRef}
              className={`project-collapsible-content ${
                reineContentOpen ? "pcc-open" : "pcc-closed"
              }`}
              initial={{ opacity: 0 }}
              animate={reineContentOpen ? { opacity: 1 } : { opacity: 0 }}
              transition={{
                duration: reineContentOpen ? 1 : 0,
                delay: reineContentOpen ? 1 : 0,
              }}
            >
              <div className="pcc-section">
                <h1 className="project-subHeading">Context</h1>
                <p className="body">
                  Designed and built a website for a freelance film-maker who
                  trades under the name Reine Creative. In addition to
                  <span className=" italic font-light">
                    Web Design & Development
                  </span>
                  , I also worked on{" "}
                  <span className=" italic font-light">
                    Service Design, Identity Design
                  </span>{" "}
                  and <span className=" italic font-light">Graphic Design</span>
                  .
                </p>
              </div>
              <div className="pcc-section">
                <h1 className="project-subHeading">Technologies</h1>
                <div className="project-icon-container">
                  {reineIcons.map(({ id, src }, index) => (
                    <div key={index} className="tech-icon group">
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
              <div className="pcc-section">
                <h1 className="project-subHeading">Process</h1>
                <img
                  src={projectContent[14].src}
                  onLoad={() => handleContentLoad(projectContent[14].id)}
                  className="w-full h-auto shadow-xl"
                />
              </div>
            </motion.div>
          </div>
        </div>

        <div
          id="links"
          className="bg-custom-grey h-[50vh] w-full flex justify-center items-center"
        >
          <div className="content-container h-1/2">
            <div className="h-full flex-[2_2_0%] ">
              <h1 className="body text-custom-white-50 font-normal">
                Designed with:
              </h1>
              <h1 className="body text-custom-white-50">
                Figma, Adobe Illustrator
              </h1>
              <br></br>
              <h1 className="body text-custom-white-50 font-normal">
                Developed with:
              </h1>
              <h1 className="body text-custom-white-50">
                HTML, Javascript, CSS, React, Next.js,<br></br> Framer Motion,
                Tailwind, P5.js
              </h1>
            </div>
            <div className="h-full flex-[1_1_0%] flex gap-[3vw] items-center">
              <a
                className="flex-[1_1_0%]"
                target="_blank"
                href="https://www.github.com/NaveedGujral"
              >
                <GithubIcon className="footer-icon" />
              </a>
              <a
                className="flex-[1_1_0%]"
                target="_blank"
                href="https://www.linkedin.com/in/naveed-gujral"
              >
                <LinkedIn className="footer-icon" />
              </a>
              <a className="flex-[1_1_0%]" target="_blank" href="/CV.pdf">
                <CVIcon className="footer-icon" />
              </a>
            </div>
          </div>
        </div>
        <div className=" bg-gradient-to-b from-[#1a1a1a] to-transparent w-full h-[50vh] "></div>
      </section>
    </main>
  );
}
