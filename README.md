## ji-react-carousel
### React 컴포넌트를 요소로 받아 간단한 Carousel을 만들어 주는 라이브러리입니다.
![carousel-gif](https://github.com/user-attachments/assets/f4be868f-5362-448e-aa6b-1eb251827568)
#### 주요기능
- infinite: 좌우 스크롤이 끝나지 않고 무한정 동작하는 Carousel 기능을 제공합니다.
- auto & autoTimer: autoTimer로 원하는 시간을 지정하여 자동으로 스크롤되는 Carousel 기능을 제공합니다.
- paging: pagination 기능을 제공하는 Carousel을 제공합니다.
- focus: Carousel에서 강조되는 효과를 제공합니다

## Get Started
```
npm install ji-react-carousel
```

## 구성 및 옵션
#### Carousel
기본적인 Carousel Component
```javascript
<Carousel width={200} viewCount={3}>
  <div style={{ height: "100%", background: "blue" }}>1</div>
  <div style={{ height: "100%", background: "green" }}>2</div>
  <div style={{ height: "100%", background: "pink" }}>3</div>
  <div style={{ height: "100%", background: "yellow" }}>4</div>
  <div style={{ height: "100%", background: "orange" }}>5</div>
</Carousel>
```
options
```
width: Carousel Item의 넓이
viewCount: Carousel에서 한번에 보여줄 item의 갯수
infinite: 무한 슬라이드 on/off 옵션. default = false
auto: 자동 슬라이드 on/off 옵션. default = false
autoTimer: 자동 슬라이드 타이머. default = 3000
```
#### FocusCarousel
강조되는 아이템이 나오는 Carousel Component
```javascript
<FocusCarousel width={300}>
  <div style={{ height: "100%", background: "blue" }}>1</div>
  <div style={{ height: "100%", background: "green" }}>2</div>
  <div style={{ height: "100%", background: "pink" }}>3</div>
  <div style={{ height: "100%", background: "yellow" }}>4</div>
  <div style={{ height: "100%", background: "orange" }}>5</div>
</FocusCarousel>
```
options
```
width: Carousel Item의 넓이
auto: 자동 슬라이드 on/off 옵션. default = false
autoTimer: 자동 슬라이드 타이머. default = 3000
```
#### PagingCarousel
페이지버튼과 연동되는 Carousel Component
```javascript
<PagingCarousel width={300}>
  <div style={{ height: "100%", background: "blue" }}>1</div>
  <div style={{ height: "100%", background: "green" }}>2</div>
  <div style={{ height: "100%", background: "pink" }}>3</div>
  <div style={{ height: "100%", background: "yellow" }}>4</div>
  <div style={{ height: "100%", background: "orange" }}>5</div>
</PagingCarousel>
```
options
```
width: Carousel Item의 넓이
auto: 자동 슬라이드 on/off 옵션. default = false
autoTimer: 자동 슬라이드 타이머. default = 3000
```

## License
Distributed under the Unlicense License. See LICENSE.txt for more information.
