import "../../CSS/board.css";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../hooks/useInput";
import { LOAD_READ_REQUEST, ADD_COMMENT_REQUEST } from "../../reducers/board";
const CommentModal = ({ setModalOpen, id }) => {
  const dispatch = useDispatch();
  const { read, addCommentDone } = useSelector((state) => state.board);
  const [board_comment, onChangeComment] = useInput("");
  useEffect(() => {
    dispatch({
      type: LOAD_READ_REQUEST,
      data: { id },
    });
  }, [dispatch, id]);

  const removeDuplicatesById = (lists) => {
    if (!lists || !Array.isArray(lists)) {
      return [];
    }
    const uniqueLists = [];
    const existingIds = [];

    for (const list of lists) {
      if (list && list.id && !existingIds.includes(list.id)) {
        uniqueLists.push(list);
        existingIds.push(list.id);
      }
    }

    return uniqueLists;
  };
  const uniqueRead = removeDuplicatesById(read);

  const readContent =
    uniqueRead && uniqueRead.length > 0 ? uniqueRead[0] : null;

  const addComment = () => {
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: {
        id,
        board_comment,
      },
    });
  };

  useEffect(() => {
    if (addCommentDone) {
      window.location.href = "/board";
    }
  }, [addCommentDone]);
  return (
    <div className="commentModal_container">
      <div className="commentModal_header">
        <h2>답변쓰기</h2>
        <button onClick={() => setModalOpen(false)}>닫기 X</button>
      </div>
      <div className="commentModal_content">
        {readContent ? (
          <>
            <div className="text_box">
              <p>제목</p>
              <div>
                <p>{readContent.board_title}</p>
              </div>
            </div>
            <div className="text_box">
              <p>내용</p>
              <div>
                <p>{readContent.board_content}</p>
              </div>
            </div>
            <div className="input">
              <p>답변내용</p>
              <textarea
                type="text"
                name="board_comment"
                value={board_comment}
                onChange={onChangeComment}
                placeholder={
                  (readContent && readContent.board_comment) ||
                  "답변을 입력하세요"
                }
              />
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="btn_box">
        <p onClick={() => setModalOpen(false)}>취소</p>
        <p
          onClick={() => {
            addComment();
          }}
        >
          {readContent && readContent.board_comment ? "수정" : "등록"}
        </p>
      </div>
    </div>
  );
};

export default CommentModal;
