import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import {
  UPLOAD_PRODUCT_REQUEST,
  UPLOAD_PRODUCT_SUCCESS,
  UPLOAD_PRODUCT_FAILURE,
  LOAD_PRODUCT_REQUEST,
  LOAD_PRODUCT_SUCCESS,
  LOAD_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
} from "../reducers/adminProduct";

function uploadProductAPI(data) {
  return axios.post("/adminProduct/upload", data);
}

function* uploadProduct(action) {
  try {
    const result = yield call(uploadProductAPI, action.data);
    yield put({
      type: UPLOAD_PRODUCT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPLOAD_PRODUCT_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchUploadProduct() {
  yield takeLatest(UPLOAD_PRODUCT_REQUEST, uploadProduct);
}

function loadProductAPI() {
  return axios.post("/adminProduct/load");
}

function* loadProduct() {
  try {
    const result = yield call(loadProductAPI);
    yield put({
      type: LOAD_PRODUCT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_PRODUCT_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadProduct() {
  yield takeLatest(LOAD_PRODUCT_REQUEST, loadProduct);
}

function deleteProductAPI(data) {
  return axios.post("/adminProduct/delete", data);
}

function* deleteProduct(action) {
  try {
    const result = yield call(deleteProductAPI, action.data);
    yield put({
      type: DELETE_PRODUCT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: DELETE_PRODUCT_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchDeleteProduct() {
  yield takeLatest(DELETE_PRODUCT_REQUEST, deleteProduct);
}

export default function* adminProductSaga() {
  yield all([
    fork(watchUploadProduct),
    fork(watchLoadProduct),
    fork(watchDeleteProduct),
  ]);
}
