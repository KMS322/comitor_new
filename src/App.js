import "./App.css";
import "./CSS/fonts.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { LOAD_MY_INFO_REQUEST } from "./reducers/user";
import Header from "./Page/header";
import Footer from "./Page/footer";
import MainContents from "./Page/main/mainContents";
import AboutContents from "./Page/about/aboutContents";
import Shop from "./Page/shop/shop";
import MypageContents from "./Page/mypage/mypageContents";
import LoginContent from "./Page/login/loginContent";
import SigninContent from "./Page/signin/signinContent";
import SignFormContent from "./Page/signin/signFormContent";
import CartContents from "./Page/cart/cartContents";
import PayContents from "./Page/pay/payContents";
import PayCompleteContent from "./Page/payComplete/payCompleteContent";
import ShopDetailContents from "./Page/shopDetail/shopDetailContents";
import BoardContent from "./Page/board/boardContent.js";
import AdminMain from "./AdminPage/adminMain.js";
import AdminLogin from "./AdminPage/adminLogin.js";
import AdminSignup from "./AdminPage/adminSignup.js";
import AdminLists from "./AdminPage/adminLists.js";
import AdminOrders from "./AdminPage/adminOrders.js";
import AdminBanners from "./AdminPage/adminBanners.js";
import AdminCoupons from "./AdminPage/adminCoupons.js";
import AdminReviews from "./AdminPage/adminReviews.js";
import AdminStatistics from "./AdminPage/adminStatistic.js";
import Redirection from "./Page/login/redirection.js";
import AdminPopup from "./AdminPage/adminPopup.js";
import ScrollToTop from "./ScrollToTop";

const App = () => {
  const dispatch = useDispatch();
  const { me, logInDone } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
  }, [logInDone]);
  return (
    <>
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainContents />} />
        <Route path="/about" element={<AboutContents />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/mypage" element={<MypageContents />} />
        <Route path="/login" element={<LoginContent />} />
        <Route path="/signin" element={<SigninContent />} />
        <Route path="/signForm" element={<SignFormContent />} />
        <Route path="/cart" element={<CartContents />} />
        <Route path="/pay" element={<PayContents />} />
        <Route path="/complete" element={<PayCompleteContent />} />
        <Route path="/shopDetail/:code" element={<ShopDetailContents />} />
        <Route path="/board" element={<BoardContent />} />

        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/adminSignup" element={<AdminSignup />} />
        <Route path="/adminMain" element={<AdminMain />} />
        <Route path="/adminLists" element={<AdminLists />} />
        <Route path="/adminOrders" element={<AdminOrders />} />
        <Route path="/adminBanners" element={<AdminBanners />} />
        <Route path="/adminCoupons" element={<AdminCoupons />} />
        <Route path="/adminReviews" element={<AdminReviews />} />
        <Route path="/adminStatistics" element={<AdminStatistics />} />
        <Route path="/auth/*" element={<Redirection />} />
        {/* <Route path="/adminPopup" element={<AdminPopup />} /> */}
      </Routes>
      <Footer />
    </>
  );
};

export default App;
