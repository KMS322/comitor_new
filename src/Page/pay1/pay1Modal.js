import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ADD_ORDER_REQUEST } from "../../reducers/order";
import PortOne from "@portone/browser-sdk/v2";
import { randomId } from "./lib/random";
import "../../CSS/pay.css";
import "../../CSS/pay_mobile.css";

const Pay1Modal = ({ setModalOpen, orderInfo }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState({
    status: "IDLE",
  });

  useEffect(() => {
    async function loadItem() {
      const response = await fetch("/api/item");
      setItem(await response.json());
    }

    loadItem().catch((error) => console.error(error));
  }, []);

  if (item == null) {
    return (
      <dialog open>
        <article aria-busy>결제 정보를 불러오는 중입니다.</article>
      </dialog>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPaymentStatus({ status: "PENDING" });
    const paymentId = randomId();
    const payment = await PortOne.requestPayment({
      storeId: process.env.VITE_STORE_ID,
      channelKey: process.env.VITE_CHANNEL_KEY,
      paymentId,
      orderName: item.name,
      totalAmount: item.price,
      currency: item.currency,
      payMethod: "VIRTUAL_ACCOUNT",
      virtualAccount: {
        accountExpiry: {
          validHours: 1,
        },
      },
      customData: {
        item: item.id,
      },
    });

    if (payment.code != null) {
      setPaymentStatus({
        status: "FAILED",
        message: payment.message,
      });
      return;
    }

    const completeResponse = await fetch("/api/payment/complete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentId: payment.paymentId,
      }),
    });

    if (completeResponse.ok) {
      const paymentComplete = await completeResponse.json();
      setPaymentStatus({
        status: paymentComplete.status,
      });
    } else {
      setPaymentStatus({
        status: "FAILED",
        message: await completeResponse.text(),
      });
    }
  };

  const isWaitingPayment = paymentStatus.status !== "IDLE";

  const handleClose = () =>
    setPaymentStatus({
      status: "IDLE",
    });

  const addOrder = () => {
    dispatch({
      type: ADD_ORDER_REQUEST,
      data: { orderInfo },
    });
    navigate("/complete");
  };

  return (
    <div className="payModal_background">
      <div className="payModal_container">
        <div className="payModal_header">
          <h2>결제</h2>
          <button onClick={() => setModalOpen(false)}>닫기 X</button>
        </div>
        <div className="payModal_content">
          <p>결제 방법을 선택해주세요.</p>
          <button
            className="btn"
            onClick={handleSubmit} // handleSubmit으로 변경
          >
            결제하기
          </button>
          {paymentStatus.status === "FAILED" && (
            <p className="error">{paymentStatus.message}</p>
          )}
          {paymentStatus.status === "PAID" && (
            <button className="btn" onClick={addOrder}>
              주문 완료하기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pay1Modal;
