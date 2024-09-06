import "../../CSS/board.css";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_READ_REQUEST } from "../../reducers/board";
const ReadModal = ({ setModalOpen, id }) => {
  const dispatch = useDispatch();
  const { read } = useSelector((state) => state.board);

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
  return (
    <div className="readModal_container">
      <div className="readModal_header">
        <h2></h2>
        <button
          onClick={() => {
            setModalOpen(false);
            window.location.href = "/board";
          }}
        >
          닫기 X
        </button>
      </div>
      <div className="readModal_content">
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
            <div className="text_box">
              <p>답변내용</p>
              <div>
                <p>
                  {readContent.board_comment ||
                    "아직 답변이 등록되지 않았습니다."}
                </p>
              </div>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default ReadModal;
