const express = require("express");
const multer = require("multer");
const router = express.Router();
const { Banner } = require("../models");
const fs = require("fs");
const path = require("path");

router.post("/add", async (req, res, next) => {
  try {
    const addedBanner = await Banner.create({
      banner_imgUrl: req.body.bannerImage,
    });
    res.status(201).send("ok");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/bannerImage");
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
    const allBanners = await Banner.findAll({});

    res.status(200).json(allBanners);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/delete", async (req, res, next) => {
  try {
    const selectedBanner = await Banner.findOne({
      where: { id: req.body.id },
    });

    const filePath = path.join(
      __dirname,
      "../public/images/bannerImage",
      selectedBanner.banner_imgUrl
    );

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
        return next(err);
      }
      console.log("File deleted successfully");
    });

    const deletedBanner = await Banner.destroy({
      where: {
        id: req.body.id,
      },
    });
    res.status(200).json(deletedBanner);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
module.exports = router;
