module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    "Review",
    {
      review_code: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      product_code: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      order_code: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      review_comment: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      star_point: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      review_imgUrl1: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      review_imgUrl2: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      review_imgUrl3: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  Review.associate = (db) => {};
  return Review;
};
