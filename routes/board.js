const express = require("express");
const router = express.Router();
const { Board } = require("../models");

router.post("/add", async (req, res, next) => {
  try {
    await Board.create({
      board_title: req.body.board_title,
      board_content: req.body.board_content,
      board_password: req.body.board_pw,
    });
    res.status(200).send("ok");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/load", async (req, res, next) => {
  try {
    const allBoards = await Board.findAll({});
    res.status(201).json(allBoards);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/delete", async (req, res, next) => {
  try {
    console.log("req.body : ", req.body);
    const deletedBoard = await Board.destroy({
      where: {
        id: req.body.id,
      },
    });
    res.status(200).json(deletedBoard);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/read", async (req, res, next) => {
  try {
    const readBoard = await Board.findOne({
      where: { id: req.body.id },
    });
    res.status(201).json(readBoard);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/check", async (req, res, next) => {
  try {
    const checkBoard = await Board.findOne({
      where: { id: req.body.id },
    });
    if (checkBoard.board_password === req.body.board_pw) {
      res.status(201).send("ok");
    } else {
      res.status(403).send("비밀번호가 틀렸습니다.");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/addComment", async (req, res, next) => {
  try {
    await Board.update(
      {
        board_comment: req.body.board_comment,
        board_state: "답변완료",
      },
      {
        where: {
          id: req.body.id,
        },
      }
    );
    res.status(200).send("ok");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
