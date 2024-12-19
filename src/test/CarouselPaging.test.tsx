import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CarouselPaging from "../components/carousel/paging/CarouselPaging";

describe("CarouselPaging Component", () => {
  const mockHandleChangeMoveCount = vi.fn();

  it("입력한 페이지버튼 갯수만큼 출력이 되는가?", () => {
    render(
      <CarouselPaging
        moveCount={0}
        pageCount={5}
        handleChangeMoveCount={mockHandleChangeMoveCount}
      />
    );

    const pagingItems = screen.getAllByRole("listitem");
    expect(pagingItems).toHaveLength(5);
  });

  it("현재 위치의 페이지버튼의 스케일이 조정되는가?", () => {
    render(
      <CarouselPaging
        moveCount={2}
        pageCount={5}
        handleChangeMoveCount={mockHandleChangeMoveCount}
      />
    );

    const pagingItems = screen.getAllByRole("listitem");
    expect(pagingItems[2]).toHaveStyle("transform: scale(1.5)");
  });

  it("클릭한 페이지버튼이 올바르게 호출되는가?", () => {
    render(
      <CarouselPaging
        moveCount={0}
        pageCount={3}
        handleChangeMoveCount={mockHandleChangeMoveCount}
      />
    );

    const pagingItems = screen.getAllByRole("listitem");
    fireEvent.click(pagingItems[1]);
    expect(mockHandleChangeMoveCount).toHaveBeenCalledWith(1);
  });

  it("페이지 count가 0일때 item이 생성되지 않는가?", () => {
    render(
      <CarouselPaging
        moveCount={0}
        pageCount={0}
        handleChangeMoveCount={mockHandleChangeMoveCount}
      />
    );

    const pagingItems = screen.queryAllByRole("listitem");
    expect(pagingItems).toHaveLength(0);
  });
});
