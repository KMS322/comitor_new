import "../CSS/adminMain.css";
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOAD_PRODUCT_REQUEST } from "../reducers/adminProduct";
import AdminSubHeader from "./adminSubHeader";
const AdminMain = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const me = location.state && location.state.me;

  useEffect(() => {
    if (!me) {
      navigate("/admin");
    }
  }, [me]);

  useEffect(() => {
    dispatch({
      type: LOAD_PRODUCT_REQUEST,
    });
  });

  return (
    <>
      <AdminSubHeader data={"관리자 페이지"} />
      <div className="adminMain">
        <p
          onClick={() => {
            navigate("/adminLists", { state: { me } });
          }}
        >
          상품 목록
        </p>
        <p
          onClick={() => {
            navigate("/adminOrders", { state: { me } });
          }}
        >
          주문 목록
        </p>
        <p
          onClick={() => {
            navigate("/adminBanners", { state: { me } });
          }}
        >
          배너 목록
        </p>
        <p
          onClick={() => {
            navigate("/adminCoupons", { state: { me } });
          }}
        >
          쿠폰 목록
        </p>
        <p
          onClick={() => {
            navigate("/adminReviews", { state: { me } });
          }}
        >
          리뷰 목록
        </p>
        <p
          onClick={() => {
            navigate("/adminUsers", { state: { me } });
          }}
        >
          유저 목록
        </p>
        <p
          onClick={() => {
            navigate("/adminStatistics", { state: { me } });
          }}
        >
          통계
        </p>
        {/* <p
          onClick={() => {
            navigate("/adminPopup", { state: { me } });
          }}
        >
          팝업 창 관리
        </p> */}
      </div>
    </>
  );
};

export default AdminMain;
