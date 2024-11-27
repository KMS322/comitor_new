const express = require("express");
const passport = require("passport");
const router = express.Router();
const MAIN_URL = "http://localhost";

router.get("/kakao", passport.authenticate("kakao")); // 카카오톡 로그인 화면으로 redirect

router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/?loginError=카카오로그인 실패",
  }),
  (req, res) => {
    res.redirect(MAIN_URL);
  }
);

router.get("/naver", passport.authenticate("naver"));

router.get(
  "/naver/callback",
  passport.authenticate("naver", {
    failureRedirect: "/?loginError=네이버로그인 실패",
  }),
  (req, res) => {
    res.redirect(MAIN_URL);
  }
);

router.get("/google", passport.authenticate("google"));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/?loginError=구글로그인 실패",
  }),
  (req, res) => {
    res.redirect(MAIN_URL);
  }
);

module.exports = router;
