import "../../CSS/couponModal.css";
import "../../CSS/couponModal_mobile.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ACCEPT_COUPON_REQUEST } from "../../reducers/coupon";
const CouponModal = ({ setModalOpen, coupon, user, setPopupOpen }) => {
  const userId = user && user.user_id;
  const couponId = coupon && coupon.coupon_id;
  const dispatch = useDispatch();
  const { acceptCouponDone } = useSelector((state) => state.coupon);
  const acceptCoupon = () => {
    if (userId) {
      dispatch({
        type: ACCEPT_COUPON_REQUEST,
        data: { userId, couponId },
      });
    } else {
      alert("쿠폰을 받으시려면 로그인을 하셔야 합니다.");
    }
  };
  useEffect(() => {
    if (acceptCouponDone) {
      setModalOpen(false);
      window.location.href = "/";
    }
  }, [acceptCouponDone]);
  return (
    <div className="coupon_modal">
      <div className="article">
        <p onClick={() => setModalOpen(false)} className="x_box">
          X
        </p>
        <img src={`/images/coupon/${coupon && coupon.coupon_imgUrl}`} />
        <div className="btn_box">
          <button onClick={() => setModalOpen(false)}>닫기</button>
          <button
            onClick={() => {
              acceptCoupon();
              if (userId) {
                setPopupOpen(true);
              }
            }}
          >
            쿠폰 받기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CouponModal;
