module.exports = (sequelize, DataTypes) => {
  const Banner = sequelize.define(
    "Banner",
    {
      banner_imgUrl: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  Banner.associate = (db) => {};
  return Banner;
};
