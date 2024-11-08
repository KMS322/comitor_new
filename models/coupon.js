module.exports = (sequelize, DataTypes) => {
  const Coupon = sequelize.define(
    "Coupon",
    {
      coupon_id: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
      },
      coupon_code: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
      },
      coupon_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      coupon_percent: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      coupon_price: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      coupon_period: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      coupon_imgUrl: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      coupon_duplication: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      coupon_type: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  Coupon.associate = (db) => {};
  return Coupon;
};
