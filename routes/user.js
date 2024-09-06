const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { User } = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ["user_pw"],
        },
      });
      res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ["user_pw"],
        },
      });
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

router.post("/logout", isLoggedIn, (req, res) => {
  req.logout(() => {
    // res.redirect("/");
  });
  res.status(201).send("ok");
});

router.post("/signup", isNotLoggedIn, async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        user_id: req.body.user_id,
      },
    });
    if (exUser) {
      return res.status(403).send("이미 사용중인 아이디 입니다.");
    }
    const hashedPassword = await bcrypt.hash(req.body.user_pw, 12);

    const createdUser = await User.create({
      user_id: req.body.user_id,
      user_pw: hashedPassword,
      user_name: req.body.user_name,
      user_phone: req.body.user_phone,
      user_jibunAddress: req.body.user_jibunAddress,
      user_roadAddress: req.body.user_roadAddress,
      user_postcode: req.body.user_postcode,
      user_detailAddress: req.body.user_detailAddress,
    });

    res.status(201).send("ok");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/checkId", isNotLoggedIn, async (req, res, next) => {
  try {
    if (req.body.user_id) {
      const sameIdUser = await User.findOne({
        where: {
          user_id: req.body.user_id,
        },
      });
      if (sameIdUser) {
        return res.status(403).send("이미 사용중인 아이디 입니다.");
      }
    } else if (req.body.user_id) {
      const sameIdUser = await User.findOne({
        where: {
          user_id: req.body.user_id,
        },
      });
      if (sameIdUser) {
        return res.status(403).send("이미 사용중인 아이디 입니다.");
      }
    }

    return res.status(200).send("사용하실 수 있는 아이디 입니다.");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/changePassword", isLoggedIn, async (req, res, next) => {
  try {
    const changeUser = await User.findOne({
      where: {
        user_id: req.body.userId,
      },
    });
    const currentPasswordMatch = await bcrypt.compare(
      req.body.currentPw,
      changeUser.user_pw
    );

    if (!currentPasswordMatch) {
      return res.status(401).send("현재 비밀번호가 일치하지 않습니다.");
    }
    const hashedNewPassword = await bcrypt.hash(req.body.newPw, 12);
    changeUser.user_pw = hashedNewPassword;
    await changeUser.save();

    res.status(200).send("비밀번호가 성공적으로 변경되었습니다.");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/changePhone", isLoggedIn, async (req, res, next) => {
  try {
    const changeUser = await User.findOne({
      where: {
        user_id: req.body.userId,
      },
    });

    changeUser.user_phone = req.body.user_phone;
    await changeUser.save();

    res.status(200).send("전화번호가 성공적으로 변경되었습니다.");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/changeAddress", isLoggedIn, async (req, res, next) => {
  try {
    console.log("req.body :", req.body);
    const changeUser = await User.findOne({
      where: {
        user_id: req.body.userId,
      },
    });

    changeUser.user_jibunAddress = req.body.user_jibunAddress;
    changeUser.user_roadAddress = req.body.user_roadAddress;
    changeUser.user_postcode = req.body.user_postcode;
    changeUser.user_detailAddress = req.body.user_detailAddress;
    await changeUser.save();

    res.status(200).send("주소가 성공적으로 변경되었습니다.");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
