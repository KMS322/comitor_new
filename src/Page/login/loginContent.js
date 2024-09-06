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

  const kakao_key = "b6977866e6c277d06be9e176a7eb4f53"; // 카카오 클라이언트 ID 설정
  const redirect_uri_kakao = "http://localhost:3060/auth/kakao"; // 카카오 리다이렉트 URI 설정

  const naver_key = "I29zGq7rrwlCWpGwNe45"; // 네이버 클라이언트 ID 설정
  const redirect_uri_naver = "http://localhost:3000/auth/naver"; // 네이버 리다이렉트 URI 설정

  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakao_key}&redirect_uri=${redirect_uri_kakao}&response_type=code`;
  const naverURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naver_key}&redirect_uri=${redirect_uri_naver}&state=STATE_STRING`;

  const kakaoLogin = () => {
    window.location.href = kakaoURL;
  };
  const naverLogin = () => {
    window.location.href = naverURL;
  };
  return (
    <div className="login_s1">
      <div className="section_container">
        <div className="article_container">
          <div className="title_box">
            <img src="/images/login/back_btn.png" alt="" />
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
        </div>
      </div>
    </div>
  );
};

export default LoginContent;
