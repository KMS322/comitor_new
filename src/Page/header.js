import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_MY_INFO_REQUEST, LOG_OUT_REQUEST } from "../reducers/user";
import "../CSS/header.css";
import "../CSS/header_mobile.css";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const dispatch = useDispatch();
  const [menuState, setMenuState] = useState(false);
  const navigate = useNavigate();
  const goPage = (path) => {
    navigate(path);
  };
  const { me, logOutDone } = useSelector((state) => state.user);
  useEffect(() => {
    if (!me && logOutDone) {
      window.location.href = "/";
    }
  }, [me, logOutDone]);

  const logOut = useCallback(() => {
    if (!me) {
      goPage("/logIn");
    } else {
      dispatch({
        type: LOG_OUT_REQUEST,
      });
    }
  }, [me, navigate, dispatch]);
  return (
    <div className="header_container">
      <div className="header_left">
        <p
          onClick={() => {
            goPage("/about");
          }}
        >
          Brand Story
        </p>
        <p
          onClick={() => {
            goPage("/shop");
          }}
        >
          Shop
        </p>
        <p
          onClick={() => {
            goPage("/board");
          }}
        >
          Q&A
        </p>
      </div>
      <div className="header_logo">
        <img
          src={"/images/logo.png"}
          alt=""
          onClick={() => {
            goPage("/");
          }}
        />
      </div>
      <div id="pc" className="header_right">
        <div className="article">
          <img src={"/images/header_icon_cart.png"} alt="" />
          <p
            onClick={() => {
              goPage("/cart");
            }}
          >
            장바구니
          </p>
        </div>
        <div className="article">
          <img src={"/images/header_icon_mypage.png"} alt="" />
          <p
            onClick={() => {
              goPage("/mypage");
            }}
          >
            마이페이지
          </p>
        </div>
        <div className="article">
          <img src={"/images/header_icon_login.png"} alt="" />
          {me ? (
            <p onClick={logOut}>로그아웃</p>
          ) : (
            <p
              onClick={() => {
                goPage("/login");
              }}
            >
              로그인
            </p>
          )}
        </div>
      </div>
      <img
        id="mobile"
        src={
          menuState
            ? "/images/mobile/menuOff_btn.png"
            : "/images/mobile/menuOn_btn.png"
        }
        alt=""
        onClick={() => {
          setMenuState(!menuState);
        }}
      />
      <div
        id="mobile"
        className="header_menu"
        style={{ display: !menuState ? "none" : "block" }}
      >
        <div className="text_box">
          <p
            onClick={() => {
              goPage("/cart");
              setMenuState(!menuState);
            }}
          >
            장바구니
          </p>
          <p
            onClick={() => {
              goPage("/mypage");
              setMenuState(!menuState);
            }}
          >
            마이페이지
          </p>
          {me ? (
            <p
              onClick={() => {
                logOut();
                setMenuState(!menuState);
              }}
            >
              로그아웃
            </p>
          ) : (
            <p
              onClick={() => {
                goPage("/login");
                setMenuState(!menuState);
              }}
            >
              로그인
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
