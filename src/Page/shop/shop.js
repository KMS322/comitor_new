import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../../CSS/shop.css";
import "../../CSS/shop_mobile.css";
import { LOAD_PRODUCT_REQUEST } from "../../reducers/adminProduct";
const Shop = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goPage = (code) => {
    navigate(`/shopDetail/${code}`);
  };
  const { products } = useSelector((state) => state.adminProduct);
  const [uniqueProducts, setUniqueProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);

  useEffect(() => {
    dispatch({
      type: LOAD_PRODUCT_REQUEST,
    });
  }, [dispatch]);
  useEffect(() => {
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

    setUniqueProducts(removeDuplicatesById(products));
  }, [products]);
  useEffect(() => {
    if (uniqueProducts.length > 0) {
      setSortedProducts(uniqueProducts);
    }
  }, [uniqueProducts]);

  const handleSort = () => {};

  return (
    <div className="shop">
      <div className="shop_container">
        <p>Shop</p>
        <div className="nav">
          <p>{uniqueProducts && uniqueProducts.length}개의 상품이 있습니다.</p>
          <ul id="pc">
            <li
              onClick={() => {}}
              // style={{
              //   color: selectedStyle === "id" ? "#000035" : "inherit",
              // }}
            >
              신상품
            </li>
            <li
              onClick={() => {}}
              // style={{
              //   color: selectedStyle === "name" ? "#000035" : "inherit",
              // }}
            >
              상품명
            </li>
            <li
              onClick={() => {}}
              // style={{
              //   color:
              //     selectedStyle === "price" && sortOrder === "asc"
              //       ? "#000035"
              //       : "inherit",
              // }}
            >
              낮은가격
            </li>
            <li
              onClick={() => {}}
              // style={{
              //   color:
              //     selectedStyle === "price" && sortOrder === "desc"
              //       ? "#000035"
              //       : "inherit",
              // }}
            >
              높은가격
            </li>
          </ul>
          <select id="mobile" />
        </div>
        <div className="article_container">
          {uniqueProducts &&
            uniqueProducts.map((product, index) => {
              return (
                <div
                  className="article"
                  key={index}
                  onClick={() => {
                    goPage(product.product_code);
                  }}
                >
                  <img
                    src={`/images/mainImage/${product.product_imgUrl}`}
                    alt=""
                  />
                  <p
                    className="product_title"
                    dangerouslySetInnerHTML={{ __html: product.product_name }}
                  ></p>
                  <p className="product_price">
                    {product.product_salePrice.toLocaleString()}원
                  </p>
                </div>
              );
            })}
        </div>
        <div className="page_list">
          <p>{`< 1 >`}</p>
        </div>
      </div>
    </div>
  );
};

export default Shop;
