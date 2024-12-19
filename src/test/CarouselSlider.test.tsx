import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CarouselSlider from "../components/carousel/common/CarouselSlider";

describe("CarouselSlider Component", () => {
  const mockHandlePrev = vi.fn();
  const mockHandleNext = vi.fn();
  const mockHandleDelete = vi.fn();

  const defaultProps = {
    width: 300,
    moveCount: 0,
    transition: 300,
    viewCount: 3,
    handlePrev: mockHandlePrev,
    handleNext: mockHandleNext,
    handleDelete: mockHandleDelete,
  };

  it("Slider 내부에 생성한 아이템들이 정상적으로 렌더링 되는가?", () => {
    render(
      <CarouselSlider {...defaultProps}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </CarouselSlider>
    );

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("Item 3")).toBeInTheDocument();
  });

  it("드래그시 prev 이벤트가 제대로 실행되는가?", () => {
    render(
      <CarouselSlider {...defaultProps}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </CarouselSlider>
    );

    const sliderWrapper = screen.getByTestId("slider-wrapper");
    fireEvent.mouseDown(sliderWrapper, { clientX: 100 });
    fireEvent.mouseUp(sliderWrapper, { clientX: 150 });
    expect(mockHandlePrev).toHaveBeenCalled();
  });

  it("드래그시 next 이벤트가 제대로 실행되는가?", () => {
    render(
      <CarouselSlider {...defaultProps}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </CarouselSlider>
    );

    const sliderWrapper = screen.getByTestId("slider-wrapper");
    fireEvent.mouseDown(sliderWrapper, { clientX: 100 });
    fireEvent.mouseUp(sliderWrapper, { clientX: 50 });
    expect(mockHandleNext).toHaveBeenCalled();
  });

  it("터치 후 오른쪽으로 이동 시 prev 이벤트가 제대로 실행되는가?", () => {
    render(
      <CarouselSlider {...defaultProps}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </CarouselSlider>
    );

    const sliderWrapper = screen.getByTestId("slider-wrapper");

    fireEvent.touchStart(sliderWrapper, { touches: [{ clientX: 100 }] });
    fireEvent.touchEnd(sliderWrapper, {
      changedTouches: [{ clientX: 150 }],
    });
    expect(mockHandlePrev).toHaveBeenCalled();
  });

  it("터치 후 왼쪽으로 이동 시 next 이벤트가 제대로 실행되는가?", () => {
    render(
      <CarouselSlider {...defaultProps}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </CarouselSlider>
    );

    const sliderWrapper = screen.getByTestId("slider-wrapper");

    fireEvent.touchStart(sliderWrapper, { touches: [{ clientX: 100 }] });
    fireEvent.touchEnd(sliderWrapper, {
      changedTouches: [{ clientX: 50 }],
    });
    expect(mockHandleNext).toHaveBeenCalled();
  });

  it("isFocus option이 제대로 동작하고 있는가?", () => {
    render(
      <CarouselSlider {...defaultProps} isFocus>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </CarouselSlider>
    );

    const sliderWrapper = screen.getByTestId("slider-wrapper");

    // focus 옵션이 지정되면 현재 moveCount의 다음 아이템의 scale 1이고 양 옆의 아이템은 0.9여야 정상 동작.
    expect(sliderWrapper.childNodes[0]).toHaveStyle("transform: scale(0.9)");
    expect(sliderWrapper.childNodes[1]).not.toHaveStyle(
      "transform: scale(0.9)"
    );
    expect(sliderWrapper.childNodes[2]).toHaveStyle("transform: scale(0.9)");
  });
});
