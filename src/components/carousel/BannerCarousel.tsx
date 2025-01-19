import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { CarouselStyled, Wrapper } from "../../styles/carouselStyled";
import CarouselSlider from "./common/CarouselSlider";
import { useSliderChild } from "../hooks/useSliderChild";
import { useMoveCount } from "../hooks/useMoveCount";
import { useInterval } from "../hooks/useInterval";
import styled from "@emotion/styled";

type CarouselProps = {
  /**
   * auto: 자동으로 슬라이드가 넘어가도록 동작할지 여부. default = false
   */
  auto: boolean;
  /**
   * autoTimer: 자동 슬라이드 적용시 슬라이드 속도. default = 3000ms
   */
  autoTimer: number;
  /**
   * banner icon url
   */
  iconUrls: string[];
} & PropsWithChildren;

export function BannerCarousel({ children, auto, autoTimer }: CarouselProps) {
  const viewCount = 1;
  const { childrenState, sliderChildren, handleDeleteChildren } =
    useSliderChild(true, viewCount, children);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    <BannerCarouselWrapper ref={containerRef}>
      <CarouselStyled width={`${width * viewCount}px`}>
        <CarouselSlider
          viewCount={viewCount}
          width={width}
          {...moveCount}
          handleDelete={handleDeleteChildren}
          isDragging={false}
          hasDeleteButton={false}
        >
          {sliderChildren}
        </CarouselSlider>
      </CarouselStyled>
      <ButtonsWrapper>
        <div>sdf</div>
      </ButtonsWrapper>
    </BannerCarouselWrapper>
  );
}

const BannerCarouselWrapper = styled(Wrapper)`
  position: relative;
`;

const ButtonsWrapper = styled.div`
  position: absolute;
  right: 10%;
  background-color: black;
  z-index: 10;
`;
