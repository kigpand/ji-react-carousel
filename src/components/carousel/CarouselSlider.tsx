import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { PropsWithChildren } from "react";

type Props = {
  width: number;
  moveCount: number;
  transition: number;
} & PropsWithChildren;

export default function CarouselSlider({
  children,
  width,
  moveCount,
  transition,
}: Props) {
  return (
    <SliderWrapper
      width={React.Children.count(children) * width}
      translateX={moveCount * width}
      transition={transition}
    >
      {children}
    </SliderWrapper>
  );
}

type StyledProps = {
  width: number;
  translateX: number;
  transition: number;
};

const SliderWrapper = styled.div<StyledProps>`
  display: flex;

  ${(props) =>
    css`
      width: ${props.width}px;
      transform: translateX(-${props.translateX}px);
      transition: ${props.transition}ms;
    `}
`;
