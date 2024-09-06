import { useNavigate } from "react-router-dom";
import "../../CSS/cart.css";
import "../../CSS/cart_mobile.css";
const CartS1 = () => {
  const navigate = useNavigate();
  return (
    <div className="cart_s1">
      <div className="article_container">
        <div className="article">
          <img src="/images/cart/cart_img1_full.png" alt="" />
          <p>장바구니</p>
        </div>
        <div className="article">
          <img src="/images/cart/cart_img2_empty.png" alt="" />
          <p>주문하기</p>
        </div>
        <div className="article">
          <img src="/images/cart/cart_img3_empty.png" alt="" />
          <p>주문완료</p>
        </div>
      </div>
    </div>
  );
};

export default CartS1;
