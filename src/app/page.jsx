'use client'

import { useRef, useState, useEffect, useCallback } from "react";
import './globals.css';

import Curves from "./Curves"
import LandingTitle from "./components/SVG/LandingTitle"

export default function Home() {

  const [screenWidth, setScreenWidth] = useState();
  const [screenHeight, setScreenHeight] = useState();
  const [button, setButton] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false)
  const ref = useRef(null);
  const handleClick = (section) => {
    const element = document.getElementById(section)
    element.scrollIntoView({ behavior: 'smooth' });
  };

  const content = [
    { id: 'profilePic', src: '/images/Me.png' }
  ]

  const [loadingProgress, setLoadingProgress] = useState({

  })

  const handleResize = useCallback(() => {
    if (window) {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    }
  }, [setScreenWidth, setScreenHeight]);

  const handleContentLoad = (imgId) => {

    setLoadingProgress(prevState => ({
      ...prevState,
      [imgId]: true
    }));
  }

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
    <main className="min-h-screen w-screen flex-col items-center justify-between p-0 overflow-x-hidden">

      <section id="landing" className="flex bg-custom-grey w-screen h-screen top-0 justify-center items-center overflow-hidden">

        {
          contentLoaded ?
            <div className='flex fixed justify-center items-center w-screen h-screen overflow-hidden'>
              <div className="w-full h-full flex  left-0">
                <Curves screenWidth={screenWidth} screenHeight={screenHeight} className='z-0' />
              </div>

              <div className='absolute w-full h-full flex justify-center items-center p-10'>
                <LandingTitle className="max-h-screen max-w-screen text-custom-white-50" />
              </div>
            </div>

            :
            <div>
              <h1 className=' font-JosefinSans text-custom-white-50 text-4xl'>Loading</h1>
            </div>
        }

      </section>

      <section id="about" className='relative overflow-x-hidden flex flex-col w-screen min-h-screen items-center justify-center'>
        <div className=' bg-gradient-to-t from-[#1a1a1a] to-transparent w-screen h-[50vh] '>
        </div>
        
        
        <div id='intro' className='content-container bg-custom-grey'>
          <div className='w-[1080px] m-20 flex justify-between'>
            <div className='w-[352px] h-[352px] justify-center items-center flex'>
              
              <img src={content[0].src} onLoad={() => handleContentLoad(content[0].id)} className='relative w-[342px] h-[342px] z-10 rounded-[10px]'></img>
              <div className='gradBorder absolute w-[352px] h-[352px] rounded-[15px]'></div>
            
            </div>
            <div className='w-[625px] h-[352px] bg-green-500'></div>
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

