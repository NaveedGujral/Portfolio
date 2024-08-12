import { useRef, useState, useEffect, useCallback } from "react";

export default function TestButton () {
    const [button, setButton] = useState(false);

    return (
        <button onClick={(() => {
            setButton(!button)
        })}>Click Me: Button State :{button.toString()}</button>
    )
}