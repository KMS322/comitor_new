// import "../CSS/adminPopup.css";
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation } from "react-router-dom";
// import {
//   ADD_POPUP_REQUEST,
//   LOAD_POPUP_REQUEST,
//   ACTIVE_POPUP_REQUEST,
// } from "../reducers/popup";
// import AdminSubHeader from "./adminSubHeader";
// import EventPopup from "../components/contact/eventPopup";
// import axios from "axios";
// const AdminPopup = () => {
//   const location = useLocation();
//   const me = location.state && location.state.me;
//   const dispatch = useDispatch();
//   const { popup, activePopupDone, addPopupDone } = useSelector(
//     (state) => state.popup
//   );
//   const [openPopup, setOpenPopup] = useState(false);
//   const [activePopup, setActivePopup] = useState("off");
//   const handleClose = () => {
//     setOpenPopup(false);
//   };
//   const [file, setFile] = useState(null);
//   const [selectedFileName, setSelectedFileName] = useState("");
//   const [filePath, setFilePath] = useState("");

//   const handleFileChange = (e) => {
//     const attachedFile = e.target.files[0];
//     setFile(attachedFile);
//     setSelectedFileName(attachedFile ? attachedFile.name : "");
//     setFilePath(URL.createObjectURL(attachedFile));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (file) {
//         const formData = new FormData();
//         formData.append("file", file, encodeURIComponent(file.name));
//         await axios.post("/popup/upload", formData, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         });
//       } else {
//         alert("이미지를 선택해주세요.");
//         return;
//       }

//       dispatch({
//         type: ADD_POPUP_REQUEST,
//         data: {
//           selectedFileName,
//         },
//       });
//     } catch (error) {
//       console.error("Error sending form:", error);
//     }
//   };
//   const handleActive = (active) => {
//     dispatch({
//       type: ACTIVE_POPUP_REQUEST,
//       data: {
//         active,
//       },
//     });
//   };
//   useEffect(() => {
//     dispatch({
//       type: LOAD_POPUP_REQUEST,
//     });
//   }, [activePopupDone]);
//   useEffect(() => {
//     if (popup && popup.active === "on") {
//       setActivePopup("on");
//     } else {
//       setActivePopup("off");
//     }
//   }, [popup]);
//   useEffect(() => {
//     if (activePopupDone) {
//       window.location.href = "/adminPopup";
//     }
//   }, [activePopupDone]);
//   useEffect(() => {
//     if (addPopupDone) {
//       window.location.href = "/adminPopup";
//     }
//   }, [addPopupDone]);
//   return (
//     <>
//       <AdminSubHeader data={"팝업 관리"} />
//       {(me && me === "ganstar95") || me === "admin" ? (
//         <div className="adminPopup">
//           <div className="btn_box">
//             <div
//               className={activePopup === "on" ? "btn active" : "btn"}
//               onClick={() => {
//                 handleActive("on");
//               }}
//             >
//               ON
//             </div>
//             <div
//               className={activePopup === "off" ? "btn active" : "btn"}
//               onClick={() => {
//                 handleActive("off");
//               }}
//             >
//               OFF
//             </div>
//           </div>
//           <div className="label_container">
//             <label htmlFor="file">
//               <div className="upload_btn">
//                 <p>팝업 이미지 선택</p>
//               </div>
//             </label>
//             <input id="file" type="file" onChange={handleFileChange} />
//             <p>{selectedFileName}</p>
//           </div>
//           <div className="submit_btn" onClick={handleSubmit}>
//             업로드
//           </div>
//           <p>현재 팝업 이미지 : {popup && popup.img_src}</p>
//           <div
//             className="preview_box"
//             onClick={() => {
//               setOpenPopup(true);
//             }}
//           >
//             미리 보기
//           </div>
//         </div>
//       ) : (
//         ""
//       )}
//       {openPopup ? <EventPopup onClose={handleClose} /> : ""}
//     </>
//   );
// };

// export default AdminPopup;
