import React, { useState, useEffect } from "react";
import "../../CSS/pay.css";
import "../../CSS/pay_mobile.css";
const PayS2 = ({ me, onDeliveryInfoChange }) => {
  const [checked, setChecked] = useState();
  const [deliveryRequest, setDeliveryRequest] = useState("문 앞");
  const [customRequest, setCustomRequest] = useState("");
  const [customName, setCustomName] = useState("");
  const [customPhone, setCustomPhone] = useState("");
  const [customAddress, setCustomAddress] = useState("");
  const handleRequestChange = (e) => {
    setDeliveryRequest(e.target.value);
  };
  useEffect(() => {
    if (me) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [me]);
  useEffect(() => {
    const deliveryInfo = {
      name: checked ? me?.user_name || "" : customName,
      phone: checked ? me?.user_phone || "" : customPhone,
      address: checked
        ? me
          ? `${me.user_roadAddress} ${me.user_detailAddress}`
          : ""
        : customAddress,
      request:
        deliveryRequest === "직접 입력" ? customRequest : deliveryRequest,
    };
    onDeliveryInfoChange(deliveryInfo);
  }, [
    checked,
    me,
    customName,
    customPhone,
    customAddress,
    deliveryRequest,
    customRequest,
    onDeliveryInfoChange,
  ]);
  return (
    <div className="pay_s2">
      <div className="section_container">
        <p>배송정보</p>
        <div className="article_container">
          <div className="row">
            <div className="row_head">배송지</div>
            <div className="row_content">
              <div className="check_box">
                <img
                  src={
                    checked
                      ? "/images/pay/checked_img.png"
                      : "/images/pay/unchecked_img.png"
                  }
                  alt=""
                  onClick={() => {
                    if (me) {
                      if (checked === false) {
                        setChecked(!checked);
                      }
                    }
                  }}
                />
                <p>기본 배송지</p>
              </div>
              <div className="check_box">
                <img
                  src={
                    checked
                      ? "/images/pay/unchecked_img.png"
                      : "/images/pay/checked_img.png"
                  }
                  alt=""
                  onClick={() => {
                    if (checked === true) {
                      setChecked(!checked);
                    }
                  }}
                />
                <p>직접 입력</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="row_head">이름 / 연락처</div>
            <div id="pc" className="row_content name_box">
              {checked ? (
                me ? (
                  `${me.user_name}  |  ${me.user_phone}`
                ) : (
                  ""
                )
              ) : (
                <>
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="이름을 입력하세요"
                  />
                  <input
                    type="text"
                    value={customPhone}
                    onChange={(e) => setCustomPhone(e.target.value)}
                    placeholder="연락처를 입력하세요"
                  />
                </>
              )}
            </div>
            <div id="mobile" className="row_content">
              {checked ? (
                me ? (
                  <>
                    {me.user_name}
                    <br />
                    {me.user_phone}
                  </>
                ) : (
                  ""
                )
              ) : (
                <>
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="이름을 입력하세요"
                  />
                  <input
                    type="text"
                    value={customPhone}
                    onChange={(e) => setCustomPhone(e.target.value)}
                    placeholder="연락처를 입력하세요"
                  />
                </>
              )}
            </div>
          </div>
          <div className="row">
            <div className="row_head">주소</div>
            <div className="row_content address_box">
              {checked ? (
                me ? (
                  `${me.user_roadAddress} ${me.user_detailAddress}`
                ) : (
                  ""
                )
              ) : (
                <input
                  type="text"
                  value={customAddress}
                  onChange={(e) => setCustomAddress(e.target.value)}
                  placeholder="주소를 입력하세요"
                />
              )}
            </div>
          </div>
          <div className="row">
            <div className="row_head">배송 요청사항</div>
            <div className="row_content">
              <select value={deliveryRequest} onChange={handleRequestChange}>
                <option value="문 앞">문 앞</option>
                <option value="직접 받고 부재시 문 앞">
                  직접 받고 부재시 문 앞
                </option>
                <option value="직접 입력">직접 입력</option>
              </select>
              {deliveryRequest === "직접 입력" && (
                <input
                  type="text"
                  value={customRequest}
                  onChange={(e) => setCustomRequest(e.target.value)}
                  placeholder="요청사항을 입력하세요"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayS2;
