import React, { ReactElement, useState } from "react";
import { useThrottle } from "./useThrottle";

/**
 * @description Carousel의 slide controller hook
 *
 * @param infinite 무한 슬라이드 적용 여부. defalut = false
 * @param viewCount  Carousel에서 한번에 보여줄 item 갯수
 * @param sliderChildren Carousel에 적용될 slider item list
 * @param childrenState 사용자에게 입력받은 children
 */
export function useMoveCount(
  infinite: boolean,
  viewCount: number,
  sliderChildren: ReactElement[],
  childrenState: React.ReactNode
) {
  // 현재 캐로셀 아이템의 위치. infinite일 경우 임시슬라이드의 사이즈만큼 이동해야되기때문에 viewCount로 값 초기화.
  const [moveCount, setMoveCount] = useState<number>(infinite ? viewCount : 0);
  // transition용 state
  const [transition, setTransition] = useState<number>(500);
  const throttle = useThrottle();

  // transition 동작동안 이벤트 호ㅜㄹ을 막기 위해 throttle 사용
  const handlePrev = throttle(() => {
    if (infinite) {
      setMoveCount(moveCount - 1);

      // 현재 아이템 위치가 viewCount와 같다는건 임시 아이템 위치에 도달했다는 것.
      // 임시 아이템에서 원래 보여줘야할 실제 아이템로 이동하기 위한 구문.
      if (moveCount === viewCount) {
        const childLength = React.Children.count(childrenState);
        handleMoveToSlide(childLength + viewCount - 1);
      }
    } else {
      if (moveCount > 0) {
        setMoveCount(moveCount - 1);
      }
    }
    setTransition(500);
  }, 500);

  const handleNext = throttle(() => {
    if (infinite) {
      setMoveCount(moveCount + 1);
      // sliderChildren.length - 1 - viewCount => 임시 슬라이드의 마지막까지 캐로셀에 표시됬다는 것.
      // 그래서 현재 위치가 해당 값과 같아질경우 캐로셀 위치 초기화.
      if (moveCount === sliderChildren.length - 1 - viewCount) {
        handleMoveToSlide(viewCount);
      }
    } else {
      if (moveCount < sliderChildren.length - viewCount) {
        setMoveCount(moveCount + 1);
      }
    }
    setTransition(500);
  }, 500);

  /**
   * 임시 아이템에 도달했을 경우 실행할 함수.
   * transtion을 없애서 임시 아이템에서 실제 아이템으로 이동할때 UX의 문제를 없앰.
   * TODO: setTimeout seconds 상수화 필요.
   *  */
  const handleMoveToSlide = (num: number) => {
    setTimeout(() => {
      setTransition(0);
      setMoveCount(num);
    }, 500);
  };

  const handleControlMoveCount = (count: number) => {
    setMoveCount(count);
  };

  return {
    moveCount,
    transition,
    handleControlMoveCount,
    handlePrev,
    handleNext,
  };
}
