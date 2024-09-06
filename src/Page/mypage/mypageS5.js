import "../../CSS/mypage.css";
import "../../CSS/mypage_mobile.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_COUPON_REQUEST } from "../../reducers/coupon";
const MypageS5 = () => {
  const dispatch = useDispatch();
  const { coupons } = useSelector((state) => state.coupon);

  useEffect(() => {
    dispatch({
      type: LOAD_COUPON_REQUEST,
    });
  }, [dispatch]);
  return (
    <div className="mypage_s5">
      <div id="pc" className="section_container">
        <p>쿠폰 내역</p>
        <div className="article_container">
          <div className="title">
            <p></p>
            <p>쿠폰이름</p>
            <p>할인혜택</p>
            <p></p>
          </div>
          <div className="content">
            <img />
            <div className="item_box">
              <img
                src={`/images/coupon/${
                  coupons.length > 0 && coupons[0].coupon_imgUrl
                }`}
                alt=""
              />
              <p>{coupons.length > 0 && coupons[0].coupon_name}</p>
            </div>
            <div className="price_box">
              <p>
                {coupons.length > 0 && coupons[0].coupon_percent === 0
                  ? `${
                      coupons.length > 0 &&
                      coupons[0].coupon_price.toLocaleString()
                    }원 `
                  : `${coupons.length > 0 && coupons[0].coupon_percent}% `}
                할인
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <div id="mobile" className="article_container">
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
      </div> */}
    </div>
  );
};

export default MypageS5;
