import "../CSS/adminLists.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import AdminSubHeader from "./adminSubHeader";
import UploadForm from "./adminUploadForm";
import {
  LOAD_PRODUCT_REQUEST,
  DELETE_PRODUCT_REQUEST,
} from "../reducers/adminProduct";
// import Loading from "./loading";
const AdminLists = () => {
  const location = useLocation();
  const me = location.state && location.state.me;
  const [openForm, setOpenForm] = useState(false);
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.adminProduct);

  const removeDuplicatesById = (lists) => {
    if (!lists || !Array.isArray(lists)) {
      return [];
    }
    const uniqueLists = [];
    const existingIds = [];

    for (const list of lists) {
      if (
        list &&
        list.product_code &&
        !existingIds.includes(list.product_code)
      ) {
        uniqueLists.push(list);
        existingIds.push(list.product_code);
      }
    }

    return uniqueLists;
  };
  const uniqueProducts = removeDuplicatesById(products);

  const [openLoading, setOpenLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");

  useEffect(() => {
    dispatch({
      type: LOAD_PRODUCT_REQUEST,
    });
  }, [dispatch]);
  const deleteProduct = (code) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      dispatch({
        type: DELETE_PRODUCT_REQUEST,
        data: {
          code,
        },
      });
    }
  };

  return (
    <>
      <AdminSubHeader data={"상품 관리"} />
      {(me && me === "") || me.user_id === "ubuntu0516" ? (
        <div className="adminLists">
          <div className="upload_btn">
            <p
              onClick={() => {
                setOpenForm(true);
              }}
            >
              <span>+</span> 업로드
            </p>
          </div>
          <div className="table">
            <div className="head_row row">
              <p>상품코드</p>
              <p>상품명</p>
              <p>할인 전 가격</p>
              <p>할인 후 가격</p>
              <p>대표이미지</p>
              <p>상세페이지</p>
              <p></p>
            </div>
            {uniqueProducts &&
              uniqueProducts.map((product, index) => {
                return (
                  <div
                    className={
                      index % 2 === 0
                        ? "content_row row"
                        : "content_row row even_row"
                    }
                    key={index}
                  >
                    <p>{product.product_code}</p>
                    <p>{product.product_name}</p>
                    <p>{product.product_originPrice.toLocaleString()}원</p>
                    <p>{product.product_salePrice.toLocaleString()}원</p>
                    <p>{product.product_imgUrl}</p>
                    <p>{product.product_detailUrl}</p>
                    <div
                      className="btn_box"
                      onClick={() => {
                        deleteProduct(product.product_code);
                      }}
                    >
                      <p>삭제</p>
                    </div>
                  </div>
                );
              })}
          </div>
          {openForm ? (
            <UploadForm
              handlePopup={() => {
                setOpenForm(false);
              }}
            />
          ) : (
            ""
          )}
          {/* {openLoading ? <Loading data={loadingMsg} /> : ""} */}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default AdminLists;
