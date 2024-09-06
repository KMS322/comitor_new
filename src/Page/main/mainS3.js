import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../CSS/main.css";
import "../../CSS/main_mobile.css";

const MainS3 = () => {
  const navigate = useNavigate();
  const goPage = (id) => {
    navigate(`/shopDetail/${id}`);
  };
  const [products, setProducts] = useState([
    {
      id: 1,
      name: `코미토르 밸런스 펫 세럼<br />강아지 발습진 발사탕 피부병 보습제`,
      imageUrl: "/images/product/product_img1.jpg",
      price: 17900,
    },
    {
      id: 2,
      name: `코미토르 밸런스 펫 세럼<br />강아지 발습진 발사탕 피부병 보습제 2개`,
      imageUrl: "/images/product/product_img2.jpg",
      price: 34900,
    },
    {
      id: 3,
      name: `코미토르 밸런스 펫 세럼<br />강아지 발습진 발사탕 피부병 보습제`,
      imageUrl: "/images/product/product_img3.jpg",
      price: 17900,
    },
  ]);
  if (products === null) {
    setProducts({
      id: 1,
      name: `코미토르 밸런스 펫 세럼<br />강아지 발습진 발사탕 피부병 보습제`,
      imageUrl: "/images/product/product_img1.jpg",
      price: 17900,
    });
  }
  return (
    <div className="main_s3">
      <p>Product</p>
      <div className="article_container">
        {products.map((product, index) => {
          return (
            <div
              className="article"
              key={index}
              onClick={() => {
                goPage(product.id);
              }}
            >
              <img src={product.imageUrl} alt="" />
              <p
                className="product_title"
                dangerouslySetInnerHTML={{ __html: product.name }}
              ></p>
              <p className="product_price">
                {product.price.toLocaleString()}원
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MainS3;
