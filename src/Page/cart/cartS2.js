import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_CART_REQUEST, DELETE_CART_REQUEST } from "../../reducers/cart";
import { LOAD_PRODUCT_REQUEST } from "../../reducers/adminProduct";
import "../../CSS/cart.css";
import "../../CSS/cart_mobile.css";
const CartS2 = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { carts, deleteCartDone } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.adminProduct);
  const [uniquecarts, setUniquecarts] = useState([]);
  const [uniqueProducts, setUniqueProducts] = useState([]);
  const [nowCarts, setNowCarts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const user = me && me.id;
    dispatch({
      type: LOAD_CART_REQUEST,
      data: { user },
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
        if (list && list.id && !existingIds.includes(list.id)) {
          uniqueLists.push(list);
          existingIds.push(list.id);
        }
      }

      return uniqueLists;
    };

    setUniquecarts(removeDuplicatesById(carts));
  }, [carts]);

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
  const uniqueCarts = removeDuplicatesById(carts);
  useEffect(() => {
    const updatedCarts = uniquecarts.map((cart) => ({
      ...cart,
      checked: true,
    }));
    setNowCarts(updatedCarts);
  }, [uniquecarts]);

  const cancelProduct = (cartId) => {
    dispatch({
      type: DELETE_CART_REQUEST,
      data: { cartId },
    });
  };

  useEffect(() => {
    if (deleteCartDone) {
      window.location.href = "/cart";
    }
  }, [deleteCartDone]);

  const toggleChecked = (cartId) => {
    setNowCarts((prevNowCarts) =>
      prevNowCarts.map((cart) => {
        if (cart.id === cartId) {
          return { ...cart, checked: !cart.checked };
        }
        return cart;
      })
    );
  };

  const toggleAllChecked = () => {
    const allChecked = nowCarts.every((cart) => cart.checked);

    const updatedCarts = nowCarts.map((cart) => ({
      ...cart,
      checked: !allChecked,
    }));

    setNowCarts(updatedCarts);
  };

  useEffect(() => {
    let total = 0;
    nowCarts.map((cart) => {
      if (cart.checked) {
        const product = uniqueProducts.find(
          (item) => item.product_code === cart.product_code
        );
        total += product.product_salePrice * cart.product_cnt;
      }
    });
    setTotalPrice(total);
  }, [nowCarts]);

  return (
    <div className="cart_s2">
      <div id="pc" className="section_container">
        <div className="article_container">
          <div className="title">
            <img
              src={
                nowCarts.every((product) => product.checked)
                  ? "/images/mypage/check_full.png"
                  : "/images/mypage/check_empty.png"
              }
              alt=""
              onClick={toggleAllChecked}
            />
            <p>상품정보</p>
            <p>상품금액</p>
            <p>수량</p>
            <p>주문금액</p>
            <p>배송 형태/배송비</p>
            <p></p>
          </div>
          {nowCarts.map((cart, index) => {
            const selectedProduct = uniqueProducts.find(
              (item) => item.product_code === cart.product_code
            );
            if (!selectedProduct) return null;
            return (
              <div className="content" key={index}>
                <img
                  src={
                    cart.checked
                      ? "/images/mypage/check_full.png"
                      : "/images/mypage/check_empty.png"
                  }
                  alt=""
                  onClick={() => toggleChecked(cart.id)}
                />
                <div className="item_box">
                  <img
                    src={`/images/mainImage/${selectedProduct.product_imgUrl}`}
                    alt=""
                  />
                  <p
                    dangerouslySetInnerHTML={{
                      __html: selectedProduct.product_name,
                    }}
                  ></p>
                </div>
                <div className="price_box">
                  <p>
                    {selectedProduct.product_originPrice.toLocaleString()}원
                  </p>
                  <p>{selectedProduct.product_salePrice.toLocaleString()}원</p>
                </div>
                <div className="count_box">
                  <div
                    onClick={() => {
                      setNowCarts((prevNowCarts) =>
                        prevNowCarts.map((item) =>
                          item.id === cart.id && item.product_cnt > 1
                            ? { ...item, product_cnt: item.product_cnt - 1 }
                            : item
                        )
                      );
                    }}
                  >
                    <img src="/images/product/minus_icon.png" alt="" />
                  </div>
                  <div>{cart.product_cnt}</div>
                  <div
                    onClick={() => {
                      setNowCarts((prevNowCarts) =>
                        prevNowCarts.map((item) =>
                          item.id === cart.id
                            ? { ...item, product_cnt: item.product_cnt + 1 }
                            : item
                        )
                      );
                    }}
                  >
                    <img src="/images/product/plus_icon.png" alt="" />
                  </div>
                </div>
                <p>
                  {(
                    selectedProduct.product_salePrice * cart.product_cnt
                  ).toLocaleString()}
                  원
                </p>
                <div className="delivery_box">
                  <p>택배배송</p>
                  <p>배송비 무료</p>
                </div>
                <div className="pay_box">
                  <div
                    onClick={() => {
                      navigate("/payCart", {
                        state: {
                          selectedProduct: selectedProduct,
                          selectedCnt: cart.product_cnt,
                          cartId: cart.id,
                        },
                      });
                    }}
                  >
                    주문하기
                  </div>
                  <div onClick={() => cancelProduct(cart.id)}>취소</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="total_price_box">
          <p>총 결제금액</p>
          <p>{totalPrice.toLocaleString()}원</p>
        </div>
        <div className="btn_box">
          <div
            className="btn"
            onClick={() => {
              navigate("/shop");
            }}
          >
            더 담으러 가기
          </div>
          <div
            className="btn"
            onClick={() => {
              const selectedCart = nowCarts.filter(
                (item) => item.checked === true
              );

              navigate("/payAll", { state: { selectedCart, uniqueCarts } });
              console.log("selectedCart : ", selectedCart);
              console.log("uniqueCarts : ", uniqueCarts);
            }}
          >
            주문하기
          </div>
        </div>
        <div className="space"></div>
      </div>
      <div id="mobile" className="article_container">
        <p>장바구니</p>
        <div className="row_head">
          <p>상품정보</p>
          <p>상품금액</p>
          <div>
            <p>주문금액</p>
            <p>배송형태/배송비</p>
          </div>
          <p>수량</p>
        </div>
        {nowCarts.map((cart, index) => {
          const selectedProduct = uniqueProducts.find(
            (item) => item.product_code === cart.product_code
          );
          if (!selectedProduct) return null;
          return (
            <React.Fragment key={index}>
              <div className="row_name">
                <img
                  src={
                    cart.checked
                      ? "/images/mypage/check_box_full.png"
                      : "/images/mypage/check_box_empty.png"
                  }
                  alt=""
                  onClick={() => toggleChecked(cart.id)}
                />
                <p>{selectedProduct.product_name}</p>
              </div>
              <div className="row_content">
                <img
                  src={`/images/mainImage/${selectedProduct.product_imgUrl}`}
                  alt=""
                />
                <div className="price_box">
                  <p>
                    {selectedProduct.product_originPrice.toLocaleString()}원
                  </p>
                  <p>{selectedProduct.product_salePrice.toLocaleString()}원</p>
                </div>
                <div className="delivery_box">
                  <p>
                    {(
                      selectedProduct.product_salePrice * cart.product_cnt
                    ).toLocaleString()}
                    원
                  </p>
                  <p>택배배송/배송비무료</p>
                </div>
                <div className="count_box">
                  <div
                    onClick={() => {
                      setNowCarts((prevNowCarts) =>
                        prevNowCarts.map((item) =>
                          item.id === cart.id && item.product_cnt > 1
                            ? { ...item, product_cnt: item.product_cnt - 1 }
                            : item
                        )
                      );
                    }}
                  >
                    <img src="/images/product/minus_icon.png" alt="" />
                  </div>
                  <div>{cart.product_cnt}</div>
                  <div
                    onClick={() => {
                      setNowCarts((prevNowCarts) =>
                        prevNowCarts.map((item) =>
                          item.id === cart.id
                            ? { ...item, product_cnt: item.product_cnt + 1 }
                            : item
                        )
                      );
                    }}
                  >
                    <img src="/images/product/plus_icon.png" alt="" />
                  </div>
                </div>
              </div>
              <div
                className="pay_btn"
                onClick={() => {
                  const selectedCart = nowCarts.filter(
                    (item) => item.checked === true
                  );
                  navigate("/pay", { state: { selectedCart } });
                }}
              >
                총 {totalPrice.toLocaleString()}원 주문하기
              </div>
            </React.Fragment>
          );
        })}

        <div
          className="more_btn"
          onClick={() => {
            navigate("/shop");
          }}
        >
          더 담으러 가기
        </div>
      </div>
    </div>
  );
};

export default CartS2;
