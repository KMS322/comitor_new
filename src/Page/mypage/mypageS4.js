import { useState } from "react";
import "../../CSS/mypage.css";
import "../../CSS/mypage_mobile.css";
const MypageS4 = () => {
  const [likedProducts, setLikedProducts] = useState([
    {
      id: 1,
      name: `코미토르 밸런스 펫 세럼<br />강아지 발습진 발사탕 피부병 보습제`,
      imageUrl: "/images/product/product_img1.jpg",
      price: 17900,
      originPrice: 26000,
      cnt: 1,
    },
  ]);
  if (likedProducts === null) {
    setLikedProducts({
      id: 1,
      name: `코미토르 밸런스 펫 세럼<br />강아지 발습진 발사탕 피부병 보습제`,
      imageUrl: "/images/product/product_img1.jpg",
      price: 17900,
      originPrice: 26000,
      cnt: 1,
    });
  }
  const [liked, setLiked] = useState(true);
  return (
    <div className="mypage_s4">
      <div id="pc" className="section_container">
        <p>좋아요</p>
        <div className="article_container">
          <div className="title">
            <p></p>
            <p>상품정보</p>
            <p>상품금액</p>
            <p></p>
          </div>
          {likedProducts.map((likedProduct, index) => {
            return (
              <div className="content" key={index}>
                <img
                  src={
                    liked
                      ? "/images/mypage/heart_full.png"
                      : "/images/mypage/heart_empty.png"
                  }
                  alt=""
                  onClick={() => {
                    setLiked(!liked);
                  }}
                />
                <div className="item_box">
                  <img src={likedProduct.imageUrl} alt="" />
                  <p
                    dangerouslySetInnerHTML={{ __html: likedProduct.name }}
                  ></p>
                </div>
                <div className="price_box">
                  <p>{likedProduct.originPrice.toLocaleString()}원</p>
                  <p>{likedProduct.price.toLocaleString()}원</p>
                </div>
                <div className="put_btn">장바구니 담기</div>
              </div>
            );
          })}
        </div>
      </div>
      <div id="mobile" className="article_container">
        <p>좋아요</p>
        <div className="article">
          <img src="/images/mypage/heart_full.png" alt="" />
          <div className="text_box">
            <p>
              코미토르 밸런스 펫 세럼
              <br />
              강아지 발사탕 피부병 보습제
            </p>
            <p>34,900원</p>
            <p>34,900원</p>
          </div>
          <img src="/images/product/product1.png" alt="" />
        </div>
        <div className="btn">장바구니 담기</div>
      </div>
    </div>
  );
};

export default MypageS4;
