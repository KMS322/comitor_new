import "../CSS/adminCoupons.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import AdminSubHeader from "./adminSubHeader";
import CouponUpload from "./couponUpload";
import { LOAD_COUPON_REQUEST, DELETE_COUPON_REQUEST } from "../reducers/coupon";

const AdminCoupon = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const me = location.state && location.state.me;
  const [openForm, setOpenForm] = useState(false);
  const { coupons, deleteCouponDone } = useSelector((state) => state.coupon);
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
  useEffect(() => {
    dispatch({
      type: LOAD_COUPON_REQUEST,
    });
  }, [dispatch]);

  const deleteCoupon = (id) => {
    dispatch({
      type: DELETE_COUPON_REQUEST,
      data: {
        id,
      },
    });
  };

  useEffect(() => {
    if (deleteCouponDone) {
      window.location.href = "/adminCoupons";
    }
  }, [deleteCouponDone]);
  return (
    <>
      <AdminSubHeader data={"쿠폰 관리"} />
      {(me && me === "") || me.user_id === "ubuntu0516" ? (
        <>
          <div className="adminCoupons">
            {coupons.length === 0 ? (
              <div className="upload_btn">
                <p
                  onClick={() => {
                    setOpenForm(true);
                  }}
                >
                  <span>+</span> 업로드
                </p>
              </div>
            ) : (
              <div
                className="upload_btn"
                style={{ backgroundColor: "white", cursor: "inherit" }}
              ></div>
            )}

            <div className="table">
              <div className="head_row row">
                <p>쿠폰 코드</p>
                <p>쿠폰 이름</p>
                <p>쿠폰 할인</p>
                <p>쿠폰 기간</p>
                <p></p>
              </div>
              {uniqueCoupons &&
                uniqueCoupons.map((coupon, index) => {
                  return (
                    <div
                      className={
                        index % 2 === 0
                          ? "content_row row"
                          : "content_row row even_row"
                      }
                      key={index}
                    >
                      <p>{coupon.coupon_code}</p>
                      <p>{coupon.coupon_name}</p>
                      <p>
                        {coupon.coupon_percent === 0
                          ? coupon.coupon_price
                          : coupon.coupon_percent}
                        {coupon.coupon_percent === 0 ? "원" : "%"}
                      </p>
                      <p>~{coupon.coupon_period}</p>
                      <div
                        className="btn_box"
                        onClick={() => {
                          deleteCoupon(coupon.id);
                        }}
                      >
                        <p>삭제</p>
                      </div>
                    </div>
                  );
                })}
            </div>
            {openForm ? (
              <CouponUpload
                handlePopup={() => {
                  setOpenForm(false);
                }}
              />
            ) : (
              ""
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default AdminCoupon;
