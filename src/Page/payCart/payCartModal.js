import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ADD_ORDER_REQUEST } from "../../reducers/order";
import "../../CSS/pay.css";
import "../../CSS/pay_mobile.css";

const PayCartModal = ({ setModalOpen, orderInfo }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [initialized, setInitialized] = useState(false);
  const page = "payCart";
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.iamport.kr/v1/iamport.js";
    script.async = true;

    script.onload = () => {
      window.IMP.init("imp63564407");
      setInitialized(true);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const IMP = window.IMP;
  var today = new Date();
  var hours = today.getHours(); // 시
  var minutes = today.getMinutes(); // 분
  var seconds = today.getSeconds(); // 초
  var milliseconds = today.getMilliseconds();
  var makeMerchantUid = hours + minutes + seconds + milliseconds;

  const requestPayment = (paymentMethod) => {
    addOrder();
    // if (!initialized) {
    //   console.error("IMP is not initialized");
    //   return;
    // }

    // const requestData = {
    //   name: orderInfo.products.product_name,
    //   amount: orderInfo.price,
    //   m_redirect_url: "http://localhost/",
    // };

    // switch (paymentMethod) {
    //   case "kgPay":
    //     requestData.pg = "html5_inicis";
    //     requestData.pay_method = "card";
    //     break;
    //   case "kakaoPay":
    //     requestData.pg = "kakaopay.TC0ONETIME";
    //     requestData.pay_method = "card";
    //     break;
    //   case "tossPay":
    //     requestData.pg = "tosspay.tosstest";
    //     requestData.pay_method = "card";
    //     requestData.merchant_uid = makeMerchantUid;
    //     break;
    //   default:
    //     console.error("Invalid payment method");
    //     return;
    // }

    // IMP.request_pay(requestData, function (rsp) {
    //   if (rsp.success) {
    //     console.log(rsp);
    //     addOrder();
    //   } else {
    //     console.log(rsp);
    //   }
    // });
  };

  const addOrder = () => {
    dispatch({
      type: ADD_ORDER_REQUEST,
      data: { orderInfo, page },
    });
    // window.location.href = "/complete";
  };

  return (
    <div className="payModal_background">
      <div className="payModal_container">
        <div className="payModal_header">
          <h2></h2>
          <button onClick={() => setModalOpen(false)}>닫기 X</button>
        </div>
        <div className="payModal_content">
          <p>결제 방법을 선택해주세요.</p>
          <div
            className="btn"
            onClick={() => {
              requestPayment("kgPay");
              // addOrder();
            }}
          >
            카드결제
          </div>
          <div
            className="btn"
            onClick={() => {
              requestPayment("kakaoPay");
              // addOrder();
            }}
          >
            카카오페이
          </div>
          <div
            className="btn"
            onClick={() => {
              requestPayment("tossPay");
              // addOrder();
            }}
          >
            토스페이
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayCartModal;
