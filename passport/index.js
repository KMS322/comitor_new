const passport = require("passport");
const local = require("./local");
const { User } = require("../models");
const kakao = require("./kakaoStrategy");
const naver = require("./naverStrategy");
const google = require("./googleStrategy");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ where: { id } });
      done(null, user);
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  local();
  kakao();
  naver();
  google();
};

passport._debug = true;
