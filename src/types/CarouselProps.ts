import { PropsWithChildren } from "react";

/**
 * width: Carousel Item의 width
 * viewCount: Carousel에서 한번에 보여줄 item 갯수
 * infinite: 무한 슬라이드 적용 여부. defalut = false
 */
export type CarouselProps = {
  width: number;
  viewCount: number;
  infinite?: boolean;
  auto?: boolean;
  autoTimer?: number;
  paging?: boolean;
} & PropsWithChildren;
