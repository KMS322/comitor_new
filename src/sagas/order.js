import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import {
  ADD_ORDER_REQUEST,
  ADD_ORDER_SUCCESS,
  ADD_ORDER_FAILURE,
  LOAD_ORDER_REQUEST,
  LOAD_ORDER_SUCCESS,
  LOAD_ORDER_FAILURE,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAILURE,
  LOAD_USER_ORDER_REQUEST,
  LOAD_USER_ORDER_SUCCESS,
  LOAD_USER_ORDER_FAILURE,
} from "../reducers/order";

function addOrderAPI(data) {
  return axios.post("/order/add", data);
}

function* addOrder(action) {
  try {
    const result = yield call(addOrderAPI, action.data);
    yield put({
      type: ADD_ORDER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_ORDER_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchAddOrder() {
  yield takeLatest(ADD_ORDER_REQUEST, addOrder);
}

function loadOrderAPI(data) {
  return axios.post("/order/load", data);
}

function* loadOrder(action) {
  try {
    const result = yield call(loadOrderAPI, action.data);
    yield put({
      type: LOAD_ORDER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_ORDER_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadOrder() {
  yield takeLatest(LOAD_ORDER_REQUEST, loadOrder);
}

function deleteOrderAPI(data) {
  return axios.post("/order/delete", data);
}

function* deleteOrder(action) {
  try {
    const result = yield call(deleteOrderAPI, action.data);
    yield put({
      type: DELETE_ORDER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: DELETE_ORDER_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchDeleteOrder() {
  yield takeLatest(DELETE_ORDER_REQUEST, deleteOrder);
}

function loadUserOrderAPI(data) {
  return axios.post("/order/loadUser", data);
}

function* loadUserOrder(action) {
  try {
    const result = yield call(loadUserOrderAPI, action.data);
    yield put({
      type: LOAD_USER_ORDER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_USER_ORDER_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadUserOrder() {
  yield takeLatest(LOAD_USER_ORDER_REQUEST, loadUserOrder);
}

export default function* orderSaga() {
  yield all([
    fork(watchAddOrder),
    fork(watchLoadOrder),
    fork(watchDeleteOrder),
    fork(watchLoadUserOrder),
  ]);
}
