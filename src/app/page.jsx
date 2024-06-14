'use client'

import { extend } from "@react-three/fiber";
import { useRef } from "react";
import './globals.css';

import LandingPage3D from "./components/landingPage3D"
import Example3D from "./example3D/Example3D";
// import ParticlePath from "./example3Dparticlepath/ParticlePath"

export default function Home() {

  const ref = useRef(null);
  const handleClick = (section) => {
    const element = document.getElementById(section)
    element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-0">

      <nav className="flex h-16 w-full items-center justify-end pr-16 fixed top-0 z-10 bg-custom-grey backdrop-filter backdrop-blur bg-opacity-50">
        <div className="w-[18rem]">
          <div className="flex w-full justify-between">
            <button onClick={() => handleClick("home")} class="btn-header">Home</button>
            <button onClick={() => handleClick("about")} class="btn-header">About</button>
            <button onClick={() => handleClick("projects")} class="btn-header">Projects</button>
            <button onClick={() => handleClick("contact")} class="btn-header">Contact</button>
          </div>
        </div>
      </nav>

      <div id="home" className="flex bg-custom-grey w-full h-screen top-0 justify-center items-center">
        <div className="justify-center items-center flex-col">
          <div className="text-white font-LexendGiga font-extralight text-7xl text-center py-6"> Naveed Gujral </div>
          <div className="text-white font-LexendGiga font-thin text-5xl text-center py-6"> Developer | Designer </div>
        </div>

        <Example3D />
        {/* <ParticlePath/> */}
        {/* <LandingPage3D/> */}

      </div>

      {/* <div id="about" className="flex bg-custom-white-50 w-full h-screen items-center justify-center ">
      </div>

      <div id="projects" className="flex bg-green-500 w-full h-screen items-center justify-center ">
        <p className="text-white"> Projects </p>
      </div>

      <div id="contact" className="flex bg-violet-600 w-full h-screen items-center justify-center ">
        <p className="text-white"> Contact </p>
      </div> */}

    </main>


  );
}

