const express = require("express");
const bodyParser = require("body-parser");
const PortOne = require("@portone/server-sdk");

const portOne = PortOne.PortOneClient(process.env.V2_API_SECRET);

const router = express.Router();

// 결제 항목 검증 함수
function verifyPayment(payment) {
  if (payment.customData == null) return false;
  const customData = JSON.parse(payment.customData);
  const item = items.get(customData.item);
  if (item == null) return false;
  return (
    payment.orderName === item.name &&
    payment.amount.total === item.price &&
    payment.currency === item.currency
  );
}

// 결제 상태 동기화 함수
const paymentStore = new Map();
async function syncPayment(paymentId) {
  if (!paymentStore.has(paymentId)) {
    paymentStore.set(paymentId, { status: "PENDING" });
  }
  const payment = paymentStore.get(paymentId);
  let actualPayment;
  try {
    actualPayment = await portOne.payment.getPayment(paymentId); // 실제 결제 정보 가져오기
  } catch (e) {
    if (e instanceof PortOne.Errors.PortOneError) return false;
    throw e;
  }
  if (actualPayment == null) return false;
  switch (actualPayment.status) {
    case "PAID":
      if (!verifyPayment(actualPayment)) return false;
      payment.status = "PAID";
      console.info("결제 성공", actualPayment);
      break;
    case "VIRTUAL_ACCOUNT_ISSUED":
      payment.status = "VIRTUAL_ACCOUNT_ISSUED";
      break;
    default:
      return false;
  }
  return payment;
}

// 결제 항목 데이터 (예시)
const items = new Map([
  [
    "shoes",
    {
      name: "나이키 멘즈 조이라이드 플라이니트",
      price: 1000,
      currency: "KRW",
    },
  ],
]);

// 아이템 정보 조회 엔드포인트
router.get("/item", (req, res) => {
  console.log("AA");
  const id = "shoes";
  res.json({
    id,
    ...items.get(id),
  });
});

// 결제 완료 처리 엔드포인트
router.post("/payment/complete", async (req, res, next) => {
  try {
    const { paymentId } = req.body;
    if (typeof paymentId !== "string")
      return res.status(400).send("올바르지 않은 요청입니다.").end();
    const payment = await syncPayment(paymentId);
    if (!payment) return res.status(400).send("결제 동기화에 실패했습니다.");
    res.status(200).json({
      status: payment.status,
    });
  } catch (e) {
    next(e);
  }
});

// 결제 웹훅 처리 엔드포인트
router.post("/payment/webhook", async (req, res, next) => {
  try {
    try {
      const webhook = await PortOne.Webhook.verify(
        process.env.V2_WEBHOOK_SECRET,
        req.body,
        req.headers
      );
      if ("paymentId" in webhook.data)
        await syncPayment(webhook.data.paymentId);
    } catch (e) {
      if (e instanceof PortOne.Webhook.WebhookVerificationError)
        return res.status(400).end();
      throw e;
    }
    res.status(200).end();
  } catch (e) {
    next(e);
  }
});

module.exports = router;
