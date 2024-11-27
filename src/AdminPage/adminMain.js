import "../CSS/adminMain.css";
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";
import { LOAD_PRODUCT_REQUEST } from "../reducers/adminProduct";
import AdminSubHeader from "./adminSubHeader";
const AdminMain = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const location = useLocation();
  const location_me = location.state && location.state.location_me;
  // useEffect(() => {
  //   dispatch({
  //     type: LOAD_MY_INFO_REQUEST,
  //   });
  //   if (!me) {
  //     console.log("main 속 me : ", me);
  //     // navigate("/admin");
  //   }
  // }, [me, dispatch]);

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
            navigate("/adminLists", { state: { location_me } });
          }}
        >
          상품 목록
        </p>
        <p
          onClick={() => {
            navigate("/adminOrders", { state: { location_me } });
          }}
        >
          주문 목록
        </p>
        <p
          onClick={() => {
            navigate("/adminBanners", { state: { location_me } });
          }}
        >
          배너 목록
        </p>
        <p
          onClick={() => {
            navigate("/adminCoupons", { state: { location_me } });
          }}
        >
          쿠폰 목록
        </p>
        <p
          onClick={() => {
            navigate("/adminReviews", { state: { location_me } });
          }}
        >
          리뷰 목록
        </p>
        <p
          onClick={() => {
            navigate("/adminUsers", { state: { location_me } });
          }}
        >
          유저 목록
        </p>
        <p
          onClick={() => {
            navigate("/adminStatistics", { state: { location_me } });
          }}
        >
          통계
        </p>
        {/* <p
          onClick={() => {
            navigate("/adminPopup", { state: { location_me } });
          }}
        >
          팝업 창 관리
        </p> */}
      </div>
    </>
  );
};

export default AdminMain;
