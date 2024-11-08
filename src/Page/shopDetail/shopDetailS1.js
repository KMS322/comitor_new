import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_PRODUCT_REQUEST } from "../../reducers/adminProduct";
import { ADD_CART_REQUEST } from "../../reducers/cart";
import "../../CSS/shopDetail.css";
import "../../CSS/shopDetail_mobile.css";
import Modal from "../modal";
const ShopDetailS1 = ({ productCode }) => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.adminProduct);
  const { me } = useSelector((state) => state.user);
  const [uniqueProducts, setUniqueProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
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

  const selectedProduct = uniqueProducts.find(
    (item) => Number(item.product_code) === Number(productCode)
  );

  const [selectedCnt, setSelectedCnt] = useState(1);
  const [liked, setLiked] = useState(false);

  const navigate = useNavigate();

  const calculateNextDateAndDay = () => {
    const currentDate = new Date();
    const nextDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
    let nextDayOfWeek = daysOfWeek[nextDate.getDay()];

    if (nextDayOfWeek === "토" || nextDayOfWeek === "일") {
      const daysUntilMonday = nextDayOfWeek === "토" ? 2 : 1;
      nextDate.setDate(nextDate.getDate() + daysUntilMonday);
      nextDayOfWeek = "월";
    }

    return {
      nextDate,
      nextDayOfWeek,
    };
  };
  const { nextDate, nextDayOfWeek } = calculateNextDateAndDay();

  if (!selectedProduct) {
    return (
      <div className="shopDetail_s1">
        <div className="section_container">
          <p>상품을 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

  const addCart = (code) => {
    let user = "non";
    if (me) {
      user = me.id;
    }
    console.log("code : ", code);
    console.log("user : ", user);
    console.log("selectedCnt : ", selectedCnt);
    dispatch({
      type: ADD_CART_REQUEST,
      data: { code, user, selectedCnt },
    });
  };
  return (
    <div className="shopDetail_s1">
      <div className="section_container">
        <img
          src={`/images/mainImage/${selectedProduct.product_imgUrl}`}
          alt=""
        />
        <div className="article">
          <p>BEST</p>
          <p
            dangerouslySetInnerHTML={{ __html: selectedProduct.product_name }}
          ></p>
          <p>{`${
            nextDate.getMonth() + 1
          }/${nextDate.getDate()}(${nextDayOfWeek}) 도착예정`}</p>
          <p>
            <span>
              {selectedProduct.product_originPrice.toLocaleString()}원
            </span>
            {selectedProduct.product_salePrice.toLocaleString()}원
          </p>
          <div className="count_box">
            <p>수량</p>
            <div className="count">
              <div
                onClick={() => {
                  if (selectedCnt > 1) {
                    setSelectedCnt(selectedCnt - 1);
                  }
                }}
              >
                <img src="/images/product/minus_icon.png" alt="" />
              </div>
              <div>{selectedCnt}</div>
              <div
                onClick={() => {
                  setSelectedCnt(selectedCnt + 1);
                }}
              >
                <img src="/images/product/plus_icon.png" alt="" />
              </div>
            </div>
          </div>
          <div className="line"></div>
          <p id="pc">
            <span>총 상품 금액(수량)</span>
            {(selectedProduct.product_salePrice * selectedCnt).toLocaleString()}
            <span>({selectedCnt}개)</span>
          </p>
          <div className="btn_box">
            <div
              className="btn"
              onClick={() => {
                if (me) {
                  setModalOpen(true);
                  addCart(selectedProduct.product_code);
                } else {
                  alert("로그인을 해주세요.");
                  window.location.href = "/login";
                }
              }}
            >
              장바구니
            </div>
            <div
              className="btn"
              onClick={() => {
                // navigate("/pay1", { state: { selectedProduct, selectedCnt } });
                console.log("selectedProduct : ", selectedProduct);
                console.log("selectedCnt : ", selectedCnt);
              }}
            >
              바로 주문
            </div>
          </div>
          {/* <div
            className="like_box"
            onClick={() => {
              setLiked(!liked);
            }}
          >
            <img
              src={
                liked
                  ? "/images/mypage/heart_full.png"
                  : "/images/mypage/heart_empty.png"
              }
              alt=""
            />
            <p>좋아요</p>
          </div> */}
          <div id="mobile" className="total_price">
            <p>총 상품 금액(수량)</p>
            <p>
              {(
                selectedProduct.product_salePrice * selectedCnt
              ).toLocaleString()}
            </p>
          </div>
          <p id="mobile" className="total_count">
            (1개)
          </p>
        </div>
      </div>
      {modalOpen && <Modal setModalOpen={setModalOpen} />}
    </div>
  );
};

export default ShopDetailS1;
