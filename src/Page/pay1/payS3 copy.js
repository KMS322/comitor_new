import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import PayModal from "./payModal";
import "../../CSS/pay.css";
import "../../CSS/pay_mobile.css";
const PayS3 = ({ carts, deliveryInfo, price }) => {
  // console.log("carts : ", carts);
  // console.log("deliveryInfo : ", deliveryInfo);
  // console.log("price : ", price);
  const navigate = useNavigate();
  const location = useLocation();
  const noCouponPrice =
    location.state.selectedProduct &&
    location.state.selectedProduct.product_salePrice;
  const noCouponCnt =
    location.state.selectedProduct && location.state.selectedCnt;
  const { products } = useSelector((state) => state.adminProduct);
  const { coupons } = useSelector((state) => state.coupon);
  const { me } = useSelector((state) => state.user);
  const selectedProduct = location.state && location.state.selectedProduct;
  const selectedCnt = location.state && location.state.selectedCnt;
  console.log("pay mobile selectedProduct : ", selectedProduct);
  console.log("pay mobile selectedCnt : ", selectedCnt);
  const [totalPrice, setTotalPrice] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  const [onCoupon, setOnCoupon] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [orderData, setOrderData] = useState();
  useEffect(() => {
    let total = 0;
    carts &&
      carts.map((cart) => {
        if (cart.checked) {
          const product = products.find(
            (item) => item.product_code === cart.product_code
          );
          total += product.product_salePrice * cart.product_cnt;
        }
      });
    if (!carts) {
      setTotalPrice(noCouponPrice * selectedCnt);
    } else {
      setTotalPrice(total);
    }
  }, [carts]);

  const handlePaymentClick = () => {
    let price = 0;
    if (onCoupon) {
      price = salePrice;
    }
    if (carts) {
      const data = {
        me,
        carts,
        deliveryInfo,
        price: price,
      };
      setOrderData(data);
    } else {
      const data = {
        carts: [selectedProduct],
        me,
        deliveryInfo,
        price: selectedProduct.product_salePrice * selectedCnt,
      };
      setOrderData(data);
    }

    setModalOpen(true);
  };

  const addSale = () => {
    setOnCoupon(!onCoupon);
    let sale = 0;
    if (coupons[0].coupon_percent === 0) {
      sale = coupons[0].coupon_price;
    } else if (coupons[0].coupon_price === 0) {
      sale = (totalPrice * coupons[0].coupon_percent) / 100;
    }
    setSalePrice(sale);
  };
  return (
    <div className="pay_s3">
      {carts ? (
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
            {carts &&
              carts.map((cart, index) => {
                const selectedProduct = products.find(
                  (item) => item.product_code === cart.product_code
                );
                return (
                  <div className="row_content" key={index}>
                    <div className="item_box">
                      <img
                        src={`/images/mainImage/${selectedProduct.product_imgUrl}`}
                        alt=""
                      />
                      <p
                      // dangerouslySetInnerHTML={{
                      //   __html: selectedProduct.product_name,
                      // }}
                      >
                        {selectedProduct.product_name}
                      </p>
                    </div>
                    <p>{cart.product_cnt}</p>
                    <p>
                      {" "}
                      {me && me.user_coupon && coupons[0].coupon_name
                        ? "1개"
                        : "없음"}
                    </p>
                    <p>무료</p>
                    <p>
                      {price
                        ? (
                            selectedProduct.product_salePrice *
                              cart.product_cnt -
                            price
                          ).toLocaleString()
                        : (
                            selectedProduct.product_salePrice * cart.product_cnt
                          ).toLocaleString()}
                      원
                    </p>
                  </div>
                );
              })}
            <div className="coupon_box">
              {/* <p
                onClick={() => {
                  addSale();
                }}
              >
                {onCoupon ? "쿠폰 사용 ●" : "쿠폰 사용 ○"}
              </p> */}
              {onCoupon ? (
                <p
                  onClick={() => {
                    addSale();
                  }}
                >
                  쿠폰 사용 <span>●</span>
                </p>
              ) : (
                <p
                  onClick={() => {
                    addSale();
                  }}
                >
                  쿠폰 사용 <span className="empty">○</span>
                </p>
              )}
            </div>
            {onCoupon ? (
              <div className="sale_price_box">
                <p>할인 금액</p>
                <p>{salePrice.toLocaleString()}원</p>
              </div>
            ) : (
              ""
            )}
            <div className="total_price_box">
              <p>총 결제금액</p>
              <p>
                {onCoupon
                  ? (totalPrice - salePrice).toLocaleString()
                  : totalPrice.toLocaleString()}
                원
              </p>
            </div>
            <div className="btn_box">
              <div className="btn" onClick={handlePaymentClick}>
                결제하기
              </div>
            </div>
          </div>
          {
            <div id="mobile" className="article_container">
              {typeof me !== "undefined" ? (
                me === 0 ? (
                  carts.map((cartProduct, index) => {
                    console.log("carts : ", carts);
                    return (
                      <>
                        <div className="row_product">
                          <p
                            dangerouslySetInnerHTML={{
                              __html: cartProduct.name,
                            }}
                          ></p>
                          <img src={cartProduct.imageUrl} alt="" />
                        </div>
                        <div className="row_head">
                          <p>수량</p>
                          <p>상품 할인</p>
                          <p>배송비</p>
                          <p>주문금액</p>
                        </div>
                        <div className="row_content">
                          <p>{cartProduct.cnt}</p>
                          <p>없음</p>
                          <p>무료</p>
                          <p>
                            {(
                              cartProduct.price * cartProduct.cnt
                            ).toLocaleString()}
                            원
                          </p>
                        </div>{" "}
                      </>
                    );
                  })
                ) : (
                  <></>
                  // <>
                  //   <div className="row_product">
                  //     <p
                  //       dangerouslySetInnerHTML={{ __html: cartProduct.name }}
                  //     ></p>
                  //     <img src={cartProduct.imageUrl} alt="" />
                  //   </div>
                  //   <div className="row_head">
                  //     <p>수량</p>
                  //     <p>상품 할인</p>
                  //     <p>배송비</p>
                  //     <p>주문금액</p>
                  //   </div>
                  //   <div className="row_content">
                  //     <p>{cartProduct.cnt}</p>
                  //     <p>없음</p>
                  //     <p>무료</p>
                  //     <p>
                  //       {(cartProduct.price * cartProduct.cnt).toLocaleString()}
                  //       원
                  //     </p>
                  //   </div>
                  // </>
                )
              ) : null}
            </div>
          }
          {/* {typeof id !== "undefined" ? (
          id === 0 ? (
            <div
              className="pay_btn"
              onClick={() => {
                navigate("/complete");
              }}
            >
              {totalAmount.toLocaleString()}원 결제하기
            </div>
          ) : (
            <div
              className="pay_btn"
              onClick={() => {
                navigate("/complete");
              }}
            >
              {(cartProduct.price * cartProduct.cnt).toLocaleString()}원
              결제하기
            </div>
          )
        ) : null} */}

          <div className="space"></div>
        </div>
      ) : selectedProduct ? (
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
            <div className="row_content">
              <div className="item_box">
                <img
                  src={`/images/mainImage/${selectedProduct.product_imgUrl}`}
                  alt=""
                />
                <p
                // dangerouslySetInnerHTML={{
                //   __html: selectedProduct.product_name,
                // }}
                >
                  {selectedProduct.product_name}
                </p>
              </div>
              <p>{selectedCnt}</p>
              <p>
                {me && me.user_coupon && coupons[0].coupon_name
                  ? "1개"
                  : "없음"}
              </p>
              <p>무료</p>
              <p>
                {salePrice
                  ? (
                      selectedProduct.product_salePrice * selectedCnt -
                      salePrice
                    ).toLocaleString()
                  : (
                      selectedProduct.product_salePrice * selectedCnt
                    ).toLocaleString()}
                원
              </p>
            </div>

            <div className="coupon_box">
              <p
                onClick={() => {
                  addSale();
                }}
              >
                {me ? (onCoupon ? "쿠폰 사용 ●" : "쿠폰 사용 ○") : ""}
              </p>
            </div>
            {onCoupon ? (
              <div className="sale_price_box">
                <p>할인 금액</p>
                <p>{salePrice.toLocaleString()}원</p>
              </div>
            ) : (
              ""
            )}
            <div className="total_price_box">
              <p>총 결제금액</p>
              <p>
                {carts
                  ? salePrice
                    ? (
                        selectedProduct.product_salePrice * selectedCnt -
                        salePrice
                      ).toLocaleString()
                    : (
                        selectedProduct.product_salePrice * selectedCnt
                      ).toLocaleString()
                  : onCoupon
                  ? salePrice
                  : noCouponPrice * noCouponCnt}
                {/* {salePrice
                  ? (
                      selectedProduct.product_salePrice * selectedCnt -
                      salePrice
                    ).toLocaleString()
                  : (
                      selectedProduct.product_salePrice * selectedCnt
                    ).toLocaleString()} */}
                원
              </p>
            </div>
            <div className="btn_box">
              <div className="btn" onClick={handlePaymentClick}>
                결제하기
              </div>
            </div>
          </div>
          {/* <div id="mobile" className="article_container">
          {typeof id !== "undefined" ? (
            id === 0 ? (
              cartProducts.map((cartProduct, index) => {
                return (
                  <>
                    <div className="row_product">
                      <p
                        dangerouslySetInnerHTML={{ __html: cartProduct.name }}
                      ></p>
                      <img src={cartProduct.imageUrl} alt="" />
                    </div>
                    <div className="row_head">
                      <p>수량</p>
                      <p>상품 할인</p>
                      <p>배송비</p>
                      <p>주문금액</p>
                    </div>
                    <div className="row_content">
                      <p>{cartProduct.cnt}</p>
                      <p>없음</p>
                      <p>무료</p>
                      <p>
                        {(cartProduct.price * cartProduct.cnt).toLocaleString()}
                        원
                      </p>
                    </div>{" "}
                  </>
                );
              })
            ) : (
              <>
                <div className="row_product">
                  <p dangerouslySetInnerHTML={{ __html: cartProduct.name }}></p>
                  <img src={cartProduct.imageUrl} alt="" />
                </div>
                <div className="row_head">
                  <p>수량</p>
                  <p>상품 할인</p>
                  <p>배송비</p>
                  <p>주문금액</p>
                </div>
                <div className="row_content">
                  <p>{cartProduct.cnt}</p>
                  <p>없음</p>
                  <p>무료</p>
                  <p>
                    {(cartProduct.price * cartProduct.cnt).toLocaleString()}원
                  </p>
                </div>
              </>
            )
          ) : null}
        </div> */}
          {/* {typeof id !== "undefined" ? (
          id === 0 ? (
            <div
              className="pay_btn"
              onClick={() => {
                navigate("/complete");
              }}
            >
              {totalAmount.toLocaleString()}원 결제하기
            </div>
          ) : (
            <div
              className="pay_btn"
              onClick={() => {
                navigate("/complete");
              }}
            >
              {(cartProduct.price * cartProduct.cnt).toLocaleString()}원
              결제하기
            </div>
          )
        ) : null} */}

          <div className="space"></div>
        </div>
      ) : (
        ""
      )}

      {modalOpen && (
        <PayModal setModalOpen={setModalOpen} orderInfo={orderData} />
      )}
    </div>
  );
};

export default PayS3;
