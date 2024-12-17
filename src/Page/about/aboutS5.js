import "../../CSS/about.css";
import "../../CSS/about_mobile.css";

const AboutS5 = () => {
  return (
    <div className="about_s5">
      <div className="article_container">
        <div className="article">
          <p>Comitor With vegan</p>
          <div className="text_container">
            <p className="title">“ 완전 채식주의 (VEGAN) 펫 스킨케어 ”</p>
            <p id="pc" className="content">
              코미토르는 100% 비건 펫 스킨케어로 높은 품질의 식물성 원료를
              <br />
              사용하여 제품을 만들며 일체의 동물성 원료를 사용하지 않은 포뮬러로
              <br />
              저탄소 친환경 브랜드 입니다. 야생 동물들이 자연 그대로 야생에서
              <br />
              치유받듯, 우리는 자연으로부터 얻은 착한 성분의 힘을 믿습니다.
              <br />
              일체의 동물성원료없이 오롯이 자연 그대로를 담은 자연 유래 성분을
              <br />
              찾아 나서고 이를 제품으로 만들기 위해 노력합니다.
            </p>
            <p id="mobile" className="content">
              코미토르는 100% 비건 펫 스킨케어로 높은 품질의
              <br />
              식물성 원료를 사용하여 제품을 만들며 일체의 동물성 원료를
              <br />
              사용하지 않은 포뮬러로 저탄소 친환경 브랜드 입니다.
              <br />
              야생 동물들이 자연 그대로 야생에서 치유받듯, 우리는
              <br />
              자연으로부터 얻은 착한 성분의 힘을 믿습니다.
              <br />
              일체의 동물성원료없이 오롯이 자연 그대로를
              <br />
              담은 자연 유래 성분을 찾아 나서고 이를 제품으로
              <br />
              만들기 위해 노력합니다.
            </p>
          </div>
        </div>
        <img src="/images/about/s5_img.png" alt="" />
      </div>
    </div>
  );
};

export default AboutS5;
