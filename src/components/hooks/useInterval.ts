import { useEffect, useRef } from "react";

export function useInterval(
  auto: boolean,
  delay: number,
  callback: () => void
): void {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!auto || typeof delay !== "number") return;

    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };

    const timerId = setInterval(tick, delay);

    return () => clearInterval(timerId);
  }, [auto, delay]);
}
