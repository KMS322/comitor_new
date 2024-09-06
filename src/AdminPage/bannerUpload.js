import "../CSS/bannerUpload.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ADD_BANNER_REQUEST } from "../reducers/banner";
const BannerUpload = ({ handlePopup }) => {
  const dispatch = useDispatch();
  const { addBannerDone } = useSelector((state) => state.banner);
  const [bannerImage, setBannerImage] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
  useEffect(() => {
    if (addBannerDone) {
      handlePopup();
      window.location.href = "/adminBanners";
    }
  }, [addBannerDone]);
  const handleFileChange = (e) => {
    const attachedFile = e.target.files[0];
    setBannerImage(attachedFile);
    setSelectedFileName(attachedFile ? attachedFile.name : "");
  };

  const sendData = async (e) => {
    e.preventDefault();

    try {
      if (!bannerImage) {
        alert("배너 이미지를 선택해주세요.");
        return;
      }

      const formData = new FormData();
      formData.append(
        "file",
        bannerImage,
        encodeURIComponent(bannerImage.name)
      );
      await axios.post("/banner/uploadFiles", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch({
        type: ADD_BANNER_REQUEST,
        data: {
          bannerImage: selectedFileName,
        },
      });
    } catch (error) {
      console.error("Error uploading files", error);
    }
  };

  return (
    <div className="bannerUpload">
      <img src="/images/delete_btn.png" alt="" onClick={handlePopup} />
      <div className="form_container">
        <div className="input_container">
          <div className="label_container">
            <label htmlFor="bannerImage">
              <div className="upload_btn">
                <p>배너이미지 등록</p>
              </div>
            </label>
            <input
              id="bannerImage"
              type="file"
              onChange={(e) => handleFileChange(e)}
            />
            <p>{bannerImage ? bannerImage.name : "파일을 선택하세요"}</p>
          </div>
        </div>
      </div>

      <div className="submit_btn" onClick={sendData}>
        업로드
      </div>
    </div>
  );
};

export default BannerUpload;
