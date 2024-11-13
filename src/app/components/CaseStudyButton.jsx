import { motion } from "framer-motion";

function CaseStudyButton() {
  return (
    <motion.button
      className="project-button"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      Case Study
    </motion.button>
  );
}

export default CaseStudyButton;
