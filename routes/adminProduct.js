const express = require("express");
const multer = require("multer");
const router = express.Router();
const { Product } = require("../models");
const fs = require("fs");
const path = require("path");

router.post("/upload", async (req, res, next) => {
  try {
    const createdProduct = await Product.create({
      product_code: req.body.product_code,
      product_name: req.body.product_name,
      product_originPrice: req.body.product_originPrice,
      product_salePrice: req.body.product_salePrice,
      product_imgUrl: req.body.mainImage,
      product_detailUrl: req.body.detailPage,
      product_saleCnt: 0,
    });
    res.status(201).send("ok");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

const storage1 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/mainImage");
  },
  filename: function (req, file, cb) {
    const originalName = file.originalname;
    cb(null, decodeURIComponent(originalName));
  },
});

const storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/detailPage");
  },
  filename: function (req, file, cb) {
    const originalName = file.originalname;
    cb(null, decodeURIComponent(originalName));
  },
});

const upload1 = multer({ storage: storage1 });
const upload2 = multer({ storage: storage2 });

router.post("/uploadFiles1", upload1.single("file"), async (req, res, next) => {
  try {
    const { originalname: file_name } = req.file;
    const decodeFileName = decodeURIComponent(file_name);

    res.status(201).send(`${decodeFileName} 등록 완료`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/uploadFiles2", upload2.single("file"), async (req, res, next) => {
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
    const allProducts = await Product.findAll({});
    res.status(200).json(allProducts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/delete", async (req, res, next) => {
  try {
    const exData = await Product.findAll({
      where: { product_code: req.body.code },
    });
    const deleteProduct = await Product.findOne({
      where: { product_code: req.body.code },
    });
    if (!deleteProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    const deletedProduct = await Product.destroy({
      where: { product_code: req.body.code },
    });
    const filePath1 = path.join(
      __dirname,
      "..",
      "public",
      "images",
      "mainImage",
      `${deleteProduct.product_imgUrl}`
    );
    const filePath2 = path.join(
      __dirname,
      "..",
      "public",
      "images",
      "detailPage",
      `${deleteProduct.product_detailUrl}`
    );

    const deletedId = deleteProduct.id;

    if (deleteProduct.product_imgUrl) {
      if (exData.length > 1) {
      } else {
        fs.unlink(filePath1, (err) => {
          if (err) {
            console.error("Error deleting file:", err);
            return res.status(500).send("Internal Server Error");
          }
          console.log("File deleted successfully1");
        });
      }
    }
    if (deleteProduct.product_detailUrl) {
      if (exData.length > 1) {
      } else {
        fs.unlink(filePath2, (err) => {
          if (err) {
            console.error("Error deleting file:", err);
            return res.status(500).send("Internal Server Error");
          }
          console.log("File deleted successfully2");
        });
      }
    }
    res.status(200).json({ id: deletedId });
  } catch (error) {
    console.error(error);
    next(error);
  }
});
module.exports = router;
