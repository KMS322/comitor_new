import "../CSS/adminUploadForm.css";
import React, { useState, useEffect, useCallback } from "react";
import useInput from "../Page/hooks/useInput";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { UPLOAD_PRODUCT_REQUEST } from "../reducers/adminProduct";

const AdminUploadForm = ({ handlePopup }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { uploadProductDone } = useSelector((state) => state.adminProduct);
  const [product_code, onChangeCode] = useInput("");
  const [product_name, onChangeName] = useInput("");
  const [product_originPrice, onChangeOriginPrice] = useInput("");
  const [product_salePrice, onChangeSalePrice] = useInput("");
  const [mainImage, setMainImage] = useState("");
  const [detailPage, setDetailPage] = useState("");
  const [selectedFileName1, setSelectedFileName1] = useState("");
  const [selectedFileName2, setSelectedFileName2] = useState("");
  const handleFileChange1 = (e) => {
    const attachedFile = e.target.files[0];
    setMainImage(attachedFile);
    setSelectedFileName1(attachedFile ? attachedFile.name : "");
  };
  const handleFileChange2 = (e, index) => {
    const attachedFile = e.target.files[0];
    setDetailPage(attachedFile);
    setSelectedFileName2(attachedFile ? attachedFile.name : "");
  };

  const sendData = async (e) => {
    e.preventDefault();

    try {
      if (!mainImage) {
        alert("대표 이미지를 선택해주세요.");
        return;
      }

      const formData1 = new FormData();
      formData1.append("file", mainImage, encodeURIComponent(mainImage.name));
      await axios.post("/adminProduct/uploadFiles1", formData1, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!detailPage) {
        alert("상세페이지를 선택해주세요.");
        return;
      }

      const formData2 = new FormData();
      formData2.append("file", detailPage, encodeURIComponent(detailPage.name));
      await axios.post("/adminProduct/uploadFiles2", formData2, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch({
        type: UPLOAD_PRODUCT_REQUEST,
        data: {
          product_code,
          product_name,
          product_originPrice,
          product_salePrice,
          mainImage: selectedFileName1,
          detailPage: selectedFileName2,
        },
      });
    } catch (error) {
      console.error("Error uploading files", error);
    }
  };

  useEffect(() => {
    if (uploadProductDone) {
      handlePopup();
      window.location.href = "/adminLists";
    }
  }, [uploadProductDone]);
  return (
    <div className="adminUploadForm">
      <img src="/images/delete_btn.png" alt="" onClick={handlePopup} />
      <div className="form_container">
        <div className="input_container">
          <div className="input_box">
            <p>상품코드</p>
            <input
              type="text"
              name="product_code"
              value={product_code}
              onChange={onChangeCode}
            />
          </div>
          <div className="input_box">
            <p>상품명</p>
            <input
              type="text"
              name="product_name"
              value={product_name}
              onChange={onChangeName}
            />
          </div>
          <div className="input_box">
            <p>할인 전 가격(숫자만 입력하세요. ex : 26000)</p>
            <input
              type="number"
              name="product_originPrice"
              value={product_originPrice}
              onChange={onChangeOriginPrice}
            />
          </div>
          <div className="input_box">
            <p>할인 후 가격(숫자만 입력하세요. ex : 17900)</p>
            <input
              type="number"
              name="product_salePrice"
              value={product_salePrice}
              onChange={onChangeSalePrice}
            />
          </div>

          <div className="label_container">
            <label htmlFor="mainImage">
              <div className="upload_btn">
                <p>대표이미지 등록</p>
              </div>
            </label>
            <input
              id="mainImage"
              type="file"
              onChange={(e) => handleFileChange1(e)}
            />
            <p>{mainImage ? mainImage.name : "파일을 선택하세요"}</p>
          </div>
          <div className="label_container">
            <label htmlFor="detailPage">
              <div className="upload_btn">
                <p>상세페이지 등록</p>
              </div>
            </label>
            <input
              id="detailPage"
              type="file"
              onChange={(e) => handleFileChange2(e)}
            />
            <p>{detailPage ? detailPage.name : "파일을 선택하세요"}</p>
          </div>
        </div>
      </div>

      <div className="submit_btn" onClick={sendData}>
        업로드
      </div>
    </div>
  );
};

export default AdminUploadForm;
