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
  const [renderLoading, setRenderLoading] = useState(0);

  useEffect(() => {
    setRenderLoading(loadingPercent)
  }, [loadingPercent]);

  return (
    <AnimatePresence>
      {!contentLoaded && (
        <m.div
          className="absolute w-full h-full flex justify-center items-center p-10 z-50"
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.5,
              delay: 0
            },
          }}
          onAnimationComplete={() => !contentLoaded}
        >
          <h1 className="subHeading text-4xl xl:text-6xl text-custom-white-50">{renderLoading}%</h1>
          {/* <LandingTitle className="max-h-[50vh] max-w-[50vw]" /> */}
        </m.div>
      )}
      ;
    </AnimatePresence>
  );
}
export default PreLoader;
