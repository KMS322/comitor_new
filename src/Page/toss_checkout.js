import { useEffect, useRef, useState } from "react";
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
const generateRandomString = () => window.btoa(Math.random()).slice(0, 20);

const clientKey = "test_gck_XZYkKL4MrjeEkp2RjEnBV0zJwlEW";
// const clientKey = "live_gck_Ba5PzR0ArnW4K0EmjDeo8vmYnNeD";

const TossCheckoutPage = ({ setModalOpen, orderInfo }) => {
  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState(null);
  const [amount, setAmount] = useState({
    currency: "KRW",
    value: orderInfo?.price,
  });
  console.log("orderInfo : ", orderInfo);
  console.log("amount : ", amount);
  useEffect(() => {
    async function fetchPaymentWidgets() {
      const tossPayments = await loadTossPayments(clientKey);
      const widgets = tossPayments.widgets({ customerKey: ANONYMOUS });
      setWidgets(widgets);
    }

    fetchPaymentWidgets();
  }, [clientKey]);

  useEffect(() => {
    async function renderPaymentWidgets() {
      if (widgets == null) {
        return;
      }
      /**
       * 위젯의 결제금액을 결제하려는 금액으로 초기화하세요.
       * renderPaymentMethods, renderAgreement, requestPayment 보다 반드시 선행되어야 합니다.
       * @docs https://docs.tosspayments.com/sdk/v2/js#widgetssetamount
       */
      await widgets.setAmount(amount);

      await Promise.all([
        /**
         * 결제창을 렌더링합니다.
         * @docs https://docs.tosspayments.com/sdk/v2/js#widgetsrenderpaymentmethods
         */
        widgets.renderPaymentMethods({
          selector: "#payment-method",
          // 렌더링하고 싶은 결제 UI의 variantKey
          // 결제 수단 및 스타일이 다른 멀티 UI를 직접 만들고 싶다면 계약이 필요해요.
          // @docs https://docs.tosspayments.com/guides/v2/payment-widget/admin#새로운-결제-ui-추가하기
          variantKey: "DEFAULT",
        }),
        /**
         * 약관을 렌더링합니다.
         * @docs https://docs.tosspayments.com/reference/widget-sdk#renderagreement선택자-옵션
         */
        widgets.renderAgreement({
          selector: "#agreement",
          variantKey: "AGREEMENT",
        }),
      ]);

      setReady(true);
    }

    renderPaymentWidgets();
  }, [widgets]);

  return (
    <div className="wrapper w-100 toss">
      <div className="max-w-540 w-100">
        <div
          className="toss_delete_btn"
          onClick={() => {
            setModalOpen(false);
          }}
        >
          X
        </div>
        <div id="payment-method" className="w-100" />
        <div id="agreement" className="w-100" />
        <div className="btn-wrapper w-100">
          <button
            className="btn primary w-100"
            onClick={async () => {
              try {
                const successUrl =
                  window.location.origin +
                  "/toss/success?orderInfo=" +
                  encodeURIComponent(JSON.stringify(orderInfo));
                /**
                 * 결제 요청
                 * 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
                 * 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
                 * @docs https://docs.tosspayments.com/sdk/v2/js#widgetsrequestpayment
                 */
                await widgets?.requestPayment({
                  orderId: generateRandomString(),
                  orderName:
                    Array.isArray(orderInfo.uniqueCarts) &&
                    orderInfo.uniqueCarts.length > 0
                      ? `${orderInfo.uniqueCarts[0].product_name} 외 ${
                          orderInfo.uniqueCarts.length - 1
                        }건`
                      : orderInfo.products.product_name,
                  customerName: orderInfo.deliveryInfo.name,
                  // customerEmail: "customer123@gmail.com",
                  // successUrl:
                  //   window.location.origin +
                  //   "/toss/success" +
                  //   window.location.search,
                  // failUrl:
                  //   window.location.origin +
                  //   "/toss/fail" +
                  //   window.location.search,
                  successUrl:
                    window.location.origin +
                    "/toss/success?orderInfo=" +
                    encodeURIComponent(JSON.stringify(orderInfo)),
                  failUrl:
                    window.location.origin +
                    "/toss/fail?orderInfo=" +
                    encodeURIComponent(JSON.stringify(orderInfo)),
                });
              } catch (error) {
                // TODO: 에러 처리
              }
            }}
          >
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default TossCheckoutPage;
