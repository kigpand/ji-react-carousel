import React, { ReactElement, ReactNode, useMemo, useState } from "react";

/**
 * @description Carousel에 적용할 아이템을 만들고 삭제하기 위해 만들어진 hook.
 *
 * @param infinite 무한 슬라이드 적용 여부. defalut = false
 * @param viewCount Carousel에서 한번에 보여줄 item 갯수
 * @param children 사용자에게 입력받은 Carousel item list
 *
 */
export function useSliderChild(
  infinite: boolean,
  viewCount: number,
  children: ReactNode
) {
  // 원본 children의 정보를 가지고 있는 state.
  // 사용자의 children을 직접 controller하는건 위험하다고 생각해 state로 따로 관리.
  const [childrenState, setChildrenState] = useState<React.ReactNode>(children);

  /**
   * slider에 적용할 Child 요소
   * viewCount만큼 양 옆으로 임시 아이템 추가.
   * 임시 아이템를 만든 이유는 양 사이드 끝에 도달했을 경우 다음 위치로 이동할려면 transtion이 해당 위치로 이동하기 때문에 UX적인 이슈가 있음.
   * 그래서 임시 아이템를 만들어 임시아이템 위치에 도달하면 transtion을 없애고 실제 아이템 위치로 이동하도록하기 위해 임시 아이템 추가.
   *  */
  const sliderChildren = useMemo<ReactElement[]>(() => {
    const childArr = React.Children.toArray(childrenState);
    if (infinite) {
      const value = [
        ...childArr.slice(-viewCount),
        ...childArr,
        ...childArr.slice(0, viewCount),
      ].map((item, i) => {
        return React.cloneElement(item as React.ReactElement, {
          key: `original-${i}`,
        });
      });
      return value;
    }
    return childArr.map((item) =>
      React.cloneElement(item as React.ReactElement)
    );
  }, [childrenState, infinite, viewCount]);

  // 현재 Carousel에 적용된 slide item을 삭제하는 함수
  const handleDeleteChildren = (index: number) => {
    const postion = infinite ? index - viewCount : index;
    const newChildren = React.Children.map(childrenState, (child, i) => {
      if (React.isValidElement(child) && i !== postion) {
        return child; // 조건에 맞는 자식만 반환
      }
      return null; // 조건에 맞지 않는 자식은 무시
    });
    setChildrenState(newChildren);
  };

  return {
    childrenState,
    sliderChildren,
    handleDeleteChildren,
  };
}
