import produce from "../util/produce";
export const initialState = {
  addBoardLoading: false,
  addBoardDone: false,
  addBoardError: null,
  loadBoardLoading: false,
  loadBoardDone: false,
  loadBoardError: null,
  deleteBoardLoading: false,
  deleteBoardDone: false,
  deleteBoardError: null,
  loadReadLoading: false,
  loadReadDone: false,
  loadReadError: null,
  checkBoardLoading: false,
  checkBoardDone: false,
  checkBoardError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  boardLists: [],
  read: [],
};

export const ADD_BOARD_REQUEST = "ADD_BOARD_REQUEST";
export const ADD_BOARD_SUCCESS = "ADD_BOARD_SUCCESS";
export const ADD_BOARD_FAILURE = "ADD_BOARD_FAILURE";

export const LOAD_BOARD_REQUEST = "LOAD_BOARD_REQUEST";
export const LOAD_BOARD_SUCCESS = "LOAD_BOARD_SUCCESS";
export const LOAD_BOARD_FAILURE = "LOAD_BOARD_FAILURE";

export const DELETE_BOARD_REQUEST = "DELETE_BOARD_REQUEST";
export const DELETE_BOARD_SUCCESS = "DELETE_BOARD_SUCCESS";
export const DELETE_BOARD_FAILURE = "DELETE_BOARD_FAILURE";

export const LOAD_READ_REQUEST = "LOAD_READ_REQUEST";
export const LOAD_READ_SUCCESS = "LOAD_READ_SUCCESS";
export const LOAD_READ_FAILURE = "LOAD_READ_FAILURE";

export const CHECK_BOARD_REQUEST = "CHECK_BOARD_REQUEST";
export const CHECK_BOARD_SUCCESS = "CHECK_BOARD_SUCCESS";
export const CHECK_BOARD_FAILURE = "CHECK_BOARD_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ADD_BOARD_REQUEST:
        draft.addBoardLoading = true;
        draft.addBoardError = null;
        draft.addBoardDone = false;
        break;
      case ADD_BOARD_SUCCESS:
        draft.addBoardLoading = false;
        draft.addBoardDone = true;
        break;
      case ADD_BOARD_FAILURE:
        draft.addBoardLoading = false;
        draft.addBoardError = action.error;
        break;
      case LOAD_BOARD_REQUEST:
        draft.loadBoardLoading = true;
        draft.loadBoardError = null;
        draft.loadBoardDone = false;
        break;
      case LOAD_BOARD_SUCCESS:
        draft.loadBoardLoading = false;
        draft.loadBoardDone = true;
        draft.boardLists = draft.boardLists.concat(action.data);
        break;
      case LOAD_BOARD_FAILURE:
        draft.loadBoardLoading = false;
        draft.loadBoardError = action.error;
        break;
      case DELETE_BOARD_REQUEST:
        draft.deleteBoardLoading = true;
        draft.deleteBoardError = null;
        draft.deleteBoardDone = false;
        break;
      case DELETE_BOARD_SUCCESS:
        draft.deleteBoardLoading = false;
        draft.deleteBoardDone = true;
        draft.boardLists = draft.boardLists.filter((v) => v.id !== action.data);
        break;
      case DELETE_BOARD_FAILURE:
        draft.deleteBoardLoading = false;
        draft.deleteBoardError = action.error;
        break;
      case LOAD_READ_REQUEST:
        draft.loadReadLoading = true;
        draft.loadReadError = null;
        draft.loadReadDone = false;
        break;
      case LOAD_READ_SUCCESS:
        draft.loadReadLoading = false;
        draft.loadReadDone = true;
        draft.read = draft.read.concat(action.data);
        break;
      case LOAD_READ_FAILURE:
        draft.loadReadLoading = false;
        draft.loadReadError = action.error;
        break;
      case CHECK_BOARD_REQUEST:
        draft.checkBoardLoading = true;
        draft.checkBoardError = null;
        draft.checkBoardDone = false;
        break;
      case CHECK_BOARD_SUCCESS:
        draft.checkBoardLoading = false;
        draft.checkBoardDone = true;
        break;
      case CHECK_BOARD_FAILURE:
        draft.checkBoardLoading = false;
        draft.checkBoardError = action.error;
        break;
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentError = null;
        draft.addCommentDone = false;
        break;
      case ADD_COMMENT_SUCCESS:
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;
      default:
        return state;
    }
  });
};

export default reducer;
