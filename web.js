const express = require("express");
const path = require("path");
const app = express();

// 정적 파일을 제공할 경로 설정
app.use(express.static(path.join(__dirname, "build")));

// 모든 경로에 대해 index.html 제공 (React Router를 위한 설정)
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// 포트 설정
// const PORT = process.env.PORT || 8001;

app.listen(8001, () => {
  console.log(`Server is running on port 8001`);
});
