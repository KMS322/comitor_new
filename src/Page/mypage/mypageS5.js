import "../../CSS/mypage.css";
import "../../CSS/mypage_mobile.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LOAD_COUPON_LISTS_REQUEST,
  LOAD_COUPON_REQUEST,
} from "../../reducers/coupon";
const MypageS5 = ({ userId }) => {
  const dispatch = useDispatch();
  const { couponLists, coupons } = useSelector((state) => state.coupon);

  useEffect(() => {
    dispatch({
      type: LOAD_COUPON_LISTS_REQUEST,
      data: { userId },
    });
  }, [dispatch]);
  useEffect(() => {
    dispatch({
      type: LOAD_COUPON_REQUEST,
    });
  }, [dispatch]);
  const removeDuplicatesById = (lists) => {
    if (!lists || !Array.isArray(lists)) {
      return [];
    }
    const uniqueLists = [];
    const existingIds = [];

    for (const list of lists) {
      if (list && list.id && !existingIds.includes(list.id)) {
        uniqueLists.push(list);
        existingIds.push(list.id);
      }
    }

    return uniqueLists;
  };
  const uniqueLists = removeDuplicatesById(couponLists);
  const uniqueCoupons = removeDuplicatesById(coupons);

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
          {uniqueLists &&
            uniqueLists.map((list, index) => {
              const coupon = uniqueCoupons.find(
                (item) => item.coupon_id === list.coupon_id
              );
              return (
                <div className="content" key={index}>
                  <img />
                  <div className="item_box">
                    <img
                      src={`/images/coupon/${coupon.coupon_imgUrl}`}
                      alt=""
                    />
                    <p>{coupon.coupon_name}</p>
                  </div>
                  <div className="price_box">
                    <p>
                      {coupon && coupon.coupon_percent === 0
                        ? `${coupon && coupon.coupon_price.toLocaleString()}원 `
                        : `${coupon && coupon.coupon_percent}% `}
                      할인
                    </p>
                  </div>
                </div>
              );
            })}
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
