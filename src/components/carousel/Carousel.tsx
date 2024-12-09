import styled from "@emotion/styled";
import React, { PropsWithChildren, useState } from "react";
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

  const handleLeftButton = () => {
    console.log(React.Children.count(children));
    if (moveCount < React.Children.count(children)) {
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
          {children}
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
