import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../CSS/mypage.css";
import "../../CSS/mypage_mobile.css";
const MypageS3 = () => {
  const navigate = useNavigate();
  const [cartProducts, setCartProducts] = useState([
    {
      id: 1,
      name: `코미토르 밸런스 펫 세럼<br />강아지 발습진 발사탕 피부병 보습제`,
      name_mobile: `코미토르 밸런스 펫 세럼 강아지 발습진 발사탕 피부병 보습제`,
      imageUrl: "/images/product/product_img1.jpg",
      price: 17900,
      originPrice: 26000,
      cnt: 1,
      checked: true,
    },
    {
      id: 2,
      name: `코미토르 밸런스 펫 세럼<br />강아지 발습진 발사탕 피부병 보습제 2개`,
      name_mobile: `코미토르 밸런스 펫 세럼 강아지 발습진 발사탕 피부병 보습제 2개`,
      imageUrl: "/images/product/product_img2.jpg",
      price: 34900,
      originPrice: 52000,
      cnt: 1,
      checked: true,
    },
  ]);
  const cancelProduct = (productID) => {
    const updatedCartProducts = cartProducts.filter(
      (product) => product.id !== productID
    );
    setCartProducts(updatedCartProducts);
  };

  const toggleChecked = (productId) => {
    setCartProducts((prevCartProducts) => {
      return prevCartProducts.map((product) => {
        if (product.id === productId) {
          return { ...product, checked: !product.checked };
        }
        return product;
      });
    });
  };

  const toggleAllChecked = () => {
    setCartProducts((prevCartProducts) => {
      const allChecked = prevCartProducts.every((product) => product.checked);
      return prevCartProducts.map((product) => ({
        ...product,
        checked: !allChecked,
      }));
    });
  };

  const deleteSelectedProducts = () => {
    const updatedCartProducts = cartProducts.filter(
      (product) => !product.checked
    );
    setCartProducts(updatedCartProducts);
  };
  return (
    <div className="mypage_s3">
      <div id="pc" className="section_container">
        <p>장바구니</p>
        <div className="article_container">
          <div className="title">
            <img
              src={
                cartProducts.every((product) => product.checked)
                  ? "/images/mypage/check_full.png"
                  : "/images/mypage/check_empty.png"
              }
              alt=""
              onClick={toggleAllChecked}
            />
            <p>상품정보</p>
            <p>상품금액</p>
            <p>수량</p>
            <p>주문금액</p>
            <p>배송 형태/배송비</p>
            <p></p>
          </div>
          {cartProducts.map((cartProduct, index) => {
            return (
              <div className="content">
                <img
                  src={
                    cartProduct.checked
                      ? "/images/mypage/check_full.png"
                      : "/images/mypage/check_empty.png"
                  }
                  alt=""
                  onClick={() => toggleChecked(cartProduct.id)}
                />
                <div className="item_box">
                  <img src={cartProduct.imageUrl} alt="" />
                  <p dangerouslySetInnerHTML={{ __html: cartProduct.name }}></p>
                </div>
                <div className="price_box">
                  <p>{cartProduct.originPrice.toLocaleString()}</p>
                  <p>{cartProduct.price.toLocaleString()}원</p>
                </div>
                <div className="count_box">
                  <div
                    onClick={() => {
                      if (cartProduct.cnt > 1) {
                        const updatedCartProducts = [...cartProducts];
                        updatedCartProducts[index].cnt--;
                        setCartProducts(updatedCartProducts);
                      }
                    }}
                  >
                    <img src="/images/product/minus_icon.png" alt="" />
                  </div>
                  <div>{cartProduct.cnt}</div>
                  <div
                    onClick={() => {
                      const updatedCartProducts = [...cartProducts];
                      updatedCartProducts[index].cnt++;
                      setCartProducts(updatedCartProducts);
                    }}
                  >
                    <img src="/images/product/plus_icon.png" alt="" />
                  </div>
                </div>
                <p>{cartProduct.price.toLocaleString()}원</p>
                <div className="delivery_box">
                  <p>택배배송</p>
                  <p>배송비 무료</p>
                </div>
                <div className="pay_box">
                  <div
                    onClick={() => {
                      navigate("/pay", {
                        state: { cartProducts, id: cartProduct.id },
                      });
                    }}
                  >
                    결제하기
                  </div>
                  <div onClick={() => cancelProduct(cartProduct.id)}>취소</div>
                </div>
              </div>
            );
          })}

          <div className="delete_btn" onClick={deleteSelectedProducts}>
            선택 삭제
          </div>
          <div className="pay_btn">결제하기</div>
        </div>
      </div>
      <div id="mobile" className="article_container">
        <p>장바구니</p>
        <div className="row_head">
          <p>상품정보</p>
          <p>상품금액</p>
          <div>
            <p>주문금액</p>
            <p>배송형태/배송비</p>
          </div>
          <p>수량</p>
        </div>
        <div className="row_name">
          <img src="/images/mypage/check_box_full.png" alt="" />
          <p>코미토르 밸런스 펫 세럼 강아지 발사탕 피부병 보습제</p>
        </div>
        <div className="row_content">
          <img src="/images/product/product1.png" alt="" />
          <div className="price_box">
            <p>34,900원</p>
            <p>34,900원</p>
          </div>
          <div className="delivery_box">
            <p>34,900원</p>
            <p>택배배송/배송비무료</p>
          </div>
          <div className="count_box">
            <div>-</div>
            <div>1</div>
            <div>+</div>
          </div>
        </div>
        <div className="row_name">
          <img src="/images/mypage/check_box_empty.png" alt="" />
          <p>코미토르 밸런스 펫 세럼 강아지 발사탕 피부병 보습제</p>
        </div>
        <div className="row_content">
          <img src="/images/product/product1.png" alt="" />
          <div className="price_box">
            <p>34,900원</p>
            <p>34,900원</p>
          </div>
          <div className="delivery_box">
            <p>34,900원</p>
            <p>택배배송/배송비무료</p>
          </div>
          <div className="count_box">
            <div>-</div>
            <div>1</div>
            <div>+</div>
          </div>
        </div>
        <div className="btn_box">
          <div className="btn">결제하기</div>
          <div className="btn">선택 삭제</div>
        </div>
      </div>
    </div>
  );
};

export default MypageS3;
