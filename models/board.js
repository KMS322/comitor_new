module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define(
    "Board",
    {
      board_title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      board_content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      board_password: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      board_state: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      board_comment: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  Board.associate = (db) => {};
  return Board;
};
