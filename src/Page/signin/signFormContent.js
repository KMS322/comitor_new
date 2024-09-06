import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../hooks/useInput";
import DaumPostcode from "react-daum-postcode";
import { SIGN_UP_REQUEST, CHECK_ID_REQUEST } from "../../reducers/user";
import "../../CSS/signForm.css";
import "../../CSS/signForm_mobile.css";

const SignFormContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { signUpDone, signUpError, checkIdDone, checkIdError } = useSelector(
    (state) => state.user
  );
  const [idChecked, setIdChecked] = useState(false);

  const [user_id, onChangeId] = useInput("");
  const [user_pw, onChangePw] = useInput("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [user_name, onChangeName] = useInput("");
  const [user_phone, onChangePhone] = useInput("");
  const [user_jibunAddress, setJibunAddress] = useState("");
  const [user_roadAddress, setRoadAddress] = useState("");
  const [user_postcode, setPostcode] = useState("");
  const [user_detailAddress, onChangeDetailAddress] = useInput("");
  const [addressObj, setAddressObj] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const checkId = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({
        type: CHECK_ID_REQUEST,
        data: {
          user_id,
        },
      });
    },
    [user_id, idChecked]
  );

  useEffect(() => {
    if (checkIdDone) {
      alert("사용 가능한 아이디입니다.");
      setIdChecked(user_id);
    }
  }, [checkIdDone]);
  useEffect(() => {
    if (checkIdError) {
      alert("사용하실 수 없는 아이디입니다.");
      setIdChecked(false);
    }
  }, [checkIdError]);

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== user_pw);
    },
    [passwordCheck]
  );

  const handleComplete = (data) => {
    setJibunAddress(data.jibunAddress);
    if (!data.jibunAddress) {
      setJibunAddress(data.autoJibunAddress);
    }
    setRoadAddress(data.roadAddress);
    if (!data.roadAddress) {
      setRoadAddress(data.address);
    }
    setPostcode(data.zonecode);
    if (data.addressType === "R") {
      setAddressObj(data.jibunAddress);
      if (!data.jibunAddress) {
        setAddressObj(data.autoJibunAddress);
      }
    }
  };

  const handleClick = () => {
    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    setJibunAddress(user_jibunAddress);
  }, [addressObj]);

  const onSubmitForm = useCallback(
    (e) => {
      if (idChecked) {
        e.preventDefault();

        dispatch({
          type: SIGN_UP_REQUEST,
          data: {
            user_id,
            user_pw,
            user_name,
            user_phone,
            user_jibunAddress,
            user_roadAddress,
            user_postcode,
            user_detailAddress,
          },
        });
      } else {
        alert("아이디 중복확인을 해주세요.");
      }
    },
    [
      user_id,
      user_pw,
      user_name,
      user_phone,
      user_jibunAddress,
      user_roadAddress,
      user_postcode,
      user_detailAddress,
    ]
  );

  useEffect(() => {
    if (signUpDone) {
      navigate("/");
    }
  }, [signUpDone]);

  return (
    <div className="signForm_s1">
      <div className="section_container">
        <div className="article_container">
          <div className="title_box">
            <img src="/images/login/back_btn.png" alt="" />
            <p>회원가입</p>
          </div>
          <div className="input_container">
            <div className="input input_address">
              <p>아이디(이메일 형식)</p>
              <div className="btn_box">
                <input
                  type="text"
                  // type="email"
                  name="user_id"
                  value={user_id}
                  onChange={onChangeId}
                />
                <div
                  className="checked_btn"
                  style={{ backgroundColor: idChecked ? "#000035" : "#919191" }}
                  onClick={checkId}
                >
                  {idChecked ? "확인 완료" : "중복 확인"}
                </div>
              </div>
            </div>
            <div className="input">
              <p>
                비밀번호<span>8글자 이상으로 입력하세요.</span>
              </p>
              <input
                type="password"
                name="user_pw"
                value={user_pw}
                onChange={onChangePw}
              />
            </div>
            <div
              className="input"
              style={{ marginBottom: passwordError ? "0vw" : "1.72vw" }}
            >
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
            <div className="input">
              <p>이름</p>
              <input
                type="text"
                name="user_name"
                value={user_name}
                onChange={onChangeName}
              />
            </div>
            <div className="input">
              <p>핸드폰</p>
              <input
                type="tel"
                name="user_phone"
                value={user_phone}
                onChange={onChangePhone}
              />
            </div>
            <div className="input input_address">
              <p>주소</p>
              <div className="btn_box">
                <input
                  type="text"
                  name="user_jibunAddress"
                  value={user_jibunAddress}
                  className="input_btn"
                  readOnly
                />
                <div
                  className="address_btn"
                  onClick={() => {
                    setJibunAddress("");
                    handleClick();
                  }}
                >
                  주소 검색
                </div>
              </div>
            </div>
            {modalOpen && (
              <div>
                <DaumPostcode onComplete={handleComplete} autoClose animation />
              </div>
            )}
            <div className="input">
              <p>상세주소</p>
              <input
                type="text"
                name="user_detailAddress"
                value={user_detailAddress}
                onChange={onChangeDetailAddress}
              />
            </div>
            <div className="submit_btn" onClick={onSubmitForm}>
              완료
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignFormContent;
