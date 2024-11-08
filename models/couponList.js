module.exports = (sequelize, DataTypes) => {
  const CouponList = sequelize.define(
    "CouponList",
    {
      coupon_id: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      user_id: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      used: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  CouponList.associate = (db) => {};
  return CouponList;
};
