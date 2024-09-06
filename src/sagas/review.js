import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import {
  LOAD_REVIEW_REQUEST,
  LOAD_REVIEW_SUCCESS,
  LOAD_REVIEW_FAILURE,
  LOAD_ALL_REVIEW_REQUEST,
  LOAD_ALL_REVIEW_SUCCESS,
  LOAD_ALL_REVIEW_FAILURE,
  LOAD_PRODUCT_REVIEW_REQUEST,
  LOAD_PRODUCT_REVIEW_SUCCESS,
  LOAD_PRODUCT_REVIEW_FAILURE,
  UPLOAD_REVIEW_REQUEST,
  UPLOAD_REVIEW_SUCCESS,
  UPLOAD_REVIEW_FAILURE,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAILURE,
} from "../reducers/review";

function loadReviewAPI(data) {
  return axios.post("/review/load", data);
}

function* loadReview(action) {
  try {
    const result = yield call(loadReviewAPI, action.data);
    yield put({
      type: LOAD_REVIEW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_REVIEW_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadReview() {
  yield takeLatest(LOAD_REVIEW_REQUEST, loadReview);
}

function loadAllReviewAPI() {
  return axios.get("/review/loadAll");
}

function* loadAllReview() {
  try {
    const result = yield call(loadAllReviewAPI);
    yield put({
      type: LOAD_ALL_REVIEW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_ALL_REVIEW_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadAllReview() {
  yield takeLatest(LOAD_ALL_REVIEW_REQUEST, loadAllReview);
}

function loadProductReviewAPI(data) {
  return axios.post("/review/loadProduct", data);
}

function* loadProductReview(action) {
  try {
    const result = yield call(loadProductReviewAPI, action.data);
    yield put({
      type: LOAD_PRODUCT_REVIEW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_PRODUCT_REVIEW_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadProductReview() {
  yield takeLatest(LOAD_PRODUCT_REVIEW_REQUEST, loadProductReview);
}

function uploadReviewAPI(data) {
  return axios.post("/review/upload", data);
}

function* uploadReview(action) {
  try {
    const result = yield call(uploadReviewAPI, action.data);
    yield put({
      type: UPLOAD_REVIEW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPLOAD_REVIEW_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchUploadReview() {
  yield takeLatest(UPLOAD_REVIEW_REQUEST, uploadReview);
}

function deleteReviewAPI(data) {
  return axios.post("/review/delete", data);
}

function* deleteReview(action) {
  try {
    const result = yield call(deleteReviewAPI, action.data);
    yield put({
      type: DELETE_REVIEW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: DELETE_REVIEW_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchDeleteReview() {
  yield takeLatest(DELETE_REVIEW_REQUEST, deleteReview);
}

export default function* reviewSaga() {
  yield all([
    fork(watchLoadReview),
    fork(watchLoadAllReview),
    fork(watchUploadReview),
    fork(watchLoadProductReview),
    fork(watchDeleteReview),
  ]);
}
