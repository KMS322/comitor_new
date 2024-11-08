const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User } = require("../models");

module.exports = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: "/sns/google/callback",
        scope: ["profile", "email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("profile", profile);
        try {
          const exUser = await User.findOne({
            where: { platform_id: profile.id, platform_type: "google" },
          });
          if (exUser) {
            done(null, exUser);
          } else {
            const newUser = await User.create({
              user_id: profile.id,
              user_name: profile.displayName,
              platform_id: profile.id,
              platform_type: "google",
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
