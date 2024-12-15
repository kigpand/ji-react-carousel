import styled from "@emotion/styled";
import React, { ReactElement, useMemo, useState } from "react";
import CarouselSlider from "./CarouselSlider";
import { useInterval } from "../hooks/useInterval";
import { CarouselProps } from "../../types/CarouselProps";
import CarouselPaging from "./paging/CarouselPaging";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export function Carousel({
  children,
  width,
  viewCount,
  infinite = false,
  auto = false,
  autoTimer = 3000,
  paging = false,
}: CarouselProps) {
  // 원본 children state
  const [childrenState, setChildrenState] = useState<React.ReactNode>(children);
  // paging 적용시 infinite slider 옵션 off되도록 적용.
  infinite = paging ? false : infinite;
  // paging 적용시 viewCount는 1로 적용.
  viewCount = paging ? 1 : viewCount;
  // 현재 캐로셀 아이템의 위치. infinite일 경우 임시슬라이드의 사이즈만큼 이동해야되기때문에 viewCount로 값 초기화.
  const [moveCount, setMoveCount] = useState<number>(infinite ? viewCount : 0);
  // transition용 state
  const [transition, setTransition] = useState<number>(500);

  /**
   * slider에 적용할 Child 요소
   * viewCount만큼 양 옆으로 임시 아이템 추가.
   * 임시 아이템를 만든 이유는 양 사이드 끝에 도달했을 경우 다음 위치로 이동할려면 transtion이 해당 위치로 이동하기 때문에 UX적인 이슈가 있음.
   * 그래서 임시 아이템를 만들어 임시아이템 위치에 도달하면 transtion을 없애고 실제 아이템 위치로 이동하도록하기 위해 임시 아이템 추가.
   *  */
  const sliderChildren = useMemo<ReactElement[]>(() => {
    const childArr = React.Children.toArray(childrenState);
    if (infinite) {
      const value = [
        ...childArr.slice(-viewCount),
        ...childArr,
        ...childArr.slice(0, viewCount),
      ].map((item, i) => {
        return React.cloneElement(item as React.ReactElement, {
          key: `original-${i}`,
        });
      });
      return value;
    }
    return childArr.map((item) =>
      React.cloneElement(item as React.ReactElement)
    );
  }, [childrenState, infinite, viewCount]);

  const handlePrev = () => {
    if (infinite) {
      setMoveCount(moveCount - 1);

      // 현재 아이템 위치가 viewCount와 같다는건 임시 아이템 위치에 도달했다는 것.
      // 임시 아이템에서 원래 보여줘야할 실제 아이템로 이동하기 위한 구문.
      if (moveCount === viewCount) {
        const childLength = React.Children.count(childrenState);
        handleMoveToSlide(childLength + viewCount - 1);
      }
    } else {
      if (moveCount > 0) {
        setMoveCount(moveCount - 1);
      }
    }
    setTransition(500);
  };

  const handleNext = () => {
    if (infinite) {
      setMoveCount(moveCount + 1);
      // sliderChildren.length - 1 - viewCount => 임시 슬라이드의 마지막까지 캐로셀에 표시됬다는 것.
      // 그래서 현재 위치가 해당 값과 같아질경우 캐로셀 위치 초기화.
      if (moveCount === sliderChildren.length - 1 - viewCount) {
        handleMoveToSlide(viewCount);
      }
    } else {
      if (moveCount < sliderChildren.length - viewCount) {
        setMoveCount(moveCount + 1);
      }
    }
    setTransition(500);
  };
  /**
   * 임시 아이템에 도달했을 경우 실행할 함수.
   * transtion을 없애서 임시 아이템에서 실제 아이템으로 이동할때 UX의 문제를 없앰.
   * TODO: setTimeout seconds 상수화 필요.
   *  */
  const handleMoveToSlide = (num: number) => {
    setTimeout(() => {
      setTransition(0);
      setMoveCount(num);
    }, 500);
  };

  const handleDeleteChildren = (index: number) => {
    const postion = infinite ? index - viewCount : index;
    const newChildren = React.Children.map(childrenState, (child, i) => {
      if (React.isValidElement(child) && i !== postion) {
        return child; // 조건에 맞는 자식만 반환
      }
      return null; // 조건에 맞지 않는 자식은 무시
    });
    setChildrenState(newChildren);
  };

  // auto carousel용 interval hook
  // handleNext 함수가 한개씩 증가하도록 동작하는 함수이므로 내부에서 실행.
  useInterval(auto, autoTimer, () => {
    handleNext();
  });

  return (
    <CarouselWrapper>
      <Wrapper>
        <ArrowWrapper>
          {(infinite || moveCount !== 0) && (
            <FaChevronLeft size="30" onClick={handlePrev} />
          )}
        </ArrowWrapper>
        <CarouselStyled width={`${viewCount * width}px`}>
          <CarouselSlider
            width={width}
            moveCount={moveCount}
            transition={transition}
            handlePrev={handlePrev}
            handleNext={handleNext}
            handleDelete={handleDeleteChildren}
          >
            {sliderChildren}
          </CarouselSlider>
        </CarouselStyled>
        <ArrowWrapper>
          {(infinite || moveCount !== sliderChildren.length - 1) && (
            <FaChevronRight size="30" onClick={handleNext} />
          )}
        </ArrowWrapper>
      </Wrapper>
      {paging && (
        <CarouselPaging
          moveCount={moveCount}
          pageCount={sliderChildren.length}
          handleChangeMoveCount={(num: number) => setMoveCount(num)}
        />
      )}
    </CarouselWrapper>
  );
}

const CarouselWrapper = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  height: 100%;
  align-items: center;
`;

type StyledProps = {
  width: string;
};

const CarouselStyled = styled.div<StyledProps>`
  display: flex;
  width: ${(props) => props.width};
  height: 100%;
  overflow: hidden;
`;

const ArrowWrapper = styled.div`
  width: 30px;
  cursor: pointer;
`;
