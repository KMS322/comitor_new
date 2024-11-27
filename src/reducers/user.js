import produce from "../util/produce";

export const initialState = {
  loadUserLoading: false, // 유저 정보
  loadUserDone: false,
  loadUserError: null,
  logInLoading: false, // 로그인 시도중
  logInDone: false,
  logInError: null,
  logInKakaoLoading: false, // 로그인 시도중
  logInKakaoDone: false,
  logInKakaoError: null,
  logOutLoading: false, // 로그아웃 시도중
  logOutDone: false,
  logOutError: null,
  signUpLoading: false, // 회원가입 시도중
  signUpDone: false,
  signUpError: null,
  checkIdLoading: false,
  checkIdDone: false,
  checkIdError: null,
  changePasswordLoading: false,
  changePasswordDone: false,
  changePasswordError: null,
  changePhoneLoading: false,
  changePhoneDone: false,
  changePhoneError: null,
  changeAddressLoading: false,
  changeAddressDone: false,
  changeAddressError: null,
  deleteUserLoading: false,
  deleteUserDone: false,
  deleteUserError: null,
  me: null,
  signUpData: {},
  loginData: {},
  users: [],
};

export const LOAD_MY_INFO_REQUEST = "LOAD_MY_INFO_REQUEST";
export const LOAD_MY_INFO_SUCCESS = "LOAD_MY_INFO_SUCCESS";
export const LOAD_MY_INFO_FAILURE = "LOAD_MY_INFO_FAUILURE";

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAUILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAUILURE";

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAUILURE";

export const CHECK_ID_REQUEST = "CHECK_ID_REQUEST";
export const CHECK_ID_SUCCESS = "CHECK_ID_SUCCESS";
export const CHECK_ID_FAILURE = "CHECK_ID_FAUILURE";

export const CHANGE_PASSWORD_REQUEST = "CHANGE_PASSWORD_REQUEST";
export const CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS";
export const CHANGE_PASSWORD_FAILURE = "CHANGE_PASSWORD_FAUILURE";

export const CHANGE_PHONE_REQUEST = "CHANGE_PHONE_REQUEST";
export const CHANGE_PHONE_SUCCESS = "CHANGE_PHONE_SUCCESS";
export const CHANGE_PHONE_FAILURE = "CHANGE_PHONE_FAUILURE";

export const CHANGE_ADDRESS_REQUEST = "CHANGE_ADDRESS_REQUEST";
export const CHANGE_ADDRESS_SUCCESS = "CHANGE_ADDRESS_SUCCESS";
export const CHANGE_ADDRESS_FAILURE = "CHANGE_ADDRESS_FAUILURE";

export const LOAD_USERS_REQUEST = "LOAD_USERS_REQUEST";
export const LOAD_USERS_SUCCESS = "LOAD_USERS_SUCCESS";
export const LOAD_USERS_FAILURE = "LOAD_USERS_FAUILURE";

export const DELETE_USER_REQUEST = "DELETE_USER_REQUEST";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAILURE = "DELETE_USER_FAILURE";

export const loginRequestAction = (data) => {
  return {
    type: LOG_IN_REQUEST,
    data,
  };
};
export const signupRequestAction = (data) => {
  return {
    type: SIGN_UP_REQUEST,
    data,
  };
};
export const logoutRequestAction = () => {
  return {
    type: LOG_OUT_REQUEST,
  };
};

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_MY_INFO_REQUEST:
        draft.loadUserLoading = true;
        draft.loadUserError = null;
        draft.loadUserDone = false;
        break;
      case LOAD_MY_INFO_SUCCESS:
        draft.loadUserLoading = false;
        draft.me = action.data;
        draft.loadUserDone = true;
        break;
      case LOAD_MY_INFO_FAILURE:
        draft.loadUserLoading = false;
        draft.loadUserError = action.error;
        break;
      case LOG_IN_REQUEST:
        draft.logInLoading = true;
        draft.logInError = null;
        draft.logInDone = false;
        break;
      case LOG_IN_SUCCESS:
        draft.logInLoading = false;
        draft.me = action.data;
        draft.logInDone = true;
        break;
      case LOG_IN_FAILURE:
        draft.logInLoading = false;
        draft.logInError = action.error;
        break;
      case LOG_OUT_REQUEST:
        draft.logOutLoading = true;
        draft.logOutError = null;
        draft.logOutDone = false;
        break;
      case LOG_OUT_SUCCESS:
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.me = null;
        break;
      case LOG_OUT_FAILURE:
        draft.logOutLoading = false;
        draft.logOutError = action.error;
        break;
      case SIGN_UP_REQUEST:
        draft.signUpLoading = true;
        draft.signUpError = null;
        draft.signUpDone = false;
        break;
      case SIGN_UP_SUCCESS:
        draft.signUpLoading = false;
        draft.signUpDone = true;
        break;
      case SIGN_UP_FAILURE:
        draft.signUpLoading = false;
        draft.signUpError = action.error;
        break;
      case CHECK_ID_REQUEST:
        draft.checkIdLoading = true;
        draft.checkIdError = null;
        draft.checkIdDone = false;
        break;
      case CHECK_ID_SUCCESS:
        draft.checkIdLoading = false;
        draft.checkIdDone = true;
        break;
      case CHECK_ID_FAILURE:
        draft.checkIdLoading = false;
        draft.checkIdDone = false;
        draft.checkIdError = action.error;
        break;
      case CHANGE_PASSWORD_REQUEST:
        draft.changePasswordLoading = true;
        draft.changePasswordError = null;
        draft.changePasswordDone = false;
        break;
      case CHANGE_PASSWORD_SUCCESS:
        draft.changePasswordLoading = false;
        draft.changePasswordDone = true;
        break;
      case CHANGE_PASSWORD_FAILURE:
        draft.changePasswordLoading = false;
        draft.changePasswordError = action.error;
        break;
      case CHANGE_PHONE_REQUEST:
        draft.changePhoneLoading = true;
        draft.changePhoneError = null;
        draft.changePhoneDone = false;
        break;
      case CHANGE_PHONE_SUCCESS:
        draft.changePhoneLoading = false;
        draft.changePhoneDone = true;
        break;
      case CHANGE_PHONE_FAILURE:
        draft.changePhoneLoading = false;
        draft.changePhoneError = action.error;
        break;
      case CHANGE_ADDRESS_REQUEST:
        draft.changeAddressLoading = true;
        draft.changeAddressError = null;
        draft.changeAddressDone = false;
        break;
      case CHANGE_ADDRESS_SUCCESS:
        draft.changeAddressLoading = false;
        draft.changeAddressDone = true;
        break;
      case CHANGE_ADDRESS_FAILURE:
        draft.changeAddressLoading = false;
        draft.changeAddressError = action.error;
        break;
      case LOAD_USERS_REQUEST:
        draft.loadUsersLoading = true;
        draft.loadUsersError = null;
        draft.loadUsersDone = false;
        break;
      case LOAD_USERS_SUCCESS:
        draft.loadUsersLoading = false;
        draft.users = action.data;
        draft.loadUsersDone = true;
        break;
      case LOAD_USERS_FAILURE:
        draft.loadUsersLoading = false;
        draft.loadUsersError = action.error;
        break;
      case DELETE_USER_REQUEST:
        draft.deleteUserLoading = true;
        draft.deleteUserError = null;
        draft.deleteUserDone = false;
        break;
      case DELETE_USER_SUCCESS:
        draft.deleteUserLoading = false;
        draft.deleteUserDone = true;
        draft.users = draft.users.filter(
          (item) => item.user_id !== action.data.id
        );
        break;
      case DELETE_USER_FAILURE:
        draft.deleteUserLoading = false;
        draft.deleteUserError = action.error;
        break;
      default:
        return state;
    }
  });
};

export default reducer;
