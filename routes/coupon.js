const express = require("express");
const multer = require("multer");
const router = express.Router();
const { Coupon } = require("../models");
const { User } = require("../models");
const fs = require("fs");
const path = require("path");

router.post("/add", async (req, res, next) => {
  try {
    const addedCoupon = await Coupon.create({
      coupon_code: req.body.coupon_code,
      coupon_name: req.body.coupon_name,
      coupon_percent: req.body.percent,
      coupon_price: req.body.price,
      coupon_period: req.body.coupon_period,
      coupon_imgUrl: req.body.couponImage,
    });
    res.status(201).send("ok");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/coupon");
  },
  filename: function (req, file, cb) {
    const originalName = file.originalname;
    cb(null, decodeURIComponent(originalName));
  },
});
const upload = multer({ storage: storage });
router.post("/uploadFiles", upload.single("file"), async (req, res, next) => {
  try {
    const { originalname: file_name } = req.file;
    const decodeFileName = decodeURIComponent(file_name);

    res.status(201).send(`${decodeFileName} 등록 완료`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/load", async (req, res, next) => {
  try {
    const allCoupons = await Coupon.findAll({});
    res.status(201).json(allCoupons);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/delete", async (req, res, next) => {
  try {
    const selectedCoupon = await Coupon.findOne({
      where: { id: req.body.id },
    });

    const filePath = path.join(
      __dirname,
      "../public/images/coupon",
      selectedCoupon.coupon_imgUrl
    );

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
        return next(err);
      }
      console.log("File deleted successfully");
    });

    const deletedCoupon = await Coupon.destroy({
      where: {
        id: req.body.id,
      },
    });
    res.status(200).json(deletedCoupon);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/accept", async (req, res, next) => {
  try {
    const loginUser = await User.findOne({
      where: { id: Number(req.body.userId) },
    });
    if (loginUser.user_coupon !== req.body.couponCode) {
      await User.update(
        {
          user_coupon: req.body.couponCode,
        },
        { where: { id: Number(req.body.userId) } }
      );
    }

    res.status(200).send("ok");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
