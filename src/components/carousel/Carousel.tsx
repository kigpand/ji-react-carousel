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
  const [moveCount, setMoveCount] = useState<number>(0);

  const sliderChildren = useMemo<ReactElement[]>(() => {
    const value = [
      ...React.Children.toArray(children),
      ...React.Children.toArray(children),
    ].map((item, i) => {
      return React.cloneElement(item as React.ReactElement, {
        key: `original-${i}`,
      });
    });
    return value;
  }, [children]);

  const handleLeftButton = () => {
    if (moveCount < sliderChildren.length - viewCount) {
      setMoveCount(moveCount + 1);
    }
  };

  const handleRightButton = () => {
    if (moveCount > 0) {
      setMoveCount(moveCount - 1);
    }
  };

  return (
    <Wrapper>
      <div onClick={handleLeftButton}>left</div>
      <CarouselStyled $width={`${viewCount * width}px`}>
        <CarouselSlider width={width} moveCount={moveCount}>
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
