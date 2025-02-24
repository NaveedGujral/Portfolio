"use client";

import {
  AnimatePresence,
  motion as m,
  easeInOut,
  usePresence,
} from "framer-motion";
import { useState, useEffect } from "react";
import LandingTitle from "./SVG/LandingTitle";

function PreLoader({ contentLoaded, loadingPercent }) {
  const [landing, setLanding] = useState(!contentLoaded);
  const [isPresent, safeToRemove] = usePresence();

  useEffect(() => {
    console.log(contentLoaded)
    setLanding(!contentLoaded);
    contentLoaded && setTimeout(safeToRemove, 500); // Duration + Delay
  }, [contentLoaded]);

  return (
    <AnimatePresence>
      {isPresent && (
        <m.div
          className="absolute w-full h-full flex justify-center items-center p-10 bg-purple-500 z-50"
          initial={{
            opacity: 0,
            filter: "blur(12px)",
          }}
          animate={{
            opacity: 1,
            filter: "blur(0)",
            delay: 1,
            duration: 2,
          }}
          exit={{
            opacity: 0,
            filter: "blur(12px)",
            delay: 1,
            duration: 2,
          }}
        ></m.div>
      )}
    </AnimatePresence>
  );
  // return (
  //   <AnimatePresence>
  //     {!contentLoaded && (
  //       <m.div
  //         className="absolute w-full h-full flex justify-center items-center p-10 bg-purple-500 z-50"
  //         initial={{
  //           opacity: 0,
  //           filter: "blur(12px)",
  //         }}
  //         animate={{
  //           opacity: 1,
  //           filter: "blur(0px)",
  //           delay: 1,
  //           duration: 2,
  //         }}
  //         exit={{
  //           opacity: 0,
  //           filter: "blur(12px)",
  //         }}
  //       >
  //         {/* {landing && (
  //           <m.div
  //             exit={{
  //               opacity: 0,
  //               filter: "blur(12px)",
  //               delay: 1,
  //               duration: 2,
  //             }}
  //           >
  //             <LandingTitle className="max-h-[50vh] max-w-[50vw] " />
  //           </m.div>
  //         )} */}
  //       </m.div>
  //     )}
  //   </AnimatePresence>
  // );
}
export default PreLoader;
