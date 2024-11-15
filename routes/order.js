const express = require("express");
const router = express.Router();
const { OrderList } = require("../models");
const { OrderProduct } = require("../models");
const { Cart } = require("../models");
const { Review } = require("../models");
const dayjs = require("dayjs");

router.post("/add", async (req, res, next) => {
  try {
    const { deliveryInfo, price, products } = req.body.orderInfo;
    const { page } = req.body;
    let cnt = 0;
    if (page === "pay1") {
      cnt = 1;
    }

    const orderCode = dayjs().format("YYYYMMDDHHmmss");
    await OrderList.create({
      order_id: 1,
      order_code: orderCode,
      user_id: "non",
      order_name: deliveryInfo.name,
      order_phone: deliveryInfo.phone,
      order_address: deliveryInfo.address,
      order_request: deliveryInfo.request,
    });
    await OrderProduct.create({
      order_code: orderCode,
      product_code: products.product_code,
      product_cnt: cnt,
    });
    // for (const cart of carts) {
    //   await OrderProduct.create({
    //     order_code: order_code,
    //     product_code: cart.product_code,
    //     product_cnt: cart.product_saleCnt === 0 ? 1 : cart.product_saleCnt,
    //   });
    //   await Cart.destroy({
    //     where: {
    //       id: cart.id,
    //     },
    //   });
    //   if (me) {
    //     await Review.create({
    //       review_code: `${order_code}/review`,
    //       order_code: order_code,
    //       product_code: cart.product_code,
    //       user_id: me.user_id,
    //     });
    //   }
    // }

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
