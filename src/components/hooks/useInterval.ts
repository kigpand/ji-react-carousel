import { useEffect, useRef } from "react";

/**
 * @description timer interval
 *
 * @param auto 동작 여부, true일 경우 동작
 * @param delay interval 동작 주기
 * @param callback timer에서 실행할 함수
 */
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
