import "../CSS/couponLists.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LOAD_COUPON_REQUEST,
  GIVE_COUPON_REQUEST,
  LOAD_COUPON_LISTS_REQUEST,
} from "../reducers/coupon";
const CouponLists = ({ handleLists, user }) => {
  console.log("user : ", user);
  const userId = user;
  const dispatch = useDispatch();
  const { coupons, giveCouponDone, couponLists } = useSelector(
    (state) => state.coupon
  );
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
  const uniqueCoupons = removeDuplicatesById(coupons);
  const uniqueLists = removeDuplicatesById(couponLists);
  console.log("uniqueLists : ", uniqueLists);
  console.log("uniqueCoupons : ", uniqueCoupons);
  const giveCoupon = (couponId) => {
    dispatch({
      type: GIVE_COUPON_REQUEST,
      data: { couponId, user },
    });
  };
  useEffect(() => {
    dispatch({
      type: LOAD_COUPON_REQUEST,
    });
  }, [dispatch]);
  useEffect(() => {
    dispatch({
      type: LOAD_COUPON_LISTS_REQUEST,
      data: { userId },
    });
  }, [dispatch]);
  useEffect(() => {
    if (giveCouponDone) {
      handleLists(false);
      window.location.href = "/adminUsers";
    }
  }, [giveCouponDone]);
  const specificCoupon = uniqueCoupons.filter(
    (coupon) => coupon.coupon_type !== "all"
  );
  const newUniqueLists = specificCoupon.filter(
    (item) => !uniqueLists.some((coupon) => coupon.coupon_id === item.coupon_id)
  );
  console.log("newUniqueLists : ", newUniqueLists);
  return (
    <div className="couponLists">
      <div
        className="delete_btn"
        onClick={() => {
          handleLists(false);
        }}
      >
        X
      </div>
      <p>쿠폰 리스트</p>
      {newUniqueLists.length === 0 ? (
        <>
          <p className="noCoupon">지급 가능한 쿠폰이 없습니다.</p>
        </>
      ) : (
        ""
      )}
      {newUniqueLists &&
        newUniqueLists.map((coupon, index) => {
          return (
            <div className="coupon_box" key={index}>
              <p>{index + 1}.</p>
              <p>{coupon.coupon_name}</p>
              <div
                className="give_btn"
                onClick={() => {
                  giveCoupon(coupon.coupon_id);
                }}
              >
                지급하기
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default CouponLists;
