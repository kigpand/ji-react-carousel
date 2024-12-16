import React, { ReactElement, ReactNode, useMemo, useState } from "react";

export function useSliderChild(
  infinite: boolean,
  viewCount: number,
  children: ReactNode
) {
  // 원본 children state
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
