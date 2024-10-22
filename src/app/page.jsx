'use client'

import { useRef, useState, useEffect, useCallback } from "react";
import './globals.css';

import Curves from "./Curves"
import LandingTitle from "./components/SVG/LandingTitle"

export default function Home() {

  const [screenWidth, setScreenWidth] = useState();
  const [screenHeight, setScreenHeight] = useState();
  const [button, setButton] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(true)
  const ref = useRef(null);
  const handleClick = (section) => {
    const element = document.getElementById(section)
    element.scrollIntoView({ behavior: 'smooth' });
  };

  const content = [
    { id: 'testIMG', src: '/images/PTWF_3.png' }
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

    // setContentLoaded(false)

  }, [loadingProgress]);

  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-between p-0 overflow-x-hidden">

      <section id="landing" className="fixed flex bg-custom-grey w-screen h-screen top-0 justify-center items-center overflow-hidden">

        {
          contentLoaded ?
            <div className="w-full h-full flex relative">
              <Curves screenWidth={screenWidth} screenHeight={screenHeight} className='z-0' />

              <div className='absolute w-full h-full flex justify-center items-center p-20'>
                <LandingTitle className="max-h-screen text-custom-white-50"/>
              </div>

              {/* <h1 className='font-JosefinSans text-[16rem] tracking-widest font-normal text-center invert'>NAVEED<br></br>GUJRAL</h1> */}

            </div>

            :
            <div>
              <h1 className=' font-JosefinSans text-custom-white-50 text-4xl'>Loading</h1>
            </div>
        }

      </section>

      {/* <section className='py-[100vh] px-0 relative flex flex-col w-screen min-h-screen items-center justify-center overflow-hidden'>
        <div id="about" className={` relative overflow-x-hidden flex flex-col w-screen min-h-screen items-center justify-center`}>
          <div className='w-[1080px]'>
            <img src={content[0].src} onLoad={() => handleContentLoad(content[0].id)} />
          </div>
        </div>
      </section> */}

    </main >

  );
}

