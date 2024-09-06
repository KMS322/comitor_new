import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import {
  ADD_BANNER_REQUEST,
  ADD_BANNER_SUCCESS,
  ADD_BANNER_FAILURE,
  LOAD_BANNER_REQUEST,
  LOAD_BANNER_SUCCESS,
  LOAD_BANNER_FAILURE,
  DELETE_BANNER_REQUEST,
  DELETE_BANNER_SUCCESS,
  DELETE_BANNER_FAILURE,
} from "../reducers/banner";

function addBannerAPI(data) {
  return axios.post("/banner/add", data);
}

function* addBanner(action) {
  try {
    const result = yield call(addBannerAPI, action.data);
    yield put({
      type: ADD_BANNER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_BANNER_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchAddBanner() {
  yield takeLatest(ADD_BANNER_REQUEST, addBanner);
}

function loadBannerAPI() {
  return axios.post("/banner/load");
}

function* loadBanner() {
  try {
    const result = yield call(loadBannerAPI);
    yield put({
      type: LOAD_BANNER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_BANNER_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadBanner() {
  yield takeLatest(LOAD_BANNER_REQUEST, loadBanner);
}

function deleteBannerAPI(data) {
  return axios.post("/banner/delete", data);
}

function* deleteBanner(action) {
  try {
    const result = yield call(deleteBannerAPI, action.data);
    yield put({
      type: DELETE_BANNER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: DELETE_BANNER_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchDeleteBanner() {
  yield takeLatest(DELETE_BANNER_REQUEST, deleteBanner);
}

export default function* bannerSaga() {
  yield all([
    fork(watchAddBanner),
    fork(watchLoadBanner),
    fork(watchDeleteBanner),
  ]);
}
