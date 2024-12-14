import styled from "@emotion/styled";

type Props = {
  viewCount: number;
  pageCount: number;
  handleChangeMoveCount: (num: number) => void;
};

export default function CarouselPaging({
  viewCount,
  pageCount,
  handleChangeMoveCount,
}: Props) {
  return (
    <PagingStyled>
      {/* infinite slider로 길어진 길이만큼 제거 후 숫자 배열 생성*/}
      {Array.from(
        { length: pageCount - viewCount - viewCount },
        (_, i) => viewCount + i
      ).map((num, i) => {
        return (
          <PagingItem key={i} onClick={() => handleChangeMoveCount(num)}>
            {num}
          </PagingItem>
        );
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
