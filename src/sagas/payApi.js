import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import { PAY_REQUEST, PAY_SUCCESS, PAY_FAILURE } from "../reducers/payApi";

function payAPI(data) {
  return axios.post("/api/payment/start", data);
}

function* pay(action) {
  try {
    const result = yield call(payAPI, action.data);
    yield put({
      type: PAY_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PAY_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchPay() {
  yield takeLatest(PAY_REQUEST, pay);
}

export default function* payApiSaga() {
  yield all([fork(watchPay)]);
}
