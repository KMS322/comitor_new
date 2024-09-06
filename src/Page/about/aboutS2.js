import "../../CSS/about.css";
import "../../CSS/about_mobile.css";
const AboutS2 = () => {
  return (
    <div className="about_s2">
      <p className="title">
        ABOUT OUR
        <br />
        <span>Key value.</span>
      </p>
      <p className="content1">더우분투가 지켜 나갈 핵심가치</p>
      <p id="pc" className="content2">
        더우분투가 가지는 핵심가치는 함께하는 것에 있습니다.
        <br />
        반려동물과 사람이 함께하는 공간인 자연에 공헌하는 것을 궁극적인 목표로
        삼고 있습니다.
      </p>
      <p id="mobile" className="content2">
        더우분투가 가지는 핵심가치는 함께하는 것에 있습니다.
        <br />
        반려동물과 사람이 함께하는 공간인 자연에 공헌하는 것을
        <br />
        궁극적인 목표로 삼고 있습니다.
      </p>
      <img id="pc" src="/images/about/s2_img.png" alt="" />
      <img id="mobile" src="/images/about/s2_img_mobile.jpg" alt="" />
      <div className="article">
        <p>
          <span>함</span>께하는 가치를 위하여
          <br />
          더우분투는 우리가 있기에
          <br />
          내가 있다는 슬로건 아래 함께하는
          <br /> “우리”의 가치를 먼저 생각합니다.
          <br />
          최고의 제품과 서비스를
          <br />
          창출하여 고객에게 최고의 만족을
          <br />
          줄수있는 제품과 서비스 제공을
          <br />
          목표로 자연환경에 공헌하기 위해
          <br /> 노력 합니다.
          <br />
          제품 력에 최선을 다합니다.
          <br />
          자연환경을 위해 Vegan, Cruelty Free
          <br /> 제품을 생산합니다.
        </p>
      </div>
    </div>
  );
};

export default AboutS2;
