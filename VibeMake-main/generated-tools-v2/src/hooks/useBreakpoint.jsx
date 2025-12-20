import React from "react";


import {useState, useEffect} from "react";

// Tailwind breakpoints
export const BREAKPOINT_SM = 640;
export const BREAKPOINT_MD = 768;
export const BREAKPOINT_LG = 1024;
export const BREAKPOINT_XL = 1280;
export const BREAKPOINT_2XL = 1536;

export function useBreakpoint() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const onResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return width;
}


export default useBreakpoint;