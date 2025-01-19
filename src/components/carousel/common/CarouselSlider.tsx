import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, {
  MouseEvent,
  PropsWithChildren,
  TouchEvent,
  useRef,
  useState,
} from "react";
import CarouselDelete from "./CarouselDelete";

type Props = {
  width: number;
  moveCount: number;
  transition: number;
  viewCount: number;
  isFocus?: boolean;
  hasDeleteButton?: boolean;
  handlePrev: () => void;
  handleNext: () => void;
  handleDelete: (index: number) => void;
} & PropsWithChildren;

export default function CarouselSlider({
  children,
  width,
  moveCount,
  transition,
  viewCount,
  isFocus = false,
  hasDeleteButton = true,
  handlePrev,
  handleNext,
  handleDelete,
}: Props) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [startPosition, setStartPosition] = useState<number>(0);

  const handleMouseDown = (e: MouseEvent) => {
    setStartPosition(e.clientX);
  };

  const handleMouseUp = (e: MouseEvent) => {
    if (startPosition > e.clientX) {
      handleNext();
    } else if (startPosition < e.clientX) {
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
    } else if (startPosition < touch.clientX) {
      handlePrev();
    }
  };

  return (
    <SliderWrapper
      data-testid="slider-wrapper"
      ref={sliderRef}
      width={React.Children.count(children) * width}
      translateX={moveCount * width}
      transition={transition}
      isSingle={viewCount === 1}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {React.Children.map(children, (item, i) => {
        return (
          <SliderItem
            key={i}
            width={width}
            isFocus={isFocus}
            isCurrent={moveCount + 1 === i}
          >
            {item}
            {hasDeleteButton && (
              <CarouselDelete handleDeleteButton={() => handleDelete(i)} />
            )}
          </SliderItem>
        );
      })}
    </SliderWrapper>
  );
}

type StyledProps = {
  width: number;
  translateX: number;
  transition: number;
  isSingle: boolean;
};

const SliderWrapper = styled.div<StyledProps>`
  display: flex;
  gap: ${(props) => (props.isSingle ? 0 : 5)}px;
  cursor: grab;

  ${(props) =>
    css`
      width: ${props.width}px;
      transform: translateX(-${props.translateX}px);
      transition: ${props.transition}ms;
    `}
`;

const SliderItem = styled.div<{
  width: number;
  isFocus: boolean;
  isCurrent: boolean;
}>`
  width: ${(props) => props.width}px;
  position: relative;
  overflow: hidden;

  ${({ isFocus, isCurrent }) =>
    isFocus &&
    !isCurrent &&
    css`
      transform: scale(0.9);
    `}

  &:hover .carousel_deleteButton {
    display: block;
  }
`;
