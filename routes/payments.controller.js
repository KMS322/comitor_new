// read-only
const service = require("./payments.service");

async function confirmPayment(req, res, next) {
  console.log("req.body : ", req.body);
  console.log("req.body : ", req.query);
  const confirmResponse = await service.confirmPayment(req.query);

  return res.json({ data: confirmResponse });
}

module.exports = {
  confirmPayment,
};
