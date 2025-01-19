import CarouselSlider from "./common/CarouselSlider";
import { useInterval } from "../hooks/useInterval";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  ArrowWrapper,
  CarouselStyled,
  CarouselWrapper,
  Wrapper,
} from "../../styles/carouselStyled";
import { useMoveCount } from "../hooks/useMoveCount";
import { useSliderChild } from "../hooks/useSliderChild";
import React, { PropsWithChildren } from "react";

type CarouselProps = {
  /**
   * width: Carousel Item의 width
   */
  width: number;

  /**
   * viewCount: Carousel에서 한번에 보여줄 item 갯수
   */
  viewCount: number;
  /**
   * infinite: 무한 슬라이드 적용 여부. defalut = false
   */
  infinite?: boolean;
  /**
   * auto: 자동으로 슬라이드가 넘어가도록 동작할지 여부. default = false
   */
  auto?: boolean;
  /**
   * autoTimer: 자동 슬라이드 적용시 슬라이드 속도. default = 3000ms
   */
  autoTimer?: number;

  /**
   * leftArrow: 왼쪽 화살표 UI. 없을 경우 기존 UI 표시
   */
  LeftArrow?: React.ReactElement;

  /**
   * rightArrow: 오른쪽 화살표 UI. 없을 경우 기존 UI 표시
   */
  RightArrow?: React.ReactElement;

  /**
   * hasDeleteButton: 삭제버튼 유무
   */
  hasDeleteButton?: boolean;
} & PropsWithChildren;

export function Carousel({
  children,
  width,
  viewCount,
  infinite = false,
  auto = false,
  autoTimer = 3000,
  LeftArrow,
  RightArrow,
  hasDeleteButton,
}: CarouselProps) {
  const { childrenState, sliderChildren, handleDeleteChildren } =
    useSliderChild(infinite, viewCount, children);

  const moveCount = useMoveCount(
    infinite,
    viewCount,
    sliderChildren,
    childrenState
  );

  // auto carousel용 interval hook
  // handleNext 함수가 한개씩 증가하도록 동작하는 함수이므로 내부에서 실행.
  useInterval(auto, autoTimer, () => {
    moveCount.handleNext();
  });

  return (
    <CarouselWrapper>
      <Wrapper>
        <ArrowWrapper data-testid="left-arrow" onClick={moveCount.handlePrev}>
          {(infinite || moveCount.moveCount !== 0) &&
            (LeftArrow ?? <FaChevronLeft size="30" />)}
        </ArrowWrapper>
        <CarouselStyled width={`${viewCount * width}px`}>
          <CarouselSlider
            viewCount={viewCount}
            width={width}
            {...moveCount}
            handleDelete={handleDeleteChildren}
            hasDeleteButton={hasDeleteButton}
          >
            {sliderChildren}
          </CarouselSlider>
        </CarouselStyled>
        <ArrowWrapper data-testid="right-arrow" onClick={moveCount.handleNext}>
          {(infinite ||
            moveCount.moveCount < sliderChildren.length - viewCount) &&
            (RightArrow ?? <FaChevronRight size="30" />)}
        </ArrowWrapper>
      </Wrapper>
    </CarouselWrapper>
  );
}
