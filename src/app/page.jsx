'use client'

import { useCallback, useEffect, useRef, useState } from "react";
import './globals.css';

// components
import Curves from "./Curves";
import LandingTitle from "./components/SVG/LandingTitle";
import TypedComp from "./components/TypedComp";
import Lenis from 'lenis'
import { motion } from "framer-motion";
import { easeInOut } from "framer-motion/dom";

export default function Home() {

  const [screenWidth, setScreenWidth] = useState();
  const [screenHeight, setScreenHeight] = useState();
  const [button, setButton] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false)
  const handleClick = (section) => {
    const element = document.getElementById(section)
    element.scrollIntoView({ behavior: 'smooth' });
  };
  const typed1Ref = useRef(null);

  const content = [
    { id: 'profilePic', src: '/images/Me.png' }
  ]
  const [loadingProgress, setLoadingProgress] = useState({

  })
  const handleContentLoad = (imgId) => {

    setLoadingProgress(prevState => ({
      ...prevState,
      [imgId]: true
    }));
  }

  const handleResize = useCallback(() => {
    if (window) {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    }
  }, [setScreenWidth, setScreenHeight]);

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

    if (window) {
      window.addEventListener('resize', handleResize);
    }

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  useEffect(() => {

    // checks if all content has loaded and there is the correct amount of props in the loading progress object
    if (Object.values(loadingProgress).every(item => item === true) && Object.keys(loadingProgress).length === content.length) {
      setContentLoaded(true)
      return
    }

    setContentLoaded(false)

  }, [loadingProgress]);

  return (
    <main className="min-h-screen w-screen flex-col bg-custom-grey items-center justify-between p-0 overflow-x-hidden">

      <section id="landing" className="flex w-screen h-screen top-0 justify-center items-center overflow-hidden">
        <motion.div className='flex fixed justify-center items-center w-screen h-screen overflow-hidden'
          initial={{
            opacity: 0,
            filter: 'blur(12px)'
          }}
          animate={{
            opacity: 1,
            filter: 'blur(0)'
          }}
          transition={{
            duration: 1,
            easings: easeInOut
          }}
        >
          <div className="w-full h-full flex  left-0">
            <Curves screenWidth={screenWidth} screenHeight={screenHeight} className='z-0' />
          </div>

          <div className='absolute w-full h-full flex justify-center items-center p-10'>
            <LandingTitle className="max-h-screen max-w-screen text-custom-white-50" />
          </div>
        </motion.div>
      </section>

      <section id="about" className='relative top-[0vh] overflow-x-hidden flex flex-col w-screen min-h-screen items-center justify-center'>
        <div className=' bg-gradient-to-t from-[#1a1a1a] to-transparent w-screen h-[50vh] '>
        </div>
        <div id='intro' className='content-wrapper bg-custom-grey'>
          <div className='content-container'>
            <motion.div
              className=' w-[284px] h-[284px] md:w-[209px] md:h-[209px] lg:w-[276px] lg:h-[276px] xl:w-[405px] xl:h-[405px] 2xl:w-[488px] 2xl:h-[488px] justify-center items-center flex relative'
              initial={{
                opacity: 0,
                x: -50,
                filter: 'blur(12px)'
              }}
              whileInView={{
                opacity: 1,
                x: 0, // Slide in to its original position
                filter: 'blur(0)',
                transition: {
                  duration: 1 // Animation duration
                }
              }}
              viewport={{
                amount: "all", 
                once: true
               }}
            >
              <img src={content[0].src} onLoad={() => handleContentLoad(content[0].id)} className='relative w-[280px] h-[280px] md:w-[205px] md:h-[205px] lg:w-[272px] lg:h-[272px] xl:w-[401px] xl:h-[401px] 2xl:w-[484px] 2xl:h-[484px] z-10 rounded-xl'></img>
              <div className='gradBorderCore blur-[2px]' />
              <div className='gradBorder blur-sm' />
              <div className='gradBorder blur-md' />
            </motion.div>
            <div className='w-[284px] gap-4 md:w-[368px] md:h-[209px] lg:w-[492px] lg:h-[276px] xl:w-[720px] xl:h-[405px] 2xl:w-[866px] 2xl:h-[488px] flex flex-col justify-around'>
              <motion.h2 
              className="subHeading text-custom-white-50"
              initial={{
                opacity: 0,
                x: 50,
                filter: 'blur(12px)'
              }}
              whileInView={{
                opacity: 1,
                x: 0, // Slide in to its original position
                filter: 'blur(0)',
                transition: {
                  delay: 1,
                  duration: 0.5 // Animation duration
                }
              }}
              viewport={{
                amount: "all", 
                once: true
               }}
              >
                I’m an industrial designer turned digital designer & developer.
              </motion.h2>
              <motion.p 
              className="body text-custom-white-50"
              initial={{
                opacity: 0,
                x: 50,
                filter: 'blur(12px)'
              }}
              whileInView={{
                opacity: 1,
                x: 0, // Slide in to its original position
                filter: 'blur(0)',
                transition: {
                  delay: 1,
                  duration: 0.5 // Animation duration
                }
              }}
              viewport={{
                amount: "all", 
                once: true
               }}
              >
                My training, experience and skillset as an industrial designer significantly overlaps with digital design and development.
                I love to work on projects that intersect creativity and technology.
              </motion.p>
            </div>
          </div>
        </div>


        <div id='tech' className='content-container bg-blue-500'>
        </div>
        <div id='projects' className='content-container bg-green-500'>
        </div>
        <div id='footer' className='content-container'>
        </div>
      </section>
    </main >
  );
}

