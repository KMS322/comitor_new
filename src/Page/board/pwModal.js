import "../../CSS/board.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../hooks/useInput";
import { CHECK_BOARD_REQUEST } from "../../reducers/board";
const PwModal = ({ setModalOpen, id, onPasswordSuccess }) => {
  const dispatch = useDispatch();
  const [board_pw, onChangePw] = useInput("");
  const { checkBoardDone, checkBoardError } = useSelector(
    (state) => state.board
  );

  const checkBoard = () => {
    dispatch({
      type: CHECK_BOARD_REQUEST,
      data: {
        board_pw,
        id,
      },
    });
  };

  useEffect(() => {
    if (checkBoardDone) {
      onPasswordSuccess(id);
    }
  }, [checkBoardDone, onPasswordSuccess, id]);

  useEffect(() => {
    if (checkBoardError) {
      alert("비밀번호가 틀렸습니다.");
      setModalOpen(null); // close PwModal if password is incorrect
    }
  }, [checkBoardError, setModalOpen]);

  return (
    <div className="pwModal_container">
      <div className="pwModal_header">
        <p></p>
        <button onClick={() => setModalOpen(false)}>닫기 X</button>
      </div>
      <div className="pwModal_content">
        <p>비밀번호를 입력해주세요.</p>
        <div className="input">
          <p>비밀번호 : </p>
          <input
            type="password"
            name="board_pw"
            value={board_pw}
            onChange={onChangePw}
          />
        </div>
      </div>
      <div className="btn_box">
        <p onClick={() => setModalOpen(null)}>취소</p>
        <p onClick={checkBoard}>확인</p>
      </div>
    </div>
  );
};

export default PwModal;
