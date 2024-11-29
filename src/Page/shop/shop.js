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
  const [selectedStyle, setSelectedStyle] = useState("");

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
  const handleSort = (sort) => {
    let sortedProducts;
    switch (sort) {
      case "신상품":
        // createdAt으로 정렬 (최신 상품이 위로 오도록)
        sortedProducts = [...uniqueProducts].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;

      case "상품명":
        // product_name으로 정렬 (알파벳 순서)
        sortedProducts = [...uniqueProducts].sort((a, b) =>
          a.product_name.localeCompare(b.product_name)
        );
        break;

      case "낮은가격":
        // product_salePrice로 오름차순 정렬 (가장 저렴한 가격이 위로 오도록)
        sortedProducts = [...uniqueProducts].sort(
          (a, b) => a.product_salePrice - b.product_salePrice
        );
        break;

      case "높은가격":
        // product_salePrice로 내림차순 정렬 (가장 비싼 가격이 위로 오도록)
        sortedProducts = [...uniqueProducts].sort(
          (a, b) => b.product_salePrice - a.product_salePrice
        );
        break;

      default:
        // 기본 정렬 또는 처리
        sortedProducts = uniqueProducts;
        break;
    }
    setUniqueProducts(sortedProducts);
  };

  return (
    <div className="shop">
      <div className="shop_container">
        <p>Shop</p>
        <div className="nav">
          <p>{uniqueProducts && uniqueProducts.length}개의 상품이 있습니다.</p>
          <ul id="pc">
            <li
              onClick={() => {
                handleSort("신상품");
                setSelectedStyle("신상품");
              }}
              // style={{
              //   color: selectedStyle === "id" ? "#000035" : "inherit",
              // }}
            >
              신상품
            </li>
            <li
              onClick={() => {
                handleSort("상품명");
                setSelectedStyle("상품명");
              }}
              // style={{
              //   color: selectedStyle === "name" ? "#000035" : "inherit",
              // }}
            >
              상품명
            </li>
            <li
              onClick={() => {
                handleSort("낮은가격");
                setSelectedStyle("낮은가격");
              }}
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
              onClick={() => {
                handleSort("높은가격");
                setSelectedStyle("높은가격");
              }}
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
          {/* <select id="mobile" /> */}
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
