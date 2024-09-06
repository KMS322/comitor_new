import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../CSS/signin.css";
import "../../CSS/signin_mobile.css";
const SigninContent = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(true);
  const [checked1, setChecked1] = useState(true);
  const goPage = (path) => {
    navigate(path);
  };
  return (
    <div className="signin_s1">
      <div className="section_container">
        <div className="article_container">
          <div className="title_box">
            <img
              src="/images/login/back_btn.png"
              alt=""
              onClick={() => {
                navigate(-1);
              }}
            />
            <img src="/images/logo.png" alt="" />
          </div>
          <p>
            환영합니다!
            <br />
            코미토르에 가입하시려면
            <br />
            약관에 동의해주세요.
          </p>
          <div className="check_box">
            {checked ? (
              <img
                src="/images/login/btn_checked.png"
                alt=""
                onClick={() => {
                  setChecked(!checked);
                }}
              />
            ) : (
              <img
                src="/images/login/btn_unchecked.png"
                alt=""
                onClick={() => {
                  setChecked(!checked);
                }}
              />
            )}

            <p>
              약관 전체 동의하기<span>(선택 동의 포함)</span>
            </p>
          </div>
          <div className="accept_box">
            <div className="accept">
              {checked1 ? (
                <img
                  src="/images/signin/accept_btn.png"
                  alt=""
                  onClick={() => {
                    setChecked1(!checked1);
                  }}
                />
              ) : (
                ""
              )}

              <p>[필수] 만 14세 이상입니다.</p>
            </div>
            <div className="accept">
              <img src="/images/signin/accept_btn.png" alt="" />
              <p>
                [필수] 개인정보 수집 및 이용 동의<span>자세히</span>
              </p>
            </div>
            <div className="accept">
              <img src="/images/signin/accept_btn.png" alt="" />
              <p>[선택] 광고성 정보 수신 동의</p>
            </div>
            <div className="accept">
              <img src="/images/signin/accept_btn.png" alt="" />
              <p>
                [선택] 개인정보 수집 및 이용 동의<span>자세히</span>
              </p>
            </div>
          </div>
          <div
            className="submit_btn"
            onClick={() => {
              goPage("/signForm");
            }}
          >
            동의하고 본인인증하기
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninContent;
