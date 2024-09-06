import "../../CSS/mypage.css";
import "../../CSS/mypage_mobile.css";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import useInput from "../hooks/useInput";
import { UPLOAD_REVIEW_REQUEST } from "../../reducers/review";
const ReviewWriteModal = ({ handleModal, id }) => {
  // console.log("id : ", id);
  const dispatch = useDispatch();
  const [review_content, onChangeContent] = useInput("");
  const [starPoint, setStarPoint] = useState(0);
  const [reviewImages, setReviewImages] = useState([null, null, null]);
  const [selectedFileNames, setSelectedFileNames] = useState(["", "", ""]);

  const handleFileChange = (index) => (e) => {
    const attachedFile = e.target.files[0];
    const newReviewImages = [...reviewImages];
    const newSelectedFileNames = [...selectedFileNames];

    newReviewImages[index] = attachedFile;
    newSelectedFileNames[index] = attachedFile ? attachedFile.name : "";

    setReviewImages(newReviewImages);
    setSelectedFileNames(newSelectedFileNames);
  };

  const addReview = async (e) => {
    e.preventDefault();

    try {
      const uploadedFileNames = [];

      for (const image of reviewImages) {
        if (image) {
          const formData = new FormData();
          formData.append("file", image, encodeURIComponent(image.name));

          const response = await axios.post("/review/uploadFiles", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          console.log("Upload response:", response.data);
          // Assuming the server returns the uploaded file's name in the response
          uploadedFileNames.push(response.data.filename);
        }
      }
      console.log("uploadedFileNames : ", uploadedFileNames);

      dispatch({
        type: UPLOAD_REVIEW_REQUEST,
        data: {
          id,
          review_content,
          starPoint,
          reviewImages: uploadedFileNames,
        },
      });

      handleModal(false); // Close the modal on success
    } catch (error) {
      console.error("Error uploading files", error);
    }
  };

  return (
    <div className="reviewWriteModal_container">
      <div className="reviewWriteModal_header">
        <h2>리뷰쓰기</h2>
        <button onClick={() => handleModal(false)}>닫기 X</button>
      </div>
      <div className="star_box">
        <div className="text">별점</div>
        {[...Array(5)].map((_, index) => (
          <p key={index} onClick={() => setStarPoint(index + 1)}>
            {starPoint > index ? "★" : "☆"}
          </p>
        ))}
      </div>
      <div className="reviewWriteModal_content">
        <div className="input">
          <p>내용</p>
          <textarea
            name="review_content"
            value={review_content}
            onChange={onChangeContent}
          />
        </div>
      </div>
      <div className="reviewWriteModal_content" style={{ marginBottom: "0vw" }}>
        <div className="input">
          <p>이미지 등록</p>
        </div>
      </div>
      {[0, 1, 2].map((index) => (
        <div key={index} className="form_container">
          <div className="input_container">
            <div className="label_container">
              <label htmlFor={`reviewImage${index}`}>
                <div className="upload_btn">
                  <p>사진 찾기</p>
                </div>
              </label>
              <input
                id={`reviewImage${index}`}
                type="file"
                onChange={handleFileChange(index)}
              />
              <p>{selectedFileNames[index] || "파일을 선택하세요"}</p>
            </div>
          </div>
        </div>
      ))}
      <div className="btn_box">
        <p onClick={() => handleModal(false)}>취소</p>
        <p onClick={addReview}>작성</p>
      </div>
    </div>
  );
};

export default ReviewWriteModal;
