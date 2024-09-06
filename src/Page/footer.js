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
      <div className="article_container1">
        <div className="article">
          <p>CUSTOMER CENTER</p>
          <p>070-8790-05816</p>
          <p>평일 오전 09:00 - 18:00</p>
          <p>토/ 일/ 공휴일 휴무</p>
        </div>
        <div className="article">
          <p>COMPANY INFO</p>
          <p>company (주)더우분투 owner 나도연</p>
          <p>
            address : 경상북도 경산시 하양읍 하양로 13-13, 창업보육센터동 505호
          </p>
          <p>Mail : ubuntu0516@naver.com</p>
        </div>
        <div className="article">
          <p>RETURN & EXCHANGE</p>
          <p>
            ㈜더우분투 – 경상북도 경산시 하양읍 하양로 13-13, 창업보육센터동
            505호
          </p>
          <p>지정택배사로 반품요청해주세요.</p>
        </div>
        <div className="article">
          <p>BANK INFO</p>
          <p>국민은행 : 625501-04-260361</p>
          <p>예금주 : ㈜더우분투</p>
        </div>
      </div>
      <div className="article_container2">
        <div className="article">
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
        <div className="article">
          <p>Copyright ©comitor.All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
