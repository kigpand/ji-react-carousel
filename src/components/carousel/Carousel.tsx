import CarouselSlider from "./CarouselSlider";
import { useInterval } from "../hooks/useInterval";
import CarouselPaging from "./paging/CarouselPaging";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  ArrowWrapper,
  CarouselStyled,
  CarouselWrapper,
  Wrapper,
} from "../../styles/carouselStyled";
import { useMoveCount } from "../hooks/useMoveCount";
import { useSliderChild } from "../hooks/useSliderChild";
import { PropsWithChildren } from "react";

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
   * paging: Carousel과 연동된 페이지네이션 버튼 적용 여부. default = false
   */
  paging?: boolean;
} & PropsWithChildren;

export function Carousel({
  children,
  width,
  viewCount,
  infinite = false,
  auto = false,
  autoTimer = 3000,
  paging = false,
}: CarouselProps) {
  // paging 적용시 infinite slider 옵션 off되도록 적용.
  infinite = paging ? false : infinite;
  // paging 적용시 viewCount는 1로 적용.
  viewCount = paging ? 1 : viewCount;

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
        <ArrowWrapper>
          {(infinite || moveCount.moveCount !== 0) && (
            <FaChevronLeft size="30" onClick={moveCount.handlePrev} />
          )}
        </ArrowWrapper>
        <CarouselStyled width={`${viewCount * width}px`}>
          <CarouselSlider
            width={width}
            {...moveCount}
            handleDelete={handleDeleteChildren}
          >
            {sliderChildren}
          </CarouselSlider>
        </CarouselStyled>
        <ArrowWrapper>
          {(infinite ||
            moveCount.moveCount !== sliderChildren.length - viewCount + 1) && (
            <FaChevronRight size="30" onClick={moveCount.handleNext} />
          )}
        </ArrowWrapper>
      </Wrapper>
      {paging && (
        <CarouselPaging
          moveCount={moveCount.moveCount}
          pageCount={sliderChildren.length}
          handleChangeMoveCount={moveCount.handleControlMoveCount}
        />
      )}
    </CarouselWrapper>
  );
}
