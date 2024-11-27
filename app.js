const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const dotenv = require("dotenv");
const userRouter = require("./routes/user");
const adminProductRouter = require("./routes/adminProduct");
const cartRouter = require("./routes/cart");
const orderRouter = require("./routes/order");
const boardRouter = require("./routes/board");
const bannerRouter = require("./routes/banner");
const couponRouter = require("./routes/coupon");
const reviewRouter = require("./routes/review");
const snsRouter = require("./routes/sns");
const paymentsRouter = require("./routes/payments");

const tossRouter = require("./routes/payments.router");
// const listRouter = require("./routes/list");
// const contactRouter = require("./routes/contact");
// const dummyRouter = require("./routes/dummy");
// const logoRouter = require("./routes/logo");
// const popupRouter = require("./routes/popup");
const db = require("./models");
const path = require("path");
const passportConfig = require("./passport");

dotenv.config();
const app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log("db connected");
  })
  .catch(console.err);

passportConfig();

app.use(
  cors({
    origin: [
      // "http://localhost",
      // "http://localhost:80",
      // "http://183.111.126.111:80",
      // "http://183.111.126.111",
      "http://comitor.shop",
      "http://comitor.shop:80",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
    credentials: true,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.get("/", (req, res) => {
  res.send("server on1");
});

app.use("/user", userRouter);
app.use("/adminProduct", adminProductRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);
app.use("/board", boardRouter);
app.use("/banner", bannerRouter);
app.use("/coupon", couponRouter);
app.use("/review", reviewRouter);
app.use("/sns", snsRouter);
app.use("/paymentsRouter", paymentsRouter);
app.use("/sandbox-dev/api/v1/payments", tossRouter);
// app.use("/list", listRouter);
// app.use("/contact", contactRouter);
// app.use("/dummy", dummyRouter);
// app.use("/logo", logoRouter);
// app.use("/popup", popupRouter);

const port = 3060;
app.listen(port, () => {
  console.log(`server on ${port}`);
});
