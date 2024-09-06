import "../../CSS/about.css";
import "../../CSS/about_mobile.css";
const AboutS1 = () => {
  return (
    <div className="about_s1">
      <img src="/images/about/logo_ubunt.png" alt="" />
      <div className="article_container">
        <div className="article">
          <p className="title">
            ABOUT OUR
            <br />
            <span>philosoph.</span>
          </p>
          <p className="content1">“I am because we are”</p>
          <p className="content2">
            더우분투의 철학은 우리가 있기에 내가 있다는 슬로건 아래 함께하는
            <br />
            우리의 가치를 가장 먼저 중요하게 생각하고
            <br />
            나 혼자의 행복이 아닌, 함께하는 우리의 행복을 지향하며,
            <br />
            반려동물과 사람이 함께하는 공간인 소중한 자연을
            <br />
            지속 할 수 있도록 지속 가능한 제품을 생산하고 있습니다.
          </p>
        </div>
        <img src="/images/about/s1_img.png" alt="" />
      </div>
    </div>
  );
};

export default AboutS1;
