import "../../CSS/main.css";
import "../../CSS/main_mobile.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_BANNER_REQUEST } from "../../reducers/banner";
const MainS2 = () => {
  const dispatch = useDispatch();
  const { banners } = useSelector((state) => state.banner);
  const [currentImg, setCurrentImg] = useState(0);

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
  const bannerCnt = uniqueBanners.length > 0 && uniqueBanners.length;

  useEffect(() => {
    dispatch({
      type: LOAD_BANNER_REQUEST,
    });
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentImg < bannerCnt - 1) {
        setCurrentImg(currentImg + 1);
      } else {
        setCurrentImg(0);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentImg]);
  return (
    <div className="main_s2">
      <div
        className="btn_box"
        onClick={() => {
          if (currentImg > 0) {
            setCurrentImg(currentImg - 1);
          }
        }}
      >
        {"<"}
      </div>
      {uniqueBanners && (
        <img
          src={`/images/bannerImage/${
            uniqueBanners.length > 0 && uniqueBanners[currentImg].banner_imgUrl
          }`}
          alt=""
        />
      )}
      <div
        className="btn_box"
        onClick={() => {
          if (currentImg < bannerCnt - 1) setCurrentImg(currentImg + 1);
        }}
      >
        {">"}
      </div>
    </div>
  );
};

export default MainS2;
