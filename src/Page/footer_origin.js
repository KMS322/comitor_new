import { useNavigate } from "react-router-dom";
import "../CSS/footer.css";
import "../CSS/footer_mobile.css";
const Footer = () => {
  const navigate = useNavigate();
  const goPage = (path) => {
    navigate(path);
  };
  return (
    <div className="footer_container">
      <div className="footer">
        <div className="article1">
          <p>경상북도 경산시 하양읍 하양로 13-13, 창업보육센터동 505호</p>
          <p>+82 10 - 7276 - 6296</p>
          <p>ubuntu0516@naver.com</p>
          <p>ubuntu0516@gmail.com</p>
        </div>
        <div
          className="logo"
          onClick={() => {
            goPage("/");
          }}
        >
          <img src="/images/logo_white.png" alt="" />
        </div>
        <div className="article2">
          <p>Copyright ©comitor.All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
