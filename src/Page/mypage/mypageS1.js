import "../../CSS/mypage.css";
import "../../CSS/mypage_mobile.css";
import React, { useState, useEffect } from "react";
import MypageModal from "./mypageModal";

const MypageS1 = ({ me }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const formattedDate = date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    return `${formattedDate}`;
  };
  useEffect(() => {
    if (!me) {
      window.location.href = "/login";
    }
  }, [me]);
  return (
    <div className="mypage_s1">
      {/* <img src="/images/mypage/mypage_s1_img1.png" alt="" /> */}
      <div className="text_box">
        <p
          onClick={() => {
            setModalOpen(true);
          }}
        >
          회원정보 변경
        </p>
        <p>{me && me.user_name}</p>
        <p>가입일 : {me && formatDateTime(me.createdAt)}</p>
      </div>
      {modalOpen && <MypageModal setModalOpen={setModalOpen} me={me} />}

      {/* <div className="review_box">
        <img src="/images/mypage/mypage_s1_img2.png" alt="" />
        <p>후기작성</p>
        <p>14</p>
      </div> */}
    </div>
  );
};

export default MypageS1;
