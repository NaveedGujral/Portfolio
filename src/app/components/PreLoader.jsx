// import { AnimatePresence } from "framer-motion";

// function PreLoader({ contentLoaded }) {
//   return contentLoaded ? (
//     <></>
//   ) : (
//     <AnimatePresence>
//       <div
//         className="absolute h-screen w-full bg-custom-orange z-50 top-0`"
//         initial={false}
//         exitBeforeEnter={true}
//         onExitComplete={() => null}
//         exit={{ opacity: 0, transition: {duration: 1} }}
//       ></div>
//     </AnimatePresence>
//   );
// }

// export default PreLoader;

import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";

function PreLoader({contentLoaded}) {

  return (
    <AnimatePresence>
      {!contentLoaded && (
        <motion.div
          key="preloader"
          className="absolute h-screen w-full bg-custom-purple z-50 top-0"
          initial={{opacity: 1}}
          exit={{ opacity: 0, transition: { duration: 1 } }}
        >
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default PreLoader;
