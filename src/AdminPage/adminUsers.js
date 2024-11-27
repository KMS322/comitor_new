import "../CSS/adminUsers.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AdminSubHeader from "./adminSubHeader";
import { LOAD_USERS_REQUEST, DELETE_USER_REQUEST } from "../reducers/user";
import {
  LOAD_ALL_LISTS_REQUEST,
  LOAD_COUPON_REQUEST,
} from "../reducers/coupon";
import CouponLists from "./couponLists";

const AdminUsers = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [listOpen, setListOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const navigate = useNavigate();
  const me = location.state && location.state.me;
  const { users, deleteUserDone } = useSelector((state) => state.user);
  const { allLists, coupons } = useSelector((state) => state.coupon);
  useEffect(() => {
    dispatch({
      type: LOAD_USERS_REQUEST,
    });
  }, [dispatch]);
  useEffect(() => {
    if (!me) {
      navigate("/admin");
    }
  }, [me]);
  useEffect(() => {
    dispatch({
      type: LOAD_ALL_LISTS_REQUEST,
    });
  }, [dispatch]);
  useEffect(() => {
    dispatch({
      type: LOAD_COUPON_REQUEST,
    });
  }, []);
  useEffect(() => {
    if (deleteUserDone) {
      window.location.href = "/adminUsers";
    }
  }, [deleteUserDone]);
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
  const uniqueLists = removeDuplicatesById(allLists);
  const uniqueCoupons = removeDuplicatesById(coupons);
  // console.log("uniqueLists : ", uniqueLists);

  const deleteUser = (user_id) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      dispatch({
        type: DELETE_USER_REQUEST,
        data: {
          user_id,
        },
      });
    }
  };

  return (
    <>
      <AdminSubHeader data={"유저 관리"} />
      {(me && me === "") || me.user_id === "ubuntu0516" ? (
        <div className="adminUsers">
          <div className="table">
            <div className="head_row row">
              <p>아이디</p>
              <p>이름</p>
              <p>휴대폰 번호</p>
              <p>도로명주소/지번주소/상세주소</p>
              <p>우편번호</p>
              <p>보유쿠폰</p>
              <p>가입일</p>
              <p></p>
            </div>
            {users &&
              users.map((user, index) => {
                const createdDay = () => {
                  const date = new Date(user.createdAt);
                  const year = date.getFullYear();
                  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1 필요
                  const day = String(date.getDate()).padStart(2, "0");
                  const hours = String(date.getHours()).padStart(2, "0");
                  const minutes = String(date.getMinutes()).padStart(2, "0");

                  return `${year}.${month}.${day}-${hours}:${minutes}`;
                };
                const acceptCoupons =
                  uniqueLists &&
                  uniqueLists.filter((list) => list.user_id === user.user_id);
                const updatedAcceptCoupons = acceptCoupons.map((accept) => {
                  // 객체를 복사한 뒤 새로운 속성 추가
                  const newAccept = { ...accept };
                  uniqueCoupons.forEach((unique) => {
                    if (accept.coupon_id === unique.coupon_id) {
                      newAccept.coupon_name = unique.coupon_name;
                    }
                  });
                  return newAccept; // 새로운 객체를 반환
                });

                return (
                  <div
                    className={
                      index % 2 === 0
                        ? "content_row row"
                        : "content_row row even_row"
                    }
                    key={index}
                  >
                    <p>{user.user_id}</p>
                    <p>{user.user_name}</p>
                    <p>{user.user_phone}</p>
                    <div className="address_box">
                      <p>{user.user_roadAddress}/</p>
                      <p>{user.user_jibunAddress}/</p>
                      <p>{user.user_detailAddress}</p>
                    </div>
                    <p>{user.user_postcode}</p>
                    <div className="coupon_box">
                      {updatedAcceptCoupons &&
                        updatedAcceptCoupons.map((coupon, index) => {
                          return <p key={index}>{coupon.coupon_name}</p>;
                        })}
                    </div>
                    <p>{createdDay()}</p>
                    <div className="btn_box">
                      <div
                        className="btn"
                        onClick={() => {
                          setListOpen(true);
                          setSelectedUser(user.user_id);
                        }}
                      >
                        쿠폰지급
                      </div>
                      <div
                        className="btn"
                        onClick={() => {
                          deleteUser(user.user_id);
                        }}
                      >
                        삭제
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          {listOpen && (
            <CouponLists handleLists={setListOpen} user={selectedUser} />
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default AdminUsers;
