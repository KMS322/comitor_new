import React from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/modal.css";
import "../CSS/modal_mobile.css";

const Modal = ({ setModalOpen }) => {
  const navigate = useNavigate();
  return (
    <div className="modal_background">
      <div className="modal_container">
        <div className="modal_header">
          <h2>장바구니에 추가</h2>
          <button onClick={() => setModalOpen(false)}>X</button>
        </div>
        <div className="modal_content">
          <p>상품이 장바구니에 추가되었습니다.</p>
        </div>
        <div className="modal_footer">
          <button onClick={() => setModalOpen(false)}>닫기</button>
          <button
            onClick={() => {
              navigate("/cart");
            }}
          >
            장바구니로 이동
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
