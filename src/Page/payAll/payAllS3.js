import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { LOAD_COUPON_LISTS_REQUEST } from "../../reducers/coupon";
import Pay1Modal from "./payAllModal";
import TossCheckoutPage from "../toss_checkout";
import "../../CSS/pay.css";
import "../../CSS/pay_mobile.css";
const PayAllS3 = ({ deliveryInfo }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const { coupons, couponLists } = useSelector((state) => state.coupon);
  const { me } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.adminProduct);
  const userId = me && me.user_id;
  const page = "payAll";

  const selectedCart = location.state && location.state.selectedCart;
  const uniqueCarts = location.state && location.state.uniqueCarts;
  const [salePrice, setSalePrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [onCoupon, setOnCoupon] = useState(false);
  const [dupliCoupon, setDupliOnCoupon] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [orderData, setOrderData] = useState();

  useEffect(() => {
    if (!onCoupon && !dupliCoupon) {
      setSalePrice(totalPrice);
    } else if (onCoupon && !dupliCoupon) {
      const selectedCoupon = coupons.find(
        (item) => item.coupon_id === onCoupon
      );
      if (selectedCoupon?.coupon_percent) {
        const sale = Math.ceil(
          totalPrice * (1 - selectedCoupon?.coupon_percent / 100)
        );
        setSalePrice(sale);
      } else {
        const sale = Math.ceil(totalPrice - selectedCoupon?.coupon_price);
        setSalePrice(sale);
      }
    } else if (!onCoupon && dupliCoupon) {
      const selectedCoupon = coupons.find(
        (item) => item.coupon_id === dupliCoupon
      );
      if (selectedCoupon?.coupon_percent) {
        const sale = Math.ceil(
          totalPrice * (1 - selectedCoupon?.coupon_percent / 100)
        );
        setSalePrice(sale);
      } else {
        const sale = Math.ceil(totalPrice - selectedCoupon?.coupon_price);
        setSalePrice(sale);
      }
    } else {
      const selectedCoupon1 = coupons.find(
        (item) => item.coupon_id === onCoupon
      );
      const selectedCoupon2 = coupons.find(
        (item) => item.coupon_id === dupliCoupon
      );
      if (selectedCoupon1.coupon_percent && selectedCoupon2.coupon_percent) {
        // 둘다 퍼센트 할인
        const sale1 = Math.ceil(
          totalPrice * (selectedCoupon1?.coupon_percent / 100)
        );
        const sale2 = Math.ceil(
          totalPrice * (selectedCoupon2?.coupon_percent / 100)
        );
        const sale = totalPrice - sale1 - sale2;
        setSalePrice(sale);
      } else if (
        !selectedCoupon1.coupon_percent &&
        selectedCoupon2.coupon_percent
      ) {
        const sale1 = selectedCoupon1?.coupon_price;
        const sale2 = Math.ceil(
          totalPrice * (selectedCoupon2?.coupon_percent / 100)
        );
        const sale = totalPrice - sale1 - sale2;
        setSalePrice(sale);
      } else if (
        selectedCoupon1.coupon_percent &&
        !selectedCoupon2.coupon_percent
      ) {
        const sale1 = Math.ceil(
          totalPrice * (selectedCoupon1?.coupon_percent / 100)
        );
        const sale2 = selectedCoupon2?.coupon_price;
        const sale = totalPrice - sale1 - sale2;
        setSalePrice(sale);
      } else {
        const sale1 = selectedCoupon1?.coupon_price;
        const sale2 = selectedCoupon2?.coupon_price;
        const sale = totalPrice - sale1 - sale2;
        setSalePrice(sale);
      }
    }
  }, [totalPrice, onCoupon, dupliCoupon, coupons]);

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
  const uniqueLists = removeDuplicatesById(couponLists);
  const uniqueProducts = removeDuplicatesById(products);
  useEffect(() => {
    if (selectedCart.length > 0) {
      let total = 0;
      selectedCart.map((item) => {
        const product = uniqueProducts.find(
          (product) => product.product_code === item.product_code
        );

        total += product?.product_salePrice * item.product_cnt;
      });
      setTotalPrice(total);
    }
  }, [selectedCart, uniqueProducts]);
  const handlePaymentClick = () => {
    const data = {
      uniqueCarts,
      me,
      deliveryInfo,
      price: salePrice,
      page,
    };
    setOrderData(data);
    setModalOpen(true);
  };

  useEffect(() => {
    dispatch({
      type: LOAD_COUPON_LISTS_REQUEST,
      data: { userId },
    });
  }, [dispatch]);

  return (
    <div className="pay_s3">
      <div className="section_container">
        <p>상품 정보</p>
        <div id="pc" className="article_container">
          <div className="row_head">
            <p>상품 정보</p>
            <p>수량</p>
            <p>할인 쿠폰</p>
            <p>배송비</p>
            <p>주문금액</p>
          </div>
          {selectedCart &&
            selectedCart.map((item, index) => {
              const selectedProduct = uniqueProducts.find(
                (product) => product?.product_code === item?.product_code
              );
              const selectedCnt = item.product_cnt;
              return (
                <div className="row_content" key={index}>
                  <div className="item_box">
                    <img
                      src={`/images/mainImage/${selectedProduct?.product_imgUrl}`}
                      alt=""
                    />
                    <p>{selectedProduct?.product_name}</p>
                  </div>
                  <p>{selectedCnt}</p>
                  <p>
                    {me && uniqueLists.length > 0
                      ? `${uniqueLists.length}개`
                      : "없음"}
                  </p>
                  <p>무료</p>
                  <p>
                    {(
                      selectedProduct?.product_salePrice * selectedCnt
                    ).toLocaleString()}
                    원
                  </p>
                </div>
              );
            })}

          <div className="coupon_box1">
            <p>보유한 쿠폰</p>
            {uniqueLists &&
              uniqueLists.map((list, index) => {
                const coupon = coupons.find(
                  (item) => item.coupon_id === list.coupon_id
                );
                if (coupon.coupon_duplication === "impossibility") {
                  return (
                    <div className="coupon_list" key={index}>
                      <p>{coupon.coupon_name}</p>
                      {coupon.coupon_percent ? (
                        <p>{coupon.coupon_percent}% 할인</p>
                      ) : (
                        <p>{coupon.coupon_price}원 할인</p>
                      )}
                      <div className="coupon_btn_box">
                        <div
                          className="coupon_btn"
                          onClick={() => {
                            if (onCoupon === coupon.coupon_id) {
                              setOnCoupon("");
                              alert(
                                `${coupon.coupon_name}이(가) 해제되었습니다.`
                              );
                            } else {
                              setOnCoupon(coupon.coupon_id);
                              alert(
                                `${coupon.coupon_name}이(가) 적용되었습니다.`
                              );
                            }
                          }}
                          style={{
                            backgroundColor:
                              onCoupon === coupon.coupon_id ? "#000035" : "",
                            color: onCoupon === coupon.coupon_id ? "white" : "",
                          }}
                        >
                          적용
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div className="coupon_list" key={index}>
                      <p>[중복가능] {coupon.coupon_name}</p>
                      {coupon.coupon_percent ? (
                        <p>{coupon.coupon_percent}% 할인</p>
                      ) : (
                        <p>{coupon.coupon_price}원 할인</p>
                      )}
                      <div className="coupon_btn_box">
                        <div
                          className="coupon_btn"
                          onClick={() => {
                            if (dupliCoupon === coupon.coupon_id) {
                              setDupliOnCoupon("");
                              alert(
                                `${coupon.coupon_name}이(가) 해제되었습니다.`
                              );
                            } else {
                              setDupliOnCoupon(coupon.coupon_id);
                              alert(
                                `${coupon.coupon_name}이(가) 적용되었습니다.`
                              );
                            }
                          }}
                          style={{
                            backgroundColor:
                              dupliCoupon === coupon.coupon_id ? "#000035" : "",
                            color:
                              dupliCoupon === coupon.coupon_id ? "white" : "",
                          }}
                        >
                          적용
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
          </div>

          <div className="total_price_box">
            <p>총 결제금액</p>
            <p>{salePrice.toLocaleString()}원</p>
          </div>
          <div className="btn_box">
            <div className="btn" onClick={handlePaymentClick}>
              결제하기
            </div>
          </div>
        </div>
        <div id="mobile" className="article_container">
          {selectedCart &&
            selectedCart.map((item, index) => {
              const selectedProduct = uniqueProducts.find(
                (product) => product?.product_code === item?.product_code
              );
              const selectedCnt = item.product_cnt;
              return (
                <>
                  <div className="row_product" key={index}>
                    <p> {selectedProduct?.product_name}</p>
                    <img
                      src={`/images/mainImage/${selectedProduct?.product_imgUrl}`}
                      alt=""
                    />
                  </div>
                  <div className="row_head">
                    <p>수량</p>
                    <p>할인 쿠폰</p>
                    <p>배송비</p>
                    <p>주문금액</p>
                  </div>
                  <div className="row_content">
                    <p>{selectedCnt}</p>
                    <p>
                      {me && uniqueLists.length > 0
                        ? `${uniqueLists.length}개`
                        : "없음"}
                    </p>
                    <p>무료</p>
                    <p>
                      {(
                        selectedProduct?.product_salePrice * selectedCnt
                      ).toLocaleString()}
                      원
                    </p>
                  </div>
                </>
              );
            })}
        </div>
        <div id="mobile" className="coupon_box1">
          <p>보유한 쿠폰</p>
          {uniqueLists &&
            uniqueLists.map((list, index) => {
              const coupon = coupons.find(
                (item) => item.coupon_id === list.coupon_id
              );
              if (coupon.coupon_duplication === "impossibility") {
                return (
                  <div className="coupon_list" key={index}>
                    <p>{coupon.coupon_name}</p>
                    {coupon.coupon_percent ? (
                      <p>{coupon.coupon_percent}% 할인</p>
                    ) : (
                      <p>{coupon.coupon_price}원 할인</p>
                    )}
                    <div className="coupon_btn_box">
                      <div
                        className="coupon_btn"
                        onClick={() => {
                          if (onCoupon === coupon.coupon_id) {
                            setOnCoupon("");
                            alert(
                              `${coupon.coupon_name}이(가) 해제되었습니다.`
                            );
                          } else {
                            setOnCoupon(coupon.coupon_id);
                            alert(
                              `${coupon.coupon_name}이(가) 적용되었습니다.`
                            );
                          }
                        }}
                        style={{
                          backgroundColor:
                            onCoupon === coupon.coupon_id ? "#000035" : "",
                          color: onCoupon === coupon.coupon_id ? "white" : "",
                        }}
                      >
                        적용
                      </div>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="coupon_list" key={index}>
                    <p>[중복가능] {coupon.coupon_name}</p>
                    {coupon.coupon_percent ? (
                      <p>{coupon.coupon_percent}% 할인</p>
                    ) : (
                      <p>{coupon.coupon_price}원 할인</p>
                    )}
                    <div className="coupon_btn_box">
                      <div
                        className="coupon_btn"
                        onClick={() => {
                          if (dupliCoupon === coupon.coupon_id) {
                            setDupliOnCoupon("");
                            alert(
                              `${coupon.coupon_name}이(가) 해제되었습니다.`
                            );
                          } else {
                            setDupliOnCoupon(coupon.coupon_id);
                            alert(
                              `${coupon.coupon_name}이(가) 적용되었습니다.`
                            );
                          }
                        }}
                        style={{
                          backgroundColor:
                            dupliCoupon === coupon.coupon_id ? "#000035" : "",
                          color:
                            dupliCoupon === coupon.coupon_id ? "white" : "",
                        }}
                      >
                        적용
                      </div>
                    </div>
                  </div>
                );
              }
            })}
        </div>
        <div id="mobile" className="pay_btn" onClick={handlePaymentClick}>
          {salePrice.toLocaleString()}원 결제하기
        </div>
        <div className="space"></div>
      </div>

      {modalOpen && (
        // <Pay1Modal setModalOpen={setModalOpen} orderInfo={orderData} />
        <TossCheckoutPage setModalOpen={setModalOpen} orderInfo={orderData} />
      )}
    </div>
  );
};

export default PayAllS3;
