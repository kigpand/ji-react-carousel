import { PropsWithChildren, useEffect, useRef, useState } from "react";
import {
  CarouselStyled,
  CarouselWrapper,
  Wrapper,
} from "../../styles/carouselStyled";
import CarouselSlider from "./common/CarouselSlider";
import { useSliderChild } from "../hooks/useSliderChild";
import { useMoveCount } from "../hooks/useMoveCount";
import { useInterval } from "../hooks/useInterval";
import styled from "@emotion/styled";

const STOP = "/assets/stop.png";
const PLAY = "/assets/play.png";

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
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setIsAuto(false);
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
    <CarouselWrapper>
      <BannerCarouselWrapper ref={containerRef}>
        {width && (
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
        )}
        <DesktopButtonsWrapper>
          {bannerInfo.map((item, i) => {
            return (
              <BannerButton
                key={i}
                isCurrent={i === moveCount.moveCount - 1}
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
            <StopImg
              onClick={() => setIsAuto(!isAuto)}
              src={isAuto ? STOP : PLAY}
              alt="stopIcon"
            />
          </StopButton>
          <PageCounting>
            {moveCount.moveCount > bannerInfo.length ? 1 : moveCount.moveCount}{" "}
            / {bannerInfo.length}
          </PageCounting>
        </MobileButtonsWrapper>
      </BannerCarouselWrapper>
    </CarouselWrapper>
  );
}

const BannerCarouselWrapper = styled(Wrapper)`
  position: relative;
`;

const DesktopButtonsWrapper = styled.div`
  position: absolute;
  right: 10%;
  z-index: 1;
  width: 180px;
  border-radius: 12px;
  overflow: hidden;
  display: block;

  @media (max-width: 430px) {
    display: none;
  }
`;

const BannerButton = styled.button<{ isCurrent: boolean }>`
  width: 100%;
  display: flex;
  gap: 10px;
  padding: 20px;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: ${(props) => (props.isCurrent ? "#f1f5f9" : "white")};
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
  z-index: 1;
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
