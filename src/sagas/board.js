import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import {
  ADD_BOARD_REQUEST,
  ADD_BOARD_SUCCESS,
  ADD_BOARD_FAILURE,
  LOAD_BOARD_REQUEST,
  LOAD_BOARD_SUCCESS,
  LOAD_BOARD_FAILURE,
  DELETE_BOARD_REQUEST,
  DELETE_BOARD_SUCCESS,
  DELETE_BOARD_FAILURE,
  LOAD_READ_REQUEST,
  LOAD_READ_SUCCESS,
  LOAD_READ_FAILURE,
  CHECK_BOARD_REQUEST,
  CHECK_BOARD_SUCCESS,
  CHECK_BOARD_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
} from "../reducers/board";

function addBoardAPI(data) {
  return axios.post("/board/add", data);
}

function* addBoard(action) {
  try {
    const result = yield call(addBoardAPI, action.data);
    yield put({
      type: ADD_BOARD_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_BOARD_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchAddBoard() {
  yield takeLatest(ADD_BOARD_REQUEST, addBoard);
}

function loadBoardAPI() {
  return axios.post("/board/load");
}

function* loadBoard(action) {
  try {
    const result = yield call(loadBoardAPI);
    yield put({
      type: LOAD_BOARD_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_BOARD_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadBoard() {
  yield takeLatest(LOAD_BOARD_REQUEST, loadBoard);
}

function deleteBoardAPI(data) {
  return axios.post("/board/delete", data);
}

function* deleteBoard(action) {
  try {
    const result = yield call(deleteBoardAPI, action.data);
    yield put({
      type: DELETE_BOARD_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: DELETE_BOARD_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchDeleteBoard() {
  yield takeLatest(DELETE_BOARD_REQUEST, deleteBoard);
}

function loadReadAPI(data) {
  return axios.post("/board/read", data);
}

function* loadRead(action) {
  try {
    const result = yield call(loadReadAPI, action.data);
    yield put({
      type: LOAD_READ_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_READ_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadRead() {
  yield takeLatest(LOAD_READ_REQUEST, loadRead);
}

function checkBoardAPI(data) {
  return axios.post("/board/check", data);
}

function* checkBoard(action) {
  try {
    const result = yield call(checkBoardAPI, action.data);
    yield put({
      type: CHECK_BOARD_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CHECK_BOARD_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchCheckBoard() {
  yield takeLatest(CHECK_BOARD_REQUEST, checkBoard);
}

function addCommentAPI(data) {
  return axios.post("/board/addComment", data);
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* boardSaga() {
  yield all([
    fork(watchAddBoard),
    fork(watchLoadBoard),
    fork(watchDeleteBoard),
    fork(watchLoadRead),
    fork(watchCheckBoard),
    fork(watchAddComment),
  ]);
}
