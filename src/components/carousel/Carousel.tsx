import styled from "@emotion/styled";
import React, {
  PropsWithChildren,
  ReactElement,
  useMemo,
  useState,
} from "react";
import CarouselSlider from "./CarouselSlider";

/**
 * width: Carousel Item의 width
 * viewCount: Carousel에서 한번에 보여줄 item 갯수
 * infinite: 무한 슬라이드 적용 여부. defalut = false
 */
type Props = {
  width: number;
  viewCount: number;
  infinite?: boolean;
} & PropsWithChildren;

export function Carousel({
  children,
  width,
  viewCount,
  infinite = false,
}: Props) {
  const [moveCount, setMoveCount] = useState<number>(infinite ? viewCount : 0);
  // transition용 state
  const [transition, setTransition] = useState<string>("500ms");

  /**
   * slider에 적용할 Child 요소
   * viewCount만큼 양 옆으로 임시 아이템 추가.
   * 임시 아이템를 만든 이유는 양 사이드 끝에 도달했을 경우 다음 위치로 이동할려면 transtion이 해당 위치로 이동하기 때문에 UX적인 이슈가 있음.
   * 그래서 임시 아이템를 만들어 임시아이템 위치에 도달하면 transtion을 없애고 실제 아이템 위치로 이동하도록하기 위해 임시 아이템 추가.
   *  */
  const sliderChildren = useMemo<ReactElement[]>(() => {
    const childArr = React.Children.toArray(children);
    if (infinite) {
      const value = [
        ...childArr.slice(childArr.length - viewCount, childArr.length),
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
  }, [children]);

  const handleLeftButton = () => {
    if (infinite) {
      setMoveCount(moveCount - 1);

      // 현재 아이템 위치가 viewCount와 같다는건 임시 아이템 위치에 도달했다는 것.
      // 임시 아이템에서 원래 보여줘야할 실제 아이템로 이동하기 위한 구문.
      if (moveCount === viewCount) {
        const childLength = React.Children.count(children);
        handleMoveToSlide(childLength + viewCount - 1);
      }
    } else {
      if (moveCount > 0) {
        setMoveCount(moveCount - 1);
      }
    }
    setTransition("500ms");
  };

  const handleRightButton = () => {
    if (infinite) {
      setMoveCount(moveCount + 1);
      if (moveCount === sliderChildren.length + viewCount) {
        handleMoveToSlide(1);
      }
    } else {
      if (moveCount < sliderChildren.length - viewCount) {
        setMoveCount(moveCount + 1);
      }
    }
    setTransition("500ms");
  };

  /**
   * 임시 아이템에 도달했을 경우 실행할 함수.
   * transtion을 없애서 임시 아이템에서 실제 아이템으로 이동할때 UX의 문제를 없앰.
   * TODO: setTimeout seconds 상수화 필요.
   *  */
  const handleMoveToSlide = (num: number) => {
    setTimeout(() => {
      setTransition("");
      setMoveCount(num);
    }, 500);
  };

  return (
    <Wrapper>
      <div onClick={handleLeftButton}>left</div>
      <CarouselStyled $width={`${viewCount * width}px`}>
        <CarouselSlider
          width={width}
          moveCount={moveCount}
          transition={transition}
        >
          {sliderChildren}
        </CarouselSlider>
      </CarouselStyled>
      <div onClick={handleRightButton}>right</div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: flex;
  gap: 10px;
  height: 100%;
  align-items: center;
`;

type StyledProps = {
  $width: string;
};

const CarouselStyled = styled.div<StyledProps>`
  display: flex;
  width: ${(props) => props.$width};
  height: 100%;
  background-color: red;
  overflow: hidden;
`;
