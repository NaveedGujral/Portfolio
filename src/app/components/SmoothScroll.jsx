import { useScroll, useSpring, useTransform, motion, useMotionValueEvent } from 'framer-motion';
import React from 'react';
import { useRef, useState, useEffect, useCallback } from "react";

const SmoothScroll = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true)

    // retrieves content info including height
    const contentRef = useRef(null);
    const [contentHeight, setContentHeight] = useState(0)
    const [windowHeight, setWindowHeight] = useState(0)

    useEffect(() => {
        const handleResize = () => {
            if (contentRef.current != null) {
                setContentHeight(contentRef.current.scrollHeight);
            }
            setWindowHeight(window.innerHeight);
        }

        handleResize();

        if (window) {
            window.addEventListener('resize', handleResize);
        }
        console.log(contentHeight)

        // Cleanup function to remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [contentRef]);

    // Modify scroll behaviour
    const { scrollYProgress } = useScroll({
        target: contentRef.current,
    })
    const smoothProgress = useSpring(scrollYProgress, {
        mass: 0.1,
        stiffness: 100,
        damping: 20,
        restDelta: 0.001,
        initial: false
    })
    // const smoothProgress = useSpring(scrollYProgress, {
    //     mass: 0.125,
    //     stiffness: 10,
    //     damping: 1,
    //     restDelta: 0.001,
    //     initial: false
    // })

    useMotionValueEvent(smoothProgress, "change", (latest) => {
        if (latest === 0) {
            setIsLoading(false)
            console.log("loading complete")
        }
    })

    const y = useTransform(smoothProgress, (value) => {
        return 2*value * -(contentHeight - windowHeight)
    }, { clamp: true })

    useEffect(() => {
        setIsLoading(false);
    }, []);

    return (
        <>
            <div style={{ height: contentHeight }} />
            <motion.div className="fixed top-0 w-screen flex flex-col" ref={contentRef} style={{ y: isLoading ? 0 : y }}>
                {children}
            </motion.div>
        </>
    );
};

export default SmoothScroll;
