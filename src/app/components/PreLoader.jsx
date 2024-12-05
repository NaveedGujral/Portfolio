"use client";

import { AnimatePresence, motion, easeInOut } from "framer-motion";
import { useState, useEffect } from "react";

function PreLoader({ contentLoaded, loadingPercent }) {
  return (
    <AnimatePresence>
      {!contentLoaded && (
        <motion.div
          key="preloader"
          className="absolute h-screen w-full bg-custom-grey z-50 top-0"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1 } }}
        >
          <motion.div
            className="loading-bar opacity-25 round-full"
            initial={{ width: "0%" }}
            animate={{
              width: `${loadingPercent}%`,
              transition: { ease: easeInOut, duration: 2 },
              
            }}
          ></motion.div>
          <motion.div
            className="loading-bar blur-[2px]"
            initial={{ width: "0%" }}
            animate={{
              width: `${loadingPercent}%`,
              transition: { ease: easeInOut, duration: 2 },
              
            }}
          ></motion.div>
          <motion.div
            className="loading-bar blur-sm"
            initial={{ width: "0%" }}
            animate={{
              width: `${loadingPercent}%`,
              transition: { ease: easeInOut, duration: 2 },
              
            }}
          ></motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default PreLoader;
