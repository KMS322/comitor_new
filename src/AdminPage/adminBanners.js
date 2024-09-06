import "../CSS/adminBanners.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import AdminSubHeader from "./adminSubHeader";
import BannerUpload from "./bannerUpload";
import { LOAD_BANNER_REQUEST, DELETE_BANNER_REQUEST } from "../reducers/banner";

const AdminBanners = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const me = location.state && location.state.me;
  const [openForm, setOpenForm] = useState(false);
  const { banners, deleteBannerDone } = useSelector((state) => state.banner);
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
  const uniqueBanners = removeDuplicatesById(banners);
  useEffect(() => {
    dispatch({
      type: LOAD_BANNER_REQUEST,
    });
  }, [dispatch]);

  const deleteBanner = (id) => {
    dispatch({
      type: DELETE_BANNER_REQUEST,
      data: {
        id,
      },
    });
  };

  useEffect(() => {
    if (deleteBannerDone) {
      window.location.href = "/adminBanners";
    }
  }, [deleteBannerDone]);
  return (
    <>
      <AdminSubHeader data={"배너 관리"} />
      {(me && me === "") || me.user_id === "admin" ? (
        <>
          <div className="adminBanners">
            <div className="upload_btn">
              <p
                onClick={() => {
                  setOpenForm(true);
                }}
              >
                <span>+</span> 업로드
              </p>
            </div>
            <div className="table">
              <div className="head_row row">
                <p>No</p>
                <p>배너이미지 파일경로</p>
                <p></p>
              </div>
              {uniqueBanners &&
                uniqueBanners.map((banner, index) => {
                  return (
                    <div
                      className={
                        index % 2 === 0
                          ? "content_row row"
                          : "content_row row even_row"
                      }
                      key={index}
                    >
                      <p>{index + 1}</p>
                      <p>{banner.banner_imgUrl}</p>
                      <div
                        className="btn_box"
                        onClick={() => {
                          deleteBanner(banner.id);
                        }}
                      >
                        <p>삭제</p>
                      </div>
                    </div>
                  );
                })}
            </div>
            {openForm ? (
              <BannerUpload
                handlePopup={() => {
                  setOpenForm(false);
                }}
              />
            ) : (
              ""
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default AdminBanners;
