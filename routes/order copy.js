const express = require("express");
const router = express.Router();
const { OrderList } = require("../models");
const { OrderProduct } = require("../models");
const { Cart } = require("../models");
const { Review } = require("../models");

router.post("/add", async (req, res, next) => {
  try {
    const { carts, deliveryInfo, me } = req.body.orderInfo;
    console.log("req.body.orderInfo : ", req.body.orderInfo);
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const currentTime = `${year}${month}${day}-${hours}:${minutes}:${seconds}`;
    const userId = carts[0].user_id ? carts[0].user_id : "non";
    const order_code = `${currentTime}/${me.user_id}`;
    await OrderList.create({
      order_id: 1,
      order_code: order_code,
      user_id: me ? me.user_id : "non",
      order_name: deliveryInfo.name,
      order_phone: deliveryInfo.phone,
      order_address: deliveryInfo.address,
      order_request: deliveryInfo.request,
    });
    for (const cart of carts) {
      await OrderProduct.create({
        order_code: order_code,
        product_code: cart.product_code,
        product_cnt: cart.product_saleCnt === 0 ? 1 : cart.product_saleCnt,
      });
      await Cart.destroy({
        where: {
          id: cart.id,
        },
      });
      if (me) {
        await Review.create({
          review_code: `${order_code}/review`,
          order_code: order_code,
          product_code: cart.product_code,
          user_id: me.user_id,
        });
      }
    }

    res.status(201).send("ok");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/load", async (req, res, next) => {
  try {
    const allLists = await OrderList.findAll({});
    const allProducts = await OrderProduct.findAll({});

    const sendOrder = { allLists, allProducts };
    res.status(200).json(sendOrder);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/delete", async (req, res, next) => {
  try {
    const deletedOrder = await OrderList.findOne({
      where: { order_code: req.body.code },
    });
    await OrderList.destroy({
      where: { order_code: req.body.code },
    });
    await OrderProduct.destroy({
      where: { order_code: req.body.code },
    });
    res.status(200).json(deletedOrder);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/loadUser", async (req, res, next) => {
  try {
    const orderLists = await OrderList.findAll({
      where: { user_id: req.body.userId },
    });
    const allProducts = await OrderProduct.findAll({});

    const orderProducts = orderLists.reduce((acc, order) => {
      const relatedProducts = allProducts.filter(
        (product) => product.order_code === order.order_code
      );
      return [...acc, ...relatedProducts];
    }, []);
    // const sendOrder = { orderLists, orderProducts };
    // console.log("sendOrder : ", sendOrder);
    console.log("orderProducts : ", orderProducts);
    res.status(200).json(orderProducts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
