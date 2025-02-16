import { useEffect } from "react";

export function useInterval(onTick: Function, delay: number) {
  useEffect(() => {
    // const id = setInterval(() => {
    //   onTick();
    // }, delay);
    const id = setInterval(onTick, delay);
    return () => clearInterval(id);
  }, [delay]);
}
