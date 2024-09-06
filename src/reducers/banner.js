import produce from "../util/produce";
export const initialState = {
  addBannerLoading: false,
  addBannerDone: false,
  addBannerError: null,
  loadBannerLoading: false,
  loadBannerDone: false,
  loadBannerError: null,
  deleteBannerLoading: false,
  deleteBannerDone: false,
  deleteBannerError: null,
  banners: [],
};

export const ADD_BANNER_REQUEST = "ADD_BANNER_REQUEST";
export const ADD_BANNER_SUCCESS = "ADD_BANNER_SUCCESS";
export const ADD_BANNER_FAILURE = "ADD_BANNER_FAILURE";

export const LOAD_BANNER_REQUEST = "LOAD_BANNER_REQUEST";
export const LOAD_BANNER_SUCCESS = "LOAD_BANNER_SUCCESS";
export const LOAD_BANNER_FAILURE = "LOAD_BANNER_FAILURE";

export const DELETE_BANNER_REQUEST = "DELETE_BANNER_REQUEST";
export const DELETE_BANNER_SUCCESS = "DELETE_BANNER_SUCCESS";
export const DELETE_BANNER_FAILURE = "DELETE_BANNER_FAILURE";

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ADD_BANNER_REQUEST:
        draft.addBannerLoading = true;
        draft.addBannerError = null;
        draft.addBannerDone = false;
        break;
      case ADD_BANNER_SUCCESS:
        draft.addBannerLoading = false;
        draft.addBannerDone = true;
        break;
      case ADD_BANNER_FAILURE:
        draft.addBannerLoading = false;
        draft.addBannerError = action.error;
        break;
      case LOAD_BANNER_REQUEST:
        draft.loadBannerLoading = true;
        draft.loadBannerError = null;
        draft.loadBannerDone = false;
        break;
      case LOAD_BANNER_SUCCESS:
        draft.loadBannerLoading = false;
        draft.loadBannerDone = true;
        draft.banners = draft.banners.concat(action.data);
        break;
      case LOAD_BANNER_FAILURE:
        draft.loadBannerLoading = false;
        draft.loadBannerError = action.error;
        break;
      case DELETE_BANNER_REQUEST:
        draft.deleteBannerLoading = true;
        draft.deleteBannerError = null;
        draft.deleteBannerDone = false;
        break;
      case DELETE_BANNER_SUCCESS:
        draft.deleteBannerLoading = false;
        draft.deleteBannerDone = true;
        draft.banners = draft.banners.filter(
          (item) => item.id !== action.data.id
        );
        break;
      case DELETE_BANNER_FAILURE:
        draft.deleteBannerLoading = false;
        draft.deleteBannerError = action.error;
        break;
      default:
        return state;
    }
  });
};

export default reducer;
