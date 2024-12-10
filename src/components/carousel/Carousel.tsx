import styled from "@emotion/styled";
import React, {
  PropsWithChildren,
  ReactElement,
  useMemo,
  useState,
} from "react";
import CarouselSlider from "./CarouselSlider";

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
  const [transition, setTransition] = useState<string>("500ms");

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
