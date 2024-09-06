import "../CSS/adminSignup.css";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../Page/hooks/useInput";
import { SIGN_UP_REQUEST } from "../reducers/user";
const AdminSignup = () => {
  const dispatch = useDispatch();
  const [user_id, onChangeId] = useInput("");
  const [user_pw, onChangePw] = useInput("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [adminPwCheck, setAdminPwCheck] = useState("");
  const { signUpDone } = useSelector((state) => state.user);
  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== user_pw);
    },
    [passwordCheck]
  );
  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();

      dispatch({
        type: SIGN_UP_REQUEST,
        data: {
          user_id,
          user_pw,
        },
      });
    },
    [user_id, user_pw]
  );
  useEffect(() => {
    if (signUpDone) {
      window.location.href = "/admin";
    }
  }, [signUpDone]);
  return (
    <>
      <div className="adminSignup">
        <p>관리자 회원 가입</p>
        <div className="input_box_container">
          <div className="input_box">
            <p>아이디</p>
            <input
              type="text"
              name="user_id"
              value={user_id}
              onChange={onChangeId}
            />
          </div>
          <div className="input_box">
            <p>비밀번호</p>
            <input
              type="password"
              name="user_pw"
              value={user_pw}
              onChange={onChangePw}
            />
          </div>
          <div className="input_box">
            <p>비밀번호 확인</p>
            <input
              type="password"
              name="user_pwcheck"
              value={passwordCheck}
              onChange={onChangePasswordCheck}
            />
          </div>
          {passwordError && (
            <div style={{ color: "red", marginBottom: "1.72vw" }}>
              비밀번호가 일치하지 않습니다.
            </div>
          )}
        </div>

        <div className="btn" onClick={onSubmitForm}>
          회원가입
        </div>
      </div>
    </>
  );
};

export default AdminSignup;
