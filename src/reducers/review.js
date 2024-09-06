import produce from "../util/produce";

export const initialState = {
  loadReviewLoading: false,
  loadReviewDone: false,
  loadReviewError: null,
  loadAllReviewLoading: false,
  loadAllReviewDone: false,
  loadAllReviewError: null,
  loadProductReviewLoading: false,
  loadProductReviewDone: false,
  loadProductReviewError: null,
  uploadReviewLoading: false,
  uploadReviewDone: false,
  uploadReviewError: null,
  deleteReviewLoading: false,
  deleteReviewDone: false,
  deleteReviewError: null,
  allReviews: [],
  userReviews: [],
  productReviews: [],
};

export const LOAD_REVIEW_REQUEST = "LOAD_REVIEW_REQUEST";
export const LOAD_REVIEW_SUCCESS = "LOAD_REVIEW_SUCCESS";
export const LOAD_REVIEW_FAILURE = "LOAD_REVIEW_FAILURE";

export const LOAD_ALL_REVIEW_REQUEST = "LOAD_ALL_REVIEW_REQUEST";
export const LOAD_ALL_REVIEW_SUCCESS = "LOAD_ALL_REVIEW_SUCCESS";
export const LOAD_ALL_REVIEW_FAILURE = "LOAD_ALL_REVIEW_FAILURE";

export const LOAD_PRODUCT_REVIEW_REQUEST = "LOAD_PRODUCT_REVIEW_REQUEST";
export const LOAD_PRODUCT_REVIEW_SUCCESS = "LOAD_PRODUCT_REVIEW_SUCCESS";
export const LOAD_PRODUCT_REVIEW_FAILURE = "LOAD_PRODUCT_REVIEW_FAILURE";

export const UPLOAD_REVIEW_REQUEST = "UPLOAD_REVIEW_REQUEST";
export const UPLOAD_REVIEW_SUCCESS = "UPLOAD_REVIEW_SUCCESS";
export const UPLOAD_REVIEW_FAILURE = "UPLOAD_REVIEW_FAILURE";

export const DELETE_REVIEW_REQUEST = "DELETE_REVIEW_REQUEST";
export const DELETE_REVIEW_SUCCESS = "DELETE_REVIEW_SUCCESS";
export const DELETE_REVIEW_FAILURE = "DELETE_REVIEW_FAILURE";

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_REVIEW_REQUEST:
        draft.loadReviewLoading = true;
        draft.loadReviewError = null;
        draft.loadReviewDone = false;
        break;
      case LOAD_REVIEW_SUCCESS:
        draft.loadReviewLoading = false;
        draft.loadReviewDone = true;
        draft.userReviews = draft.userReviews.concat(action.data);
        break;
      case LOAD_REVIEW_FAILURE:
        draft.loadReviewLoading = false;
        draft.loadReviewError = action.error;
        break;
      case LOAD_ALL_REVIEW_REQUEST:
        draft.loadAllReviewLoading = true;
        draft.loadAllReviewError = null;
        draft.loadAllReviewDone = false;
        break;
      case LOAD_ALL_REVIEW_SUCCESS:
        draft.loadAllReviewLoading = false;
        draft.loadAllReviewDone = true;
        draft.allReviews = draft.allReviews.concat(action.data);
        break;
      case LOAD_ALL_REVIEW_FAILURE:
        draft.loadAllReviewLoading = false;
        draft.loadAllReviewError = action.error;
        break;
      case LOAD_PRODUCT_REVIEW_REQUEST:
        draft.loadProductReviewLoading = true;
        draft.loadProductReviewError = null;
        draft.loadProductReviewDone = false;
        break;
      case LOAD_PRODUCT_REVIEW_SUCCESS:
        draft.loadProductReviewLoading = false;
        draft.loadProductReviewDone = true;
        draft.productReviews = draft.productReviews.concat(action.data);
        break;
      case LOAD_PRODUCT_REVIEW_FAILURE:
        draft.loadProductReviewLoading = false;
        draft.loadProductReviewError = action.error;
        break;
      case UPLOAD_REVIEW_REQUEST:
        draft.uploadReviewLoading = true;
        draft.uploadReviewError = null;
        draft.uploadReviewDone = false;
        break;
      case UPLOAD_REVIEW_SUCCESS:
        draft.uploadReviewLoading = false;
        draft.uploadReviewDone = true;
        break;
      case UPLOAD_REVIEW_FAILURE:
        draft.uploadReviewLoading = false;
        draft.uploadReviewError = action.error;
        break;
      case DELETE_REVIEW_REQUEST:
        draft.deleteReviewLoading = true;
        draft.deleteReviewError = null;
        draft.deleteReviewDone = false;
        break;
      case DELETE_REVIEW_SUCCESS:
        draft.deleteReviewLoading = false;
        draft.deleteReviewDone = true;
        draft.allReviews = draft.allReviews.filter(
          (item) => item.id !== action.data.id
        );
        break;
      case DELETE_REVIEW_FAILURE:
        draft.deleteReviewLoading = false;
        draft.deleteReviewError = action.error;
        break;
      default:
        return state;
    }
  });
};

export default reducer;
