import { PropsWithChildren } from "react";

/**
 * width: Carousel Item의 width
 * viewCount: Carousel에서 한번에 보여줄 item 갯수
 * infinite: 무한 슬라이드 적용 여부. defalut = false
 */
export type CarouselProps = {
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
