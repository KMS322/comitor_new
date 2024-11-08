const passport = require("passport");
const NaverStrategy = require("passport-naver").Strategy;
const { User } = require("../models");

module.exports = () => {
  passport.use(
    new NaverStrategy(
      {
        clientID: process.env.NAVER_ID,
        callbackURL: "/sns/naver/callback",
        clientSecret: process.env.NAVER_SECRET,
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("profile1", profile);
        try {
          const exUser = await User.findOne({
            where: { platform_id: profile.id, platform_type: "naver" },
          });
          if (exUser) {
            done(null, exUser);
          } else {
            const newUser = await User.create({
              user_id: profile.id,
              user_name: profile.displayName,
              platform_id: profile.id,
              platform_type: "naver",
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
