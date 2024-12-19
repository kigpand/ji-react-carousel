import styled from "@emotion/styled";
import { Carousel } from ".";

export default function View() {
  return (
    <ViewStyled>
      <CarouselStyled>
        <Carousel width={200} viewCount={3}>
          <div style={{ width: "200px", background: "blue" }}>asd</div>
          <div style={{ width: "200px", background: "green" }}>ges</div>
          <div style={{ width: "200px", background: "pink" }}>ges</div>
          <div style={{ width: "200px", background: "yellow" }}>ges</div>
          <div style={{ width: "200px", background: "orange" }}>ges</div>
        </Carousel>
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
  height: 200px;
`;
