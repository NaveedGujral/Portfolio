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
    setScreenWidth(window.innerWidth);
    setScreenHeight(window.innerHeight);
  }, [setScreenWidth, setScreenHeight]);

  const handleContentLoad = (imgId) => {

    setLoadingProgress(prevState => ({
      ...prevState,
      [imgId]: true
    }));
  }

  useEffect(() => {
    handleResize();

    window.addEventListener('resize', handleResize);

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
            <div className="w-full h-full flex static">
              <Curves screenWidth={screenWidth} screenHeight={screenHeight} className='z-0' />

              <div className='w-screen h-screen absolute z-20 top-0 flex justify-center items-center'>

                {/* <h1 className='font-JosefinSans text-[16rem] tracking-widest font-normal text-center invert'>NAVEED<br></br>GUJRAL</h1> */}
                <LandingTitle />
              </div>

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

    </main>



    // <main className="flex min-h-screen w-screen flex-col items-center justify-between p-0 overflow-x-hidden">

    //   {/* <nav className="flex h-16 w-screen items-center justify-end pr-16 fixed top-0 z-10 bg-custom-grey backdrop-filter backdrop-blur bg-opacity-75 border-b-[1px] border-white border-opacity-25">
    //     <div className="w-[18rem]">
    //       <div className="flex w-full justify-between">
    //         <button onClick={() => handleClick("home")} class="btn-header">Home</button>
    //         <button onClick={() => handleClick("about")} class="btn-header">About</button>
    //         <button onClick={() => handleClick("projects")} class="btn-header">Projects</button>
    //         <button onClick={() => handleClick("contact")} class="btn-header">Contact</button>
    //       </div>
    //     </div>
    //   </nav> */}

    //   <div id="home" className="flex bg-custom-grey w-full h-screen top-0 justify-center items-center ">
    //     {/* <div className="justify-center items-center flex-col">
    //       <div className="text-white font-LexendGiga font-extralight text-7xl text-center py-6"> Naveed Gujral </div>
    //       <div className="text-white font-LexendGiga font-thin text-5xl text-center py-6"> Developer | Designer </div>
    //     </div> */}

    //     {/* <Curves screenWidth={screenWidth} screenHeight={screenHeight} /> */}

    //   </div>

    //   <div id="about" className=" overflow-x-hidden flex bg-custom-white-50 w-screen min-h-screen items-center justify-center ">
    //     {/* <TestButton/>
    //      */}
    //     <div className='w-[1080px] p-20'>
    //       <img src='/images/PTWF_3.png' />
    //     </div>
    //   </div>

    //   {/* <div id="projects" className="flex bg-green-500 w-full h-screen items-center justify-center ">
    //     <p className="text-white"> Projects </p>
    //   </div>

    //   <div id="contact" className="flex bg-violet-600 w-full h-screen items-center justify-center ">
    //     <p className="text-white"> Contact </p>
    //   </div> */}

    // </main>


  );
}

