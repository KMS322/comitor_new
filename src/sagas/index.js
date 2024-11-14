import { all, fork } from "redux-saga/effects";
import axios from "axios";
import userSaga from "./user";
import adminProductSaga from "./adminProduct";
import cartSaga from "./cart";
import orderSaga from "./order";
import boardSaga from "./board";
import bannerSaga from "./banner";
import couponSaga from "./coupon";
import reviewSaga from "./review";
import payApiSaga from "./payApi";

import { API_URL } from "../constants";

axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(adminProductSaga),
    fork(cartSaga),
    fork(orderSaga),
    fork(boardSaga),
    fork(bannerSaga),
    fork(couponSaga),
    fork(reviewSaga),
    fork(payApiSaga),
  ]);
}
