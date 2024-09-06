import { useNavigate } from "react-router-dom";
import "../../CSS/payComplete.css";
import "../../CSS/payComplete_mobile.css";
const PayCompleteContent = () => {
  const navigate = useNavigate();
  const goPage = (path) => {
    navigate(path);
  };
  return (
    <div className="complete_s1">
      <div className="article_container">
        <div className="article">
          <img src="/images/cart/cart_img1_empty.png" alt="" />
          <p>장바구니</p>
        </div>
        <div className="article">
          <img src="/images/cart/cart_img2_empty.png" alt="" />
          <p>주문하기</p>
        </div>
        <div className="article">
          <img src="/images/cart/cart_img3_full.png" alt="" />
          <p>주문완료</p>
        </div>
      </div>
      <p>주문해주셔서 감사합니다!</p>
      <div
        className="home_btn"
        onClick={() => {
          goPage("/");
        }}
      >
        홈으로 가기
      </div>
    </div>
  );
};

export default PayCompleteContent;
