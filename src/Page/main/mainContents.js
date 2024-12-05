import MainS1 from "./mainS1";
import MainS2 from "./mainS2";
import MainS3 from "./mainS3";
import MainS4 from "./mainS4";
import MainS5 from "./mainS5";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LOAD_COUPON_REQUEST,
  LOAD_COUPON_LISTS_REQUEST,
} from "../../reducers/coupon";
import CouponModal from "./couponModal";
import ReceivePopup from "./receivePopup";

const MainContents = () => {
  const dispatch = useDispatch();
  const { coupons, couponLists } = useSelector((state) => state.coupon);
  const { me } = useSelector((state) => state.user);
  const [modalOpen, setModalOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(true);
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
  const allCoupon = uniqueCoupons.find(
    (coupon) => coupon?.coupon_type === "all"
  );

  const acceptableCoupon = couponLists.find(
    (list) => list?.coupon_id === allCoupon?.coupon_id
  );
  useEffect(() => {
    dispatch({
      type: LOAD_COUPON_REQUEST,
    });
  }, [dispatch]);
  useEffect(() => {
    if (me) {
      const userId = me.user_id;
      dispatch({
        type: LOAD_COUPON_LISTS_REQUEST,
        data: { userId },
      });
    }
  }, [dispatch, me]);

  useEffect(() => {
    if (allCoupon) {
      if (me === null) {
        setModalOpen(true);
      } else {
        if (acceptableCoupon) {
          setModalOpen(false);
        } else {
          setModalOpen(true);
        }
      }
    }
  }, [coupons, me, acceptableCoupon]);

  useEffect(() => {
    if (popupOpen) {
      const timer = setTimeout(() => {
        setPopupOpen(false);
      }, 400000); // 5초 후 popupOpen을 false로 설정
      return () => clearTimeout(timer); // 컴포넌트가 언마운트될 때 타이머를 정리
    }
  }, [popupOpen]);
  return (
    <>
      <MainS1 />
      <MainS2 />
      <MainS3 />
      <MainS4 />
      <MainS5 />
      {modalOpen && (
        <CouponModal
          setModalOpen={setModalOpen}
          coupon={allCoupon}
          user={me}
          setPopupOpen={setPopupOpen}
        />
      )}
      {popupOpen && <ReceivePopup coupon={allCoupon} />}
    </>
  );
};

export default MainContents;
