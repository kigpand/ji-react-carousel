import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, {
  MouseEvent,
  PropsWithChildren,
  TouchEvent,
  useRef,
  useState,
} from "react";

type Props = {
  width: number;
  moveCount: number;
  transition: number;
  handlePrev: () => void;
  handleNext: () => void;
} & PropsWithChildren;

export default function CarouselSlider({
  children,
  width,
  moveCount,
  transition,
  handlePrev,
  handleNext,
}: Props) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [startPosition, setStartPosition] = useState<number>(0);

  const handleMouseDown = (e: MouseEvent) => {
    setStartPosition(e.clientX);
  };

  const handleMouseUp = (e: MouseEvent) => {
    if (startPosition > e.clientX) {
      handleNext();
    } else {
      handlePrev();
    }
  };

  const handleTouchStart = (e: TouchEvent) => {
    setStartPosition(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: TouchEvent) => {
    const touch = e.changedTouches[0];
    if (startPosition > touch.clientX) {
      handleNext();
    } else {
      handlePrev();
    }
  };

  return (
    <SliderWrapper
      ref={sliderRef}
      width={React.Children.count(children) * width}
      translateX={moveCount * width}
      transition={transition}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
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
