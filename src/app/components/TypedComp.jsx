import { ReactTyped, Typed } from "react-typed";
import { InView } from "react-intersection-observer";
import { useRef, useState, useEffect, useCallback } from "react";

const TypedComp = ({ props }) => {
    const [startAnim, setStartAnim] = useState(true)
    const [pos, setPos] = useState(0)

    return (
        < InView threshold={0} onChange={(inView, entry) => {
            setStartAnim(inView)
            console.log(inView)
        }}>
            {({ ref, inView }) => (

                startAnim ?

                    <div ref={ref} className={`h-[5rem] lg:h-[9rem] w-full transition-opacity -translate-x-2 lg:-translate-x-4 flex-row flex ${startAnim ? "opacity-100" : "opacity-0"}`}>
                        <h1  className={`font-JosefinSans text-7xl leading-[5rem] lg:text-[9rem] lg:leading-[9rem] font-thin text-custom-white-50`} >I</h1>&nbsp;
                        <ReactTyped strings={["design", "develop"]}
                            className={`font-JosefinSans text-7xl leading-[5rem] lg:text-[9rem] lg:leading-[9rem] font-extralight ${pos === 0 ? " text-purple-800" : "text-orange-500"}`}
                            typeSpeed={150}
                            backSpeed={150}
                            backDelay={1000}
                            startDelay={150}
                            showCursor={false}
                            smartBackspace={false}
                            preStringTyped={(arrayPos, self) => {
                                console.log(arrayPos)
                                setPos(arrayPos)
                            }}
                            loop={true}
                        />
                    </div>

                    :

                    <div ref={ref} className="h-[9rem] w-full ">
                    </div>
            )}
        </InView >
    );
}

export default TypedComp