import "../../CSS/board.css";
import "../../CSS/board_mobile.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_BOARD_REQUEST, DELETE_BOARD_REQUEST } from "../../reducers/board";
import WriteModal from "./writeModal";
import ReadModal from "./readModal";
import PwModal from "./pwModal";
import PwModal2 from "./pwModal2";
import CommentModal from "./commentModal";
const BoardContent = () => {
  const dispatch = useDispatch();
  const { boardLists, deleteBoardDone } = useSelector((state) => state.board);
  const { me } = useSelector((state) => state.user);
  const [writeModalOpen, setWriteModalOpen] = useState(false);
  const [pwModalOpen, setPwModalOpen] = useState(null);
  const [pwModal2Open, setPwModal2Open] = useState(null);
  const [readModalOpen, setReadModalOpen] = useState(null);
  const [commentModalOpen, setCommentModalOpen] = useState(null);

  useEffect(() => {
    dispatch({
      type: LOAD_BOARD_REQUEST,
    });
  }, [dispatch]);
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
  const uniqueBoardLists = removeDuplicatesById(boardLists);
  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const formattedDate = date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    return `${formattedDate}`;
  };

  const handlePasswordSuccess = (id) => {
    setPwModalOpen(null);
    setReadModalOpen(id);
  };
  const handlePasswordSuccess2 = (id) => {
    setPwModal2Open(null);
    dispatch({
      type: DELETE_BOARD_REQUEST,
      data: { id },
    });
  };
  const closeReadModal = () => {
    setReadModalOpen(null);
  };

  useEffect(() => {
    if (deleteBoardDone) {
      window.location.href = "/board";
    }
  }, [deleteBoardDone]);
  return (
    <div className="board_container">
      <p className="title">문의게시판</p>
      <div className="table">
        <div className="head_row row">
          <p>번호</p>
          <p>제목</p>
          <p>등록일</p>
          <p>답변여부</p>
          <p></p>
        </div>
        {uniqueBoardLists &&
          uniqueBoardLists.map((list, index) => {
            return (
              <div className="content_row row" key={index}>
                <p>{index + 1}</p>
                <p
                  onClick={() => {
                    setPwModalOpen(list.id);
                  }}
                >
                  {list.board_title}
                </p>
                <p>{formatDateTime(list.createdAt)}</p>
                {me && me.user_id === "ubuntu0516" ? (
                  <p
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setCommentModalOpen(list.id);
                    }}
                  >
                    {list.board_state === "답변완료" ? "답변등록" : "답변대기"}
                  </p>
                ) : (
                  <p>
                    {list.board_state === "답변완료" ? "답변등록" : "답변대기"}
                  </p>
                )}
                <p
                  onClick={() => {
                    setPwModal2Open(list.id);
                  }}
                >
                  삭제
                </p>
              </div>
            );
          })}
        <div
          className="btn_box"
          onClick={() => {
            setWriteModalOpen(true);
          }}
        >
          문의작성
        </div>
      </div>

      {writeModalOpen && <WriteModal setModalOpen={setWriteModalOpen} />}
      {pwModalOpen && (
        <PwModal
          setModalOpen={setPwModalOpen}
          id={pwModalOpen}
          onPasswordSuccess={handlePasswordSuccess}
        />
      )}
      {pwModal2Open && (
        <PwModal2
          setModalOpen={setPwModal2Open}
          id={pwModal2Open}
          onPasswordSuccess={handlePasswordSuccess2}
        />
      )}
      {readModalOpen && (
        <ReadModal setModalOpen={closeReadModal} id={readModalOpen} />
      )}
      {commentModalOpen && (
        <CommentModal
          setModalOpen={setCommentModalOpen}
          id={commentModalOpen}
        />
      )}
    </div>
  );
};

export default BoardContent;
