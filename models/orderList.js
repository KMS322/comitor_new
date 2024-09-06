module.exports = (sequelize, DataTypes) => {
  const OrderList = sequelize.define(
    "OrderList",
    {
      order_code: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      user_id: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      order_name: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      order_phone: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      order_address: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      order_request: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  OrderList.associate = (db) => {};
  return OrderList;
};
