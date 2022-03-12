import {useRef} from "react";

export const useThrottle = (callback, delayInMs) => {
    let timeoutId;
    const flushRef = useRef(() => null);

    const throttledCallback = (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(callback, delayInMs, ...args);
        flushRef.current = () => {
            clearTimeout(timeoutId);
            callback(...args);
        }
    }

    return [throttledCallback, flushRef];
}