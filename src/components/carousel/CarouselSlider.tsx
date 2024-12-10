import styled from "@emotion/styled";
import React, { PropsWithChildren } from "react";

type Props = {
  width: number;
  moveCount: number;
  transition: string;
} & PropsWithChildren;

export default function CarouselSlider({
  children,
  width,
  moveCount,
  transition,
}: Props) {
  return (
    <SliderWrapper
      $width={`${React.Children.count(children) * width}px`}
      $transform={`-${moveCount * width}px`}
      $transition={transition}
    >
      {children}
    </SliderWrapper>
  );
}

type StyledProps = {
  $width: string;
  $transform: string;
  $transition: string;
};

const SliderWrapper = styled.div<StyledProps>`
  display: flex;
  width: ${(props) => props.$width};
  transform: translateX(${(props) => props.$transform});
  transition: ${(props) => props.$transition};
`;
