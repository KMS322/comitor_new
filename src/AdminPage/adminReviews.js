import "../CSS/adminReviews.css";
import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import AdminSubHeader from "./adminSubHeader";
import { LOAD_PRODUCT_REQUEST } from "../reducers/adminProduct";
import {
  DELETE_REVIEW_REQUEST,
  LOAD_ALL_REVIEW_REQUEST,
} from "../reducers/review";
// import Loading from "./loading";
const AdminReviews = () => {
  const location = useLocation();
  const me = location.state && location.state.me;
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.adminProduct);
  const { allReviews, deleteReviewDone } = useSelector((state) => state.review);

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
  const uniqueProducts = removeDuplicatesById(products);
  const uniqueReviews = removeDuplicatesById(allReviews);
  useEffect(() => {
    dispatch({
      type: LOAD_PRODUCT_REQUEST,
    });
  }, [dispatch]);
  useEffect(() => {
    dispatch({
      type: LOAD_ALL_REVIEW_REQUEST,
    });
  }, [dispatch]);

  const deleteReview = (id) => {
    dispatch({
      type: DELETE_REVIEW_REQUEST,
      data: { id },
    });
  };
  useEffect(() => {
    if (deleteReviewDone) {
      window.location.href = "/adminReviews";
    }
  }, deleteReviewDone);

  return (
    <>
      <AdminSubHeader data={"리뷰 관리"} />
      {(me && me === "") || me.user_id === "admin" ? (
        <div className="adminReviews">
          <div className="table">
            <div className="head_row row">
              <p>no</p>
              <p>리뷰 내용</p>
              <p>별점</p>
              <p>구매 상품</p>
              <p>고객 아이디</p>
              <p>등록날짜</p>
              <p></p>
            </div>
            {uniqueReviews &&
              uniqueReviews.map((review, index) => {
                const product = uniqueProducts.find(
                  (item) => item.product_code === review.product_code
                );
                return (
                  <div
                    className={
                      index % 2 === 0
                        ? "content_row row"
                        : "content_row row even_row"
                    }
                    key={index}
                  >
                    <p>{index + 1}</p>
                    <p>{review.review_comment}</p>
                    <p>{review.star_point}점</p>
                    <p>{product.product_name}</p>
                    <p>{review.user_id}</p>
                    <p>{dayjs(review.updatedAt).format("YY-MM-DD_HH:mm")}</p>
                    <div
                      className="btn_box"
                      onClick={() => {
                        deleteReview(review.id);
                      }}
                    >
                      <p>삭제</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default AdminReviews;
