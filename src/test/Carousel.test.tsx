import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Carousel } from "../components/carousel/Carousel";

describe("Carousel Component", () => {
  const mockChildren = [
    <div key="1">Item 1</div>,
    <div key="2">Item 2</div>,
    <div key="3">Item 3</div>,
  ];

  const defaultProps = {
    width: 300,
    viewCount: 1,
    infinite: false,
    auto: false,
    autoTimer: 3000,
  };

  it("Carousel이 제대로 렌더링 되는가?", () => {
    render(<Carousel {...defaultProps}>{mockChildren}</Carousel>);

    // 자식 요소가 올바르게 렌더링되었는지 확인
    const items = screen.getAllByText(/Item/i);
    expect(items).toHaveLength(mockChildren.length);
  });

  it("첫 렌더링시 left arrow는 보이지 않고 right arrow만 보이는가?", () => {
    render(<Carousel {...defaultProps}>{mockChildren}</Carousel>);

    // leftArrow 내부에서 on/off를 하기 때문에 초기화시 leftArrow의 children의 개수는 0이어먀 맞음.
    const leftArrow = screen.getByTestId("left-arrow");
    expect(leftArrow.childNodes.length).toBe(0);

    // 우측 화살표가 보이는지 확인
    const rightArrow = screen.getByTestId("right-arrow");
    expect(rightArrow.childNodes[0]).toBeInTheDocument();
  });

  it("infinite 옵션 적용시 양쪽 arrow가 모두 보이는가?", () => {
    render(
      <Carousel {...defaultProps} infinite>
        {mockChildren}
      </Carousel>
    );

    const leftArrow = screen.getByTestId("left-arrow");
    const rightArrow = screen.getByTestId("right-arrow");

    expect(leftArrow.childNodes[0]).toBeInTheDocument();
    expect(rightArrow.childNodes[0]).toBeInTheDocument();
  });

  it("infinite 옵션 적용시 Carousel이 첫 시작점으로 돌아가는가?", () => {
    render(
      <Carousel {...defaultProps} infinite>
        {mockChildren}
      </Carousel>
    );

    const leftArrow = screen.getByTestId("left-arrow");
    const rightArrow = screen.getByTestId("right-arrow");

    fireEvent.click(rightArrow);
    fireEvent.click(rightArrow);

    const items = screen.getAllByText(/Item/i);
    expect(items[0]).toBeInTheDocument();

    fireEvent.click(leftArrow);
    expect(items[2]).toBeInTheDocument();
  });

  it("timer 옵션이 정상 동작 하는가?", async () => {
    vi.useFakeTimers(); // 가상의 타이머

    render(
      <Carousel {...defaultProps} auto>
        {mockChildren}
      </Carousel>
    );

    // 시간이 지남에 따라 자동으로 슬라이드가 이동하는지 확인
    const items = screen.getAllByText(/Item/i);
    expect(items[0]).toBeInTheDocument();

    vi.advanceTimersByTime(3000); // 3초 경과
    expect(items[1]).toBeInTheDocument();

    vi.useRealTimers(); // 타이머 복원
  });
});
