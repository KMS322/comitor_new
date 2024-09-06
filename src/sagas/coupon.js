import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import {
  ADD_COUPON_REQUEST,
  ADD_COUPON_SUCCESS,
  ADD_COUPON_FAILURE,
  LOAD_COUPON_REQUEST,
  LOAD_COUPON_SUCCESS,
  LOAD_COUPON_FAILURE,
  DELETE_COUPON_REQUEST,
  DELETE_COUPON_SUCCESS,
  DELETE_COUPON_FAILURE,
  ACCEPT_COUPON_REQUEST,
  ACCEPT_COUPON_SUCCESS,
  ACCEPT_COUPON_FAILURE,
} from "../reducers/coupon";

function addCouponAPI(data) {
  return axios.post("/coupon/add", data);
}

function* addCoupon(action) {
  try {
    const result = yield call(addCouponAPI, action.data);
    yield put({
      type: ADD_COUPON_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_COUPON_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchAddCoupon() {
  yield takeLatest(ADD_COUPON_REQUEST, addCoupon);
}

function loadCouponAPI() {
  return axios.post("/coupon/load");
}

function* loadCoupon() {
  try {
    const result = yield call(loadCouponAPI);
    yield put({
      type: LOAD_COUPON_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_COUPON_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadCoupon() {
  yield takeLatest(LOAD_COUPON_REQUEST, loadCoupon);
}

function deleteCouponAPI(data) {
  return axios.post("/coupon/delete", data);
}

function* deleteCoupon(action) {
  try {
    const result = yield call(deleteCouponAPI, action.data);
    yield put({
      type: DELETE_COUPON_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: DELETE_COUPON_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchDeleteCoupon() {
  yield takeLatest(DELETE_COUPON_REQUEST, deleteCoupon);
}

function acceptCouponAPI(data) {
  return axios.post("/coupon/accept", data);
}

function* acceptCoupon(action) {
  try {
    const result = yield call(acceptCouponAPI, action.data);
    yield put({
      type: ACCEPT_COUPON_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ACCEPT_COUPON_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchAcceptCoupon() {
  yield takeLatest(ACCEPT_COUPON_REQUEST, acceptCoupon);
}

export default function* couponSaga() {
  yield all([
    fork(watchAddCoupon),
    fork(watchLoadCoupon),
    fork(watchDeleteCoupon),
    fork(watchAcceptCoupon),
  ]);
}
