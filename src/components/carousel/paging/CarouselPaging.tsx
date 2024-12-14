import { css } from "@emotion/react";
import styled from "@emotion/styled";

type Props = {
  moveCount: number;
  pageCount: number;
  handleChangeMoveCount: (num: number) => void;
};

export default function CarouselPaging({
  moveCount,
  pageCount,
  handleChangeMoveCount,
}: Props) {
  return (
    <PagingStyled>
      {Array.from({ length: pageCount }).map((_, i) => {
        return <PagingItem key={i} onClick={() => handleChangeMoveCount(i)} />;
      })}
    </PagingStyled>
  );
}

const PagingStyled = styled.ul`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const PagingItem = styled.li``;
