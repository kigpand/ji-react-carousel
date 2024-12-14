import { css } from "@emotion/react";
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
      width={`${React.Children.count(children) * width}px`}
      translateX={`-${moveCount * width}px`}
      transition={transition}
    >
      {children}
    </SliderWrapper>
  );
}

type StyledProps = {
  width: string;
  translateX: string;
  transition: string;
};

const SliderWrapper = styled.div<StyledProps>`
  display: flex;

  ${(props) =>
    css`
      width: ${props.width};
      transform: translateX(${props.translateX});
      transition: ${props.transition};
    `}
`;
