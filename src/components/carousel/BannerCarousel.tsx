import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { CarouselStyled, Wrapper } from "../../styles/carouselStyled";
import CarouselSlider from "./common/CarouselSlider";
import { useSliderChild } from "../hooks/useSliderChild";
import { useMoveCount } from "../hooks/useMoveCount";
import { useInterval } from "../hooks/useInterval";
import styled from "@emotion/styled";
import STOP from "../../assets/stop.png";

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
  bannerInfo: Array<{ iconUrl: string; title: string }>;
} & PropsWithChildren;

export function BannerCarousel({
  children,
  auto,
  autoTimer,
  bannerInfo,
}: CarouselProps) {
  const [isAuto, setIsAuto] = useState<boolean>(auto);
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

  useInterval(isAuto, autoTimer, () => {
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
      <DesktopButtonsWrapper>
        {bannerInfo.map((item, i) => {
          return (
            <BannerButton
              key={i}
              onClick={() => moveCount.handleControlMoveCount(i + 1)}
            >
              <BannerIcon src={item.iconUrl} alt={item.title} />
              <BannerTitle>{item.title}</BannerTitle>
            </BannerButton>
          );
        })}
      </DesktopButtonsWrapper>
      <MobileButtonsWrapper>
        <StopButton>
          {isAuto ? (
            <StopImg onClick={() => setIsAuto(false)} src={STOP} alt="stop" />
          ) : (
            <div onClick={() => setIsAuto(true)}>s</div>
          )}
        </StopButton>
        <PageCounting>
          {moveCount.moveCount} / {bannerInfo.length}
        </PageCounting>
      </MobileButtonsWrapper>
    </BannerCarouselWrapper>
  );
}

const BannerCarouselWrapper = styled(Wrapper)`
  position: relative;
`;

const DesktopButtonsWrapper = styled.div`
  position: absolute;
  right: 10%;
  background-color: black;
  z-index: 100;
  width: 180px;
  border-radius: 4px;
  overflow: hidden;
  display: block;

  @media (max-width: 430px) {
    display: none;
  }
`;

const BannerButton = styled.button`
  width: 100%;
  display: flex;
  gap: 10px;
  padding: 20px;
  border: none;
  outline: none;
  background-color: white;
  cursor: pointer;

  &:nth-of-type(odd) {
    background-color: #f1f5f9;
  }
`;

const BannerIcon = styled.img`
  width: 25px;
  height: 25px;
`;

const BannerTitle = styled.p`
  flex-grow: 1;
  text-align: center;
  font-weight: bold;
  font-size: 12px;
`;

const MobileButtonsWrapper = styled.div`
  position: absolute;
  z-index: 100;
  display: flex;
  bottom: 20px;
  right: 16px;
  gap: 2px;

  @media (min-width: 430px) {
    display: none;
  }
`;

const StopButton = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  border-bottom-left-radius: 20px;
  border-top-left-radius: 20px;
`;

const StopImg = styled.img`
  width: 20px;
  height: 20px;
`;

const PageCounting = styled.div`
  width: 50px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border-bottom-right-radius: 20px;
  border-top-right-radius: 20px;
  font-size: 14px;
`;
