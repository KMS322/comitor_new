import "../../CSS/main.css";
import "../../CSS/main_mobile.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_ALL_REVIEW_REQUEST } from "../../reducers/review";
const MainS5 = () => {
  const dispatch = useDispatch();
  const { allReviews } = useSelector((state) => state.review);
  const [uniqueReviews, setUniqueReviews] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const reviewsToShow = 4;
  console.log("uniqueReviews : ", uniqueReviews);

  useEffect(() => {
    dispatch({
      type: LOAD_ALL_REVIEW_REQUEST,
    });
  }, [dispatch]);
  useEffect(() => {
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

    setUniqueReviews(removeDuplicatesById(allReviews));
  }, [allReviews]);

  const handlePrev = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - reviewsToShow, 0));
  };

  const handleNext = () => {
    setStartIndex((prevIndex) =>
      Math.min(prevIndex + reviewsToShow, uniqueReviews.length - reviewsToShow)
    );
  };
  return (
    <div className="main_s5">
      <p>REVIEW</p>
      <div className="article_container">
        {uniqueReviews
          .slice(startIndex, startIndex + reviewsToShow)
          .map((review, index) => (
            <div className="article" key={index}>
              <img
                src={`/images/reviewImage/${review.review_imgUrl1}`}
                alt=""
              />
              <div className="star_box">
                {[...Array(5)].map((_, i) => (
                  <p style={{ cursor: "inherit" }} key={i}>
                    {review.star_point > i ? "★" : "☆"}
                  </p>
                ))}
              </div>
              <div className="comment_box">{review.review_comment}</div>
            </div>
          ))}
      </div>
      <div className="controls">
        <button onClick={handlePrev} disabled={startIndex === 0}>
          {"<"}
        </button>
        <button
          onClick={handleNext}
          disabled={startIndex + reviewsToShow >= uniqueReviews.length}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default MainS5;
