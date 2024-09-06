module.exports = (sequelize, DataTypes) => {
  const OrderProduct = sequelize.define(
    "OrderProduct",
    {
      order_code: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      product_code: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      product_cnt: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  OrderProduct.associate = (db) => {};
  return OrderProduct;
};
