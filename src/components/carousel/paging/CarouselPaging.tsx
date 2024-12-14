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
        return (
          <PagingItem
            key={i}
            $active={i === moveCount}
            onClick={() => handleChangeMoveCount(i)}
          />
        );
      })}
    </PagingStyled>
  );
}

const PagingStyled = styled.ul`
  display: flex;
  justify-content: center;
  gap: 15px;
`;

const PagingItem = styled.li<{ $active: boolean }>`
  width: 8px;
  height: 8px;
  background-color: #66d4ff;
  border-radius: 90%;
  cursor: pointer;
  transition: 0.1s;

  ${({ $active }) =>
    $active &&
    css`
      transform: scale(1.5);
    `}
`;
