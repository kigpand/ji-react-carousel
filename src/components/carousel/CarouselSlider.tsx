import styled from "@emotion/styled";
import React, { PropsWithChildren } from "react";

type Props = {
  width: number;
  moveCount: number;
} & PropsWithChildren;

export default function CarouselSlider({ children, width, moveCount }: Props) {
  return (
    <SliderWrapper
      $width={`${React.Children.count(children) * width}px`}
      $transform={`-${moveCount * width}px`}
    >
      {children}
    </SliderWrapper>
  );
}

type StyledProps = {
  $width: string;
  $transform: string;
};

const SliderWrapper = styled.div<StyledProps>`
  display: flex;
  width: ${(props) => props.$width};
  transform: translateX(${(props) => props.$transform});
  transition: 0.1s;
`;
