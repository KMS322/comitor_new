import "../CSS/adminStatistics.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import AdminSubHeader from "./adminSubHeader";
import { LOAD_ORDER_REQUEST } from "../reducers/order";
import { LOAD_PRODUCT_REQUEST } from "../reducers/adminProduct";
import dayjs from "dayjs";
import StatisticMonth from "./StatisticMonth";

const AdminStatistics = () => {
  const location = useLocation();
  const me = location.state && location.state.me;
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { products } = useSelector((state) => state.adminProduct);
  useEffect(() => {
    dispatch({
      type: LOAD_ORDER_REQUEST,
    });
  }, dispatch);
  useEffect(() => {
    dispatch({
      type: LOAD_PRODUCT_REQUEST,
    });
  }, dispatch);
  const orderProductsLists = orders.length > 0 && orders[0].allProducts;
  // console.log("orderProductsLists : ", orderProductsLists);
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
  const totalSales = uniqueProducts.map((product) => ({
    pCode: product.product_code,
    pName: product.product_name,
    totalCnt: 0,
    saleYear: "",
    saleMonth: "",
  }));
  console.log("totalSales : ", totalSales);
  orderProductsLists &&
    orderProductsLists.map((list) => {
      totalSales.map((sale) => {
        if (sale.pCode === list.product_code) {
          sale.totalCnt++;
          sale.saleYear = dayjs(list.createdAt).format("YY");
          sale.saleMonth = dayjs(list.createdAt).format("MM");
        }
      });
    });
  // console.log("totalSales : ", totalSales);
  const totalSaleRanks = totalSales
    .slice()
    .sort((a, b) => b.totalCnt - a.totalCnt);
  // console.log("totalSaleRanks : ", totalSaleRanks);
  return (
    <>
      <AdminSubHeader data={"통계"} />
      {(me && me === "") || me.user_id === "ubuntu0516" ? (
        <div className="adminStatistics">
          <p>누적 판매량</p>
          <div className="rank_container">
            {totalSaleRanks &&
              totalSaleRanks.map((rank, index) => {
                return (
                  <div key={index} className="rank_row">
                    <p>
                      {index + 1}위(판매량 : {rank.totalCnt}개)
                    </p>
                    <p>{rank.pName}</p>
                  </div>
                );
              })}
          </div>
          <StatisticMonth datas={{ orderProductsLists, uniqueProducts }} />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default AdminStatistics;
