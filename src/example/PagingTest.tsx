import styled from "@emotion/styled";
import { PagingCarousel } from "../components/carousel/PagingCarousel";

export default function PagingTest() {
  return (
    <ViewStyled>
      <CarouselStyled>
        <PagingCarousel width={300}>
          <div style={{ height: "100%", background: "blue" }}>수수수</div>
          <div style={{ height: "100%", background: "green" }}>수퍼노바</div>
          <div style={{ height: "100%", background: "pink" }}>암온더</div>
          <div style={{ height: "100%", background: "yellow" }}>넥스트</div>
          <div style={{ height: "100%", background: "orange" }}>뤠뷀</div>
          <div style={{ height: "100%", background: "black" }}>저</div>
          <div style={{ height: "100%", background: "skyblue" }}>너머의</div>
          <div style={{ height: "100%", background: "purple" }}>문을</div>
          <div style={{ height: "100%", background: "lightgray" }}>열어</div>
          <div style={{ height: "100%", background: "gray" }}>넥스트 뤠뷀</div>
        </PagingCarousel>
      </CarouselStyled>
    </ViewStyled>
  );
}

const ViewStyled = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CarouselStyled = styled.div`
  height: 350px;
`;
