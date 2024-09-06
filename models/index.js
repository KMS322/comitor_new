const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.User = require("./user")(sequelize, Sequelize);
db.Product = require("./product")(sequelize, Sequelize);
db.Cart = require("./cart")(sequelize, Sequelize);
db.OrderList = require("./orderList")(sequelize, Sequelize);
db.OrderProduct = require("./orderProduct")(sequelize, Sequelize);
db.Board = require("./board")(sequelize, Sequelize);
db.Banner = require("./banner")(sequelize, Sequelize);
db.Coupon = require("./coupon")(sequelize, Sequelize);
db.Review = require("./review")(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
