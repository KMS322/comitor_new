import "../../CSS/shopDetail.css";
import React, { useState } from "react";
const ShopDetailS2 = () => {
  const [detailState, setDetailState] = useState(false);
  return (
    <div className="shopDetail_s2">
      <div className="section_container">
        <p>
          Info <span>정보</span>
        </p>
        <div className={`img_box ${detailState ? "img_box_open" : ""}`}>
          <img src="/images/shopDetail/img1.svg" alt="" />
        </div>

        <div
          className="more_btn"
          onClick={() => {
            setDetailState(!detailState);
          }}
        >
          <p>상품 정보 더보기</p>
          <img
            src={
              detailState
                ? "/images/shopDetail/arrow_up.png"
                : "/images/shopDetail/arrow_down.png"
            }
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default ShopDetailS2;
