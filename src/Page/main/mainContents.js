import MainS1 from "./mainS1";
import MainS2 from "./mainS2";
import MainS3 from "./mainS3";
import MainS4 from "./mainS4";
import MainS5 from "./mainS5";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_COUPON_REQUEST } from "../../reducers/coupon";
import CouponModal from "./couponModal";

const MainContents = () => {
  const dispatch = useDispatch();
  const { coupons } = useSelector((state) => state.coupon);
  const { me } = useSelector((state) => state.user);
  const [modalOpen, setModalOpen] = useState(false);

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
  useEffect(() => {
    if (coupons.length > 0) {
      console.log("me : ", me);
      if (me === null) {
        setModalOpen(true);
      } else {
        if (me.user_coupon === coupons[0].coupon_code) {
          setModalOpen(false);
        } else {
          setModalOpen(true);
        }
      }
    }
  }, [coupons, me]);
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
          coupon={uniqueCoupons}
          user={me}
        />
      )}
    </>
  );
};

export default MainContents;
