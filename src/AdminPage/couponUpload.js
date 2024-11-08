import "../CSS/couponUpload.css";
import React, { useState, useEffect, useCallback } from "react";
import useInput from "../Page/hooks/useInput";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ADD_COUPON_REQUEST } from "../reducers/coupon";
const CouponUpload = ({ handlePopup, datas }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addCouponDone } = useSelector((state) => state.coupon);
  const [coupon_code, onChangeCode] = useInput("");
  const [coupon_name, onChangeName] = useInput("");
  const [coupon_percent, onChangePercent] = useInput("");
  const [coupon_price, onChangePrice] = useInput("");
  const [coupon_period, onChangePeriod] = useInput("");
  const [couponImage, setCouponImage] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
  const [couponType, setCouponType] = useState("all");
  const [duplication, setDuplication] = useState("impossibility");
  const handleFileChange = (e) => {
    const attachedFile = e.target.files[0];
    setCouponImage(attachedFile);
    setSelectedFileName(attachedFile ? attachedFile.name : "");
  };

  const sendData = async (e) => {
    e.preventDefault();
    try {
      if (!couponImage) {
        alert("쿠폰 이미지를 선택해주세요.");
        return;
      }

      const formData = new FormData();
      formData.append(
        "file",
        couponImage,
        encodeURIComponent(couponImage.name)
      );
      const response = await axios.post("/coupon/uploadFiles", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      let percent;
      let price;
      if (!coupon_percent) {
        percent = 0;
        price = coupon_price;
      }
      if (!coupon_price) {
        price = 0;
        percent = coupon_percent;
      }
      dispatch({
        type: ADD_COUPON_REQUEST,
        data: {
          coupon_code,
          coupon_name,
          percent,
          price,
          coupon_period,
          couponImage: selectedFileName,
          couponType,
          duplication,
        },
      });
    } catch (error) {
      console.error("Error uploading files", error);
    }
  };

  useEffect(() => {
    if (addCouponDone) {
      handlePopup();
      // navigate("/adminCoupons");
      window.location.href = "/adminCoupons";
    }
  }, [addCouponDone]);

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
  const uniqueCoupons = removeDuplicatesById(datas);
  console.log("uniqueCoupons : ", uniqueCoupons);
  const allCoupon = uniqueCoupons.find(
    (coupon) => coupon.coupon_type === "all"
  );
  useEffect(() => {
    if (allCoupon) {
      setCouponType("specific");
    }
  }, [allCoupon]);

  return (
    <div className="couponUpload">
      <img src="/images/delete_btn.png" alt="" onClick={handlePopup} />
      <div className="form_container">
        <div className="input_container">
          <div className="input_box">
            <p>쿠폰코드</p>
            <input
              type="text"
              name="coupon_code"
              value={coupon_code}
              onChange={onChangeCode}
            />
          </div>
          <div className="input_box">
            <p>쿠폰명</p>
            <input
              type="text"
              name="coupon_name"
              value={coupon_name}
              onChange={onChangeName}
            />
          </div>
          <div className="input_box">
            <p>
              퍼센트 할인(숫자만 입력하세요. 30% 할인시 ex: 30)(가격 할인시
              비워주세요.)
            </p>
            <input
              type="number"
              name="coupon_percent"
              value={coupon_percent}
              onChange={onChangePercent}
            />
          </div>
          <div className="input_box">
            <p>
              가격 할인(숫자만 입력하세요. 15000원 할인시 ex: 15000)(퍼센트
              할인시 비워주세요.)
            </p>
            <input
              type="number"
              name="coupon_price"
              value={coupon_price}
              onChange={onChangePrice}
            />
          </div>
          <div className="input_box">
            <p>쿠폰 마감 기한(숫자로 입력하세요. ex: 241225)</p>
            <input
              type="number"
              name="coupon_period"
              value={coupon_period}
              onChange={onChangePeriod}
            />
          </div>
          <div className="radio_box">
            <p>허용 범위 설정</p>
            <div className="radio_container">
              {allCoupon ? (
                <div className="radio">
                  <p>모두에게 허용</p>
                  <div
                    className="radio_circle"
                    // onClick={() => {
                    //   setCouponType("all");
                    // }}
                    style={{
                      backgroundColor: "gray",
                      cursor: "inherit",
                    }}
                  ></div>
                </div>
              ) : (
                <div className="radio">
                  <p>모두에게 허용</p>
                  <div
                    className="radio_circle"
                    onClick={() => {
                      setCouponType("all");
                    }}
                    style={{
                      backgroundColor: couponType === "all" ? "#40295f" : "",
                    }}
                  ></div>
                </div>
              )}

              <div className="radio">
                <p>특정인에게 허용</p>
                <div
                  className="radio_circle"
                  onClick={() => {
                    setCouponType("specific");
                  }}
                  style={{
                    backgroundColor: couponType === "specific" ? "#40295f" : "",
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div className="radio_box">
            <p>중복 사용 여부</p>
            <div className="radio_container">
              <div className="radio">
                <p>중복사용 가능</p>
                <div
                  className="radio_circle"
                  onClick={() => {
                    setDuplication("possibility");
                  }}
                  style={{
                    backgroundColor:
                      duplication === "possibility" ? "#40295f" : "",
                  }}
                ></div>
              </div>
              <div className="radio">
                <p>중복사용 불가능</p>
                <div
                  className="radio_circle"
                  onClick={() => {
                    setDuplication("impossibility");
                  }}
                  style={{
                    backgroundColor:
                      duplication === "impossibility" ? "#40295f" : "",
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div className="label_container">
            <label htmlFor="couponImage">
              <div className="upload_btn">
                <p>쿠폰이미지 등록</p>
              </div>
            </label>
            <input
              id="couponImage"
              type="file"
              onChange={(e) => handleFileChange(e)}
            />
            <p>{couponImage ? couponImage.name : "파일을 선택하세요"}</p>
          </div>
        </div>
      </div>

      <div className="submit_btn" onClick={sendData}>
        업로드
      </div>
    </div>
  );
};

export default CouponUpload;
