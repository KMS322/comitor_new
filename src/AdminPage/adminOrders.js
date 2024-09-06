import "../CSS/adminOrders.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import AdminSubHeader from "./adminSubHeader";
import { LOAD_ORDER_REQUEST, DELETE_ORDER_REQUEST } from "../reducers/order";
import { LOAD_PRODUCT_REQUEST } from "../reducers/adminProduct";

const AdminOrders = () => {
  const location = useLocation();
  const me = location.state && location.state.me;
  const dispatch = useDispatch();
  const ordersArray = useSelector((state) => state.order.orders);
  const { deleteOrderDone } = useSelector((state) => state.order);
  const { products } = useSelector((state) => state.adminProduct);

  useEffect(() => {
    dispatch({
      type: LOAD_ORDER_REQUEST,
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch({
      type: LOAD_PRODUCT_REQUEST,
    });
  }, [dispatch]);

  let allLists = [];
  let allProducts = [];

  ordersArray.forEach((order) => {
    allLists = allLists.concat(order.allLists);
    allProducts = allProducts.concat(order.allProducts);
  });

  const uniqueLists = allLists.filter(
    (order, index, self) =>
      index === self.findIndex((o) => o.order_code === order.order_code)
  );
  const uniqueProducts = allProducts.filter(
    (order, index, self) =>
      index ===
      self.findIndex(
        (o) =>
          o.order_code === order.order_code &&
          o.product_code === order.product_code
      )
  );

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const formattedDate = date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const formattedTime = date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return `${formattedDate} ${formattedTime}`;
  };

  const deleteOrder = (code) => {
    dispatch({
      type: DELETE_ORDER_REQUEST,
      data: {
        code,
      },
    });
  };

  useEffect(() => {
    if (deleteOrderDone) {
      window.location.href = "/adminOrders";
    }
  }, [deleteOrderDone]);
  return (
    <>
      <AdminSubHeader data={"주문 관리"} />
      {(me && me === "") || me.user_id === "admin" ? (
        <div className="adminOrders">
          <div className="table">
            <div className="head_row row">
              <p>주문코드</p>
              <p>이름</p>
              <p>상품번호</p>
              <p>갯수</p>
              <p>전화번호</p>
              <p>주소</p>
              <p>요청사항</p>
              <p>주문날짜</p>
            </div>
            {uniqueLists &&
              uniqueLists.map((list, index) => {
                const orderedproducts = uniqueProducts.filter(
                  (item) => item.order_code === list.order_code
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
                    <p>{list.order_code}</p>
                    <p>{list.order_name}</p>
                    <div className="productName">
                      {orderedproducts.map((product, index) => {
                        const selectedProduct = products.find(
                          (item) => item.product_code === product.product_code
                        );
                        return (
                          <p key={index}>{selectedProduct.product_code}</p>
                        );
                      })}
                    </div>
                    <div className="productCnt">
                      {orderedproducts.map((product, index) => {
                        return <p key={index}>{product.product_cnt}개</p>;
                      })}
                    </div>

                    <p>{list.order_phone}</p>
                    <p>{list.order_address}</p>
                    <p>{list.order_request}</p>
                    <p>{formatDateTime(list.createdAt)}</p>
                    <div
                      className="btn_box"
                      onClick={() => {
                        deleteOrder(list.order_code);
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

export default AdminOrders;
