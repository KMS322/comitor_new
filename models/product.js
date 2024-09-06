module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      product_code: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
      },
      product_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      product_originPrice: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      product_salePrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product_imgUrl: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      product_detailUrl: {
        type: DataTypes.STRING(50),
        allonwNull: true,
      },
      product_saleCnt: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  Product.associate = (db) => {};
  return Product;
};
