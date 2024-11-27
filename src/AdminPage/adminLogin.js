import "../CSS/adminLogin.css";
import React, { useState, useEffect, useCallback } from "react";
import useInput from "../Page/hooks/useInput";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOG_IN_REQUEST } from "../reducers/user";
const AdminLogin = () => {
  const dispatch = useDispatch();
  const { logInDone, me, logInError } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [user_id, onChangeId] = useInput("");
  const [user_pw, onChangePw] = useInput("");
  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();

      dispatch({
        type: LOG_IN_REQUEST,
        data: {
          user_id,
          user_pw,
        },
      });
    },
    [user_id, user_pw]
  );
  useEffect(() => {
    if (me && logInDone) {
      window.location.href = "/adminMain";
    }
  }, [me, logInDone]);
  useEffect(() => {
    if (logInDone) {
      navigate("/adminMain", { state: { me } });
    }
  }, [logInDone]);
  useEffect(() => {
    if (logInError) {
      alert(logInError);
      // onChangeId("");
      // onChangePw("");
      window.location.href = "/admin";
    }
  }, [logInError]);
  return (
    <>
      <div className="adminLogin">
        <p>로그인</p>
        <div className="input_box">
          <input
            placeholder="아이디"
            type="text"
            name="user_id"
            value={user_id && user_id}
            onChange={onChangeId}
          />
          <input
            placeholder="비밀번호"
            type="password"
            name="user_pw"
            value={user_pw && user_pw}
            onChange={onChangePw}
          />
        </div>
        <div className="text_box">
          <p
            onClick={() => {
              navigate("/adminSignup");
            }}
          >
            관리자 계정 가입
          </p>
          {/* <p>비밀번호 찾기/변경</p> */}
        </div>
        <div className="btn" onClick={onSubmitForm}>
          로그인
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
