const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 80;
const fs = require("fs");
app.use(express.static(path.join(__dirname, "build")));
app.use("/images", express.static(path.join(__dirname, "public/images")));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const publicImagesPath = path.join(__dirname, "public/images");
const mainImagePath = path.join(publicImagesPath, "mainImage");
const bannerImagePath = path.join(publicImagesPath, "bannerImage");
const detailPagePath = path.join(publicImagesPath, "detailPage");
if (!fs.existsSync(mainImagePath)) {
  fs.mkdirSync(mainImagePath);
}
if (!fs.existsSync(bannerImagePath)) {
  fs.mkdirSync(bannerImagePath);
}
if (!fs.existsSync(detailPagePath)) {
  fs.mkdirSync(detailPagePath);
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
