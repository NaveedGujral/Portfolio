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

  useEffect(() => {
    console.log(contentLoaded);
    setLanding(!contentLoaded);
  }, [contentLoaded]);

  return (
    <AnimatePresence mode="wait">
      {!contentLoaded && (
        <m.div
          className="absolute w-full h-full flex justify-center items-center p-10 bg-custom-grey z-50"
          initial={{
            opacity: 0,
            filter: "blur(12px)",
          }}
          animate={{
            opacity: 1,
            filter: "blur(0)",
            transition: {
              duration: 1,
              delay: 1,
            },
          }}
          exit={{
            opacity: 0,
            filter: "blur(12px)",
            transition: {
              duration: 1,
              delay: 1,
            },
          }}
          onAnimationComplete={() => !contentLoaded}
        >
          {landing && (
              <LandingTitle className="max-h-[50vh] max-w-[50vw]" />
          )}
        </m.div>
      )}
      ;
    </AnimatePresence>
  );
}
export default PreLoader;
