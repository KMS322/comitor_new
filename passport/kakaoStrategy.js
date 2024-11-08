const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
const { User } = require("../models");

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_ID,
        callbackURL: "/sns/kakao/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("profile", profile);
        try {
          const exUser = await User.findOne({
            where: { platform_id: profile.id, platform_type: "kakao" },
          });
          if (exUser) {
            done(null, exUser);
          } else {
            const newUser = await User.create({
              user_id: profile.id,
              user_name: profile.displayName,
              platform_id: profile.id,
              platform_type: "kakao",
            });
            done(null, newUser);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
