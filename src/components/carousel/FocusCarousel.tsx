import { PropsWithChildren } from "react";
import {
  ArrowWrapper,
  CarouselStyled,
  CarouselWrapper,
  Wrapper,
} from "../../styles/carouselStyled";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import CarouselSlider from "./common/CarouselSlider";
import { useSliderChild } from "../hooks/useSliderChild";
import { useMoveCount } from "../hooks/useMoveCount";
import { useInterval } from "../hooks/useInterval";

type CarouselProps = {
  /**
   * width: Carousel Item의 width
   */
  width: number;
  /**
   * auto: 자동으로 슬라이드가 넘어가도록 동작할지 여부. default = false
   */
  auto?: boolean;
  /**
   * autoTimer: 자동 슬라이드 적용시 슬라이드 속도. default = 3000ms
   */
  autoTimer?: number;
} & PropsWithChildren;

export function FocusCarousel({
  children,
  width,
  auto = false,
  autoTimer = 3000,
}: CarouselProps) {
  const viewCount = 3;
  const { childrenState, sliderChildren, handleDeleteChildren } =
    useSliderChild(true, viewCount, children);
  const moveCount = useMoveCount(
    true,
    viewCount,
    sliderChildren,
    childrenState
  );

  useInterval(auto, autoTimer, () => {
    moveCount.handleNext();
  });

  return (
    <CarouselWrapper>
      <Wrapper>
        <ArrowWrapper>
          {moveCount.moveCount !== 0 && (
            <FaChevronLeft size="30" onClick={moveCount.handlePrev} />
          )}
        </ArrowWrapper>
        <CarouselStyled width={`${width * viewCount}px`}>
          <CarouselSlider
            isFocus
            viewCount={viewCount}
            width={width}
            {...moveCount}
            handleDelete={handleDeleteChildren}
          >
            {sliderChildren}
          </CarouselSlider>
        </CarouselStyled>
        <ArrowWrapper>
          {moveCount.moveCount < sliderChildren.length - viewCount && (
            <FaChevronRight size="30" onClick={moveCount.handleNext} />
          )}
        </ArrowWrapper>
      </Wrapper>
    </CarouselWrapper>
  );
}
