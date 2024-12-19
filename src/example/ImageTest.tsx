import styled from "@emotion/styled";
import { Carousel } from "../components/carousel/Carousel";
import Card1 from "../assets/card1.png";
import Card2 from "../assets/card2.png";
import Card3 from "../assets/card3.png";
import Card4 from "../assets/card4.png";
import Card5 from "../assets/card5.png";
import Card6 from "../assets/card6.png";
import Card7 from "../assets/card7.png";
import Card8 from "../assets/card8.png";
import Card9 from "../assets/card9.png";
import Card10 from "../assets/card10.png";

export default function ImageTest() {
  return (
    <ViewStyled>
      <CarouselWrapper>
        <Carousel width={200} viewCount={3} autoTimer={1000}>
          <Image src={Card1} alt="card1" />
          <Image src={Card2} alt="card2" />
          <Image src={Card3} alt="card3" />
          <Image src={Card4} alt="card4" />
          <Image src={Card5} alt="card5" />
          <Image src={Card6} alt="card6" />
          <Image src={Card7} alt="card7" />
          <Image src={Card8} alt="card8" />
          <Image src={Card9} alt="card9" />
          <Image src={Card10} alt="card10" />
        </Carousel>
      </CarouselWrapper>
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

const CarouselWrapper = styled.div`
  height: 300px;
`;

const Image = styled.img`
  height: 300px;
  background-color: red;
`;
