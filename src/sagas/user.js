import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import {
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOAD_MY_INFO_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  CHECK_ID_REQUEST,
  CHECK_ID_SUCCESS,
  CHECK_ID_FAILURE,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
  CHANGE_PHONE_REQUEST,
  CHANGE_PHONE_SUCCESS,
  CHANGE_PHONE_FAILURE,
  CHANGE_ADDRESS_REQUEST,
  CHANGE_ADDRESS_SUCCESS,
  CHANGE_ADDRESS_FAILURE,
  LOAD_USERS_REQUEST,
  LOAD_USERS_SUCCESS,
  LOAD_USERS_FAILURE,
} from "../reducers/user";

function loadUserAPI() {
  return axios.get("/user");
}

function* loadUser() {
  try {
    const result = yield call(loadUserAPI);
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: err.response.data,
    });
  }
}

function logInAPI(data) {
  return axios.post("/user/login", data);
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

function logOutAPI() {
  return axios.post("/user/logout");
}

function* logOut() {
  try {
    yield call(logOutAPI);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

function signUpAPI(data) {
  return axios.post("/user/signup", data);
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    yield put({
      type: SIGN_UP_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}

function checkIdAPI(data) {
  return axios.post("/user/checkId", data);
}

function* checkId(action) {
  try {
    const result = yield call(checkIdAPI, action.data);
    yield put({
      type: CHECK_ID_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: CHECK_ID_FAILURE,
      error: err.response.data,
    });
  }
}

function changePasswordAPI(data) {
  return axios.post("/user/changePassword", data);
}

function* changePassword(action) {
  try {
    const result = yield call(changePasswordAPI, action.data);
    yield put({
      type: CHANGE_PASSWORD_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: CHANGE_PASSWORD_FAILURE,
      error: err.response.data,
    });
  }
}

function changePhoneAPI(data) {
  return axios.post("/user/changePhone", data);
}

function* changePhone(action) {
  try {
    const result = yield call(changePhoneAPI, action.data);
    yield put({
      type: CHANGE_PHONE_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: CHANGE_PHONE_FAILURE,
      error: err.response.data,
    });
  }
}

function changeAddressAPI(data) {
  return axios.post("/user/changeAddress", data);
}

function* changeAddress(action) {
  try {
    const result = yield call(changeAddressAPI, action.data);
    yield put({
      type: CHANGE_ADDRESS_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: CHANGE_ADDRESS_FAILURE,
      error: err.response.data,
    });
  }
}

function loadUsersAPI() {
  return axios.get("/user/loadUsers");
}

function* loadUsers() {
  try {
    const result = yield call(loadUsersAPI);
    yield put({
      type: LOAD_USERS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_USERS_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadUser() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadUser);
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function* watchcheckId() {
  yield takeLatest(CHECK_ID_REQUEST, checkId);
}

function* watchChangePassword() {
  yield takeLatest(CHANGE_PASSWORD_REQUEST, changePassword);
}

function* watchChangePhone() {
  yield takeLatest(CHANGE_PHONE_REQUEST, changePhone);
}

function* watchChangeAddress() {
  yield takeLatest(CHANGE_ADDRESS_REQUEST, changeAddress);
}
function* watchLoadUsersAddress() {
  yield takeLatest(LOAD_USERS_REQUEST, loadUsers);
}
export default function* userSaga() {
  yield all([
    fork(watchLoadUser),
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchChangePassword),
    fork(watchcheckId),
    fork(watchChangePhone),
    fork(watchChangeAddress),
    fork(watchLoadUsersAddress),
  ]);
}
