import styled from "@emotion/styled";

export const CarouselWrapper = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 10px;
`;

export const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  height: 100%;
  align-items: center;
`;

type StyledProps = {
  width: string;
};

export const CarouselStyled = styled.div<StyledProps>`
  display: flex;
  width: ${(props) => props.width};
  height: 100%;
  overflow: hidden;
`;

export const ArrowWrapper = styled.div`
  width: 30px;
  cursor: pointer;
`;
