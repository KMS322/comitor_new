import React, { useCallback, useState, useEffect } from "react";
import useInput from "../hooks/useInput";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOG_IN_REQUEST } from "../../reducers/user";
import "../../CSS/login.css";
import "../../CSS/login_mobile.css";

const LoginContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logInDone, logInError } = useSelector((state) => state.user);

  const [user_id, onChangeId] = useInput("");
  const [user_pw, onChangePw] = useInput("");

  useEffect(() => {
    if (logInDone) {
      navigate("/");
    }
  }, [logInDone]);

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

  const kakaoLogin = () => {
    window.location.href = "http://localhost:3060/sns/kakao";
  };

  const naverLogin = () => {
    window.location.href = "http://localhost:3060/sns/naver";
  };

  const googleLogin = () => {
    window.location.href = "http://localhost:3060/sns/google";
  };

  return (
    <div className="login_s1">
      <div className="section_container">
        <div className="article_container">
          <div className="title_box">
            <img
              src="/images/login/back_btn.png"
              alt=""
              onClick={() => {
                navigate("/");
              }}
            />
            <p>로그인</p>
          </div>
          <div className="input_box">
            <input
              placeholder="아이디"
              type="text"
              name="user_id"
              value={user_id}
              onChange={onChangeId}
            />
            <input
              placeholder="비밀번호"
              type="password"
              name="user_pw"
              value={user_pw}
              onChange={onChangePw}
            />
            <div className="submit_btn" onClick={onSubmitForm}>
              로그인
            </div>
          </div>
          <div className="sub_box">
            <div className="auto_login_box">
              <img src="/images/login/check_btn.png" alt="" />
              <p>자동로그인</p>
            </div>
            <div className="find_box">
              <p>아이디 찾기</p>
              <p>비밀번호 찾기</p>
            </div>
          </div>
          <div
            className="signin_btn"
            onClick={() => {
              navigate("/signin");
            }}
          >
            회원가입
          </div>
          <div className="kakao_btn">
            <img src="/images/login/kakao.png" alt="" />
            <p
              onClick={() => {
                kakaoLogin();
              }}
            >
              카카오 로그인
            </p>
          </div>
          <div className="kakao_btn">
            <img src="/images/login/kakao.png" alt="" />
            <p
              onClick={() => {
                naverLogin();
              }}
            >
              네이버 로그인
            </p>
          </div>
          <div className="kakao_btn">
            <img src="/images/login/kakao.png" alt="" />
            <p
              onClick={() => {
                googleLogin();
              }}
            >
              구글 로그인
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginContent;
