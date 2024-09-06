module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      user_id: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
      },
      user_pw: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      user_name: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      user_phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      user_jibunAddress: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      user_detailAddress: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      user_roadAddress: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      user_postcode: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      user_coupon: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  User.associate = (db) => {};
  return User;
};
