const express = require("express");
const router = express.Router();
const { OrderList } = require("../models");
const { OrderProduct } = require("../models");
const { Cart } = require("../models");
const { Review } = require("../models");
const dayjs = require("dayjs");

router.post("/add", async (req, res, next) => {
  try {
    const { orderInfo } = req.body;
    const {
      deliveryInfo,
      price,
      products,
      me,
      cartId,
      selectedCnt,
      uniqueCarts,
    } = req.body.orderInfo;
    const page = orderInfo.page;
    const orderCode = dayjs().format("YYYYMMDDHHmmss");
    let cnt = 0;
    if (page === "pay1") {
      cnt = 1;
    } else if (page === "payCart") {
      cnt = selectedCnt;
    }
    if (page !== "payAll") {
      await OrderList.create({
        order_id: 1,
        order_code: orderCode,
        user_id: me ? me.user_id : "non",
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

      if (page === "payCart") {
        await Cart.destroy({
          where: {
            id: cartId,
          },
        });
        if (me) {
          await Review.create({
            review_code: `${orderCode}/${products.product_code}/review`,
            order_code: orderCode,
            product_code: products.product_code,
            user_id: me.user_id,
          });
        }
      }
    } else {
      for (const cart of uniqueCarts) {
        await OrderList.create({
          order_id: 1,
          order_code: orderCode,
          user_id: me.user_id,
          order_name: deliveryInfo.name,
          order_phone: deliveryInfo.phone,
          order_address: deliveryInfo.address,
          order_request: deliveryInfo.request,
        });
        await OrderProduct.create({
          order_code: orderCode,
          product_code: cart.product_code,
          product_cnt: cart.product_cnt === 0 ? 1 : cart.product_cnt,
        });
        await Cart.destroy({
          where: {
            id: cart.id,
          },
        });
        if (me) {
          await Review.create({
            review_code: `${orderCode}/${products.product_code}/review`,
            order_code: orderCode,
            product_code: cart.product_code,
            user_id: me.user_id,
          });
        }
      }
    }

    // // // // // // // // // // // // // // // // // // // //

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
