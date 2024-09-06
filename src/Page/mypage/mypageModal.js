import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DaumPostcode from "react-daum-postcode";
import useInput from "../hooks/useInput";
import {
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PHONE_REQUEST,
  CHANGE_ADDRESS_REQUEST,
} from "../../reducers/user";
import "../../CSS/mypage.css";
import "../../CSS/mypage_mobile.css";

const MypageModal = ({ setModalOpen, me }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [changePwOpen, setChangePwOpen] = useState(false);
  const [changeAddressOpen, setChangeAddressOpen] = useState(false);
  const [currentPw, onChangeCurrentPw] = useInput("");
  const [newPw, onChangeNewPw] = useInput("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [user_phone, onChangePhone] = useInput("");
  const [user_jibunAddress, setJibunAddress] = useState("");
  const [user_roadAddress, setRoadAddress] = useState("");
  const [user_postcode, setPostcode] = useState("");
  const [user_detailAddress, onChangeDetailAddress] = useInput("");
  const [addressObj, setAddressObj] = useState("");
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const { changePhoneDone, changeAddressDone } = useSelector(
    (state) => state.user
  );

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== newPw);
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
    setAddressModalOpen(!addressModalOpen);
  };

  useEffect(() => {
    setJibunAddress(user_jibunAddress);
  }, [addressObj]);

  const userId = me.user_id;
  const changePassword = () => {
    if (passwordError) {
      alert("비밀번호를 확인해주세요.");
    } else {
      dispatch({
        type: CHANGE_PASSWORD_REQUEST,
        data: { userId, currentPw, newPw },
      });
    }
  };

  const changePhone = () => {
    if (user_phone) {
      dispatch({
        type: CHANGE_PHONE_REQUEST,
        data: { userId, user_phone },
      });
    } else {
      alert("변경할 전화번호를 입력해주세요.");
    }
  };

  useEffect(() => {
    if (changePhoneDone) {
      window.location.href = "/mypage";
      setModalOpen(true);
    }
  }, [changePhoneDone]);

  const changeAddress = () => {
    dispatch({
      type: CHANGE_ADDRESS_REQUEST,
      data: {
        userId,
        user_jibunAddress,
        user_roadAddress,
        user_postcode,
        user_detailAddress,
      },
    });
  };

  useEffect(() => {
    if (changeAddressDone) {
      window.location.href = "/mypage";
      setModalOpen(true);
    }
  }, [changeAddressDone]);

  return (
    <div className="modal_background">
      <div className="modal_container">
        <div className="modal_header">
          <h2>회원정보 변경</h2>
          <button onClick={() => setModalOpen(false)}>닫기 X</button>
        </div>
        <div className="modal_content">
          <div className="input_box">
            <p>이름</p>
            <input placeholder={me.user_name} disabled />
          </div>
          <div className="input_box">
            <p>아이디(이메일)</p>
            <input placeholder={me.user_id} disabled />
          </div>
          <div className="input_box">
            {changePwOpen ? (
              ""
            ) : (
              <>
                <div
                  className="changeBtn"
                  onClick={() => {
                    setChangePwOpen(true);
                  }}
                >
                  {changePwOpen ? "" : "비밀번호 변경하기"}
                </div>
              </>
            )}
          </div>
          {changePwOpen ? (
            <>
              <div className="input_box">
                <p>현재 비밀번호</p>
                <input
                  type="password"
                  name="currentPw"
                  value={currentPw}
                  onChange={onChangeCurrentPw}
                />
              </div>
              <div className="input_box">
                <p>새 비밀번호</p>
                <input
                  type="password"
                  name="newPw"
                  value={newPw}
                  onChange={onChangeNewPw}
                />
              </div>
              <div className="input_box">
                <p>새 비밀번호 확인</p>
                <input
                  type="password"
                  name="user_pwcheck"
                  value={passwordCheck}
                  onChange={onChangePasswordCheck}
                />
              </div>
              {passwordError && (
                <div style={{ color: "red" }}>
                  비밀번호가 일치하지 않습니다.
                </div>
              )}
              <div className="pwBtn">
                <p
                  onClick={() => {
                    setChangePwOpen(false);
                  }}
                >
                  취소
                </p>
                <p
                  onClick={() => {
                    changePassword();
                  }}
                >
                  변경
                </p>
              </div>
            </>
          ) : (
            ""
          )}
          <div className="input_box">
            <p>전화번호</p>
            <input
              type="tel"
              name="user_phone"
              value={user_phone}
              onChange={onChangePhone}
              placeholder={me.user_phone}
            />
          </div>

          <div
            className="phone_btn"
            onClick={() => {
              changePhone();
            }}
          >
            변경하기
          </div>
          {changeAddressOpen ? (
            <>
              <div className="input_box">
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
              {addressModalOpen && (
                <div>
                  <DaumPostcode
                    onComplete={handleComplete}
                    autoClose
                    animation
                  />
                </div>
              )}

              <div className="input_box">
                <p>상세주소</p>
                <input
                  type="text"
                  name="user_detailAddress"
                  value={user_detailAddress}
                  onChange={onChangeDetailAddress}
                />
              </div>
            </>
          ) : (
            <>
              <div className="input_box">
                <p>주소</p>
                <input placeholder={me.user_jibunAddress} disabled />
              </div>
              <div className="input_box">
                <p>상세주소</p>
                <input placeholder={me.user_detailAddress} disabled />
              </div>
            </>
          )}
          {changeAddressOpen ? (
            <div className="addressBtn">
              <p
                onClick={() => {
                  setChangeAddressOpen(false);
                }}
              >
                취소
              </p>
              <p
                onClick={() => {
                  changeAddress();
                }}
              >
                변경하기
              </p>
            </div>
          ) : (
            <div
              className="change_address"
              onClick={() => {
                setChangeAddressOpen(true);
              }}
            >
              주소 변경하기
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MypageModal;
