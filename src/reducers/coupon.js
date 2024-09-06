import produce from "../util/produce";
export const initialState = {
  addCouponLoading: false,
  addCouponDone: false,
  addCouponError: null,
  loadCouponLoading: false,
  loadCouponDone: false,
  loadCouponError: null,
  deleteCouponLoading: false,
  deleteCouponDone: false,
  deleteCouponError: null,
  acceptCouponLoading: false,
  acceptCouponDone: false,
  acceptCouponError: null,
  coupons: [],
};

export const ADD_COUPON_REQUEST = "ADD_COUPON_REQUEST";
export const ADD_COUPON_SUCCESS = "ADD_COUPON_SUCCESS";
export const ADD_COUPON_FAILURE = "ADD_COUPON_FAILURE";

export const LOAD_COUPON_REQUEST = "LOAD_COUPON_REQUEST";
export const LOAD_COUPON_SUCCESS = "LOAD_COUPON_SUCCESS";
export const LOAD_COUPON_FAILURE = "LOAD_COUPON_FAILURE";

export const DELETE_COUPON_REQUEST = "DELETE_COUPON_REQUEST";
export const DELETE_COUPON_SUCCESS = "DELETE_COUPON_SUCCESS";
export const DELETE_COUPON_FAILURE = "DELETE_COUPON_FAILURE";

export const ACCEPT_COUPON_REQUEST = "ACCEPT_COUPON_REQUEST";
export const ACCEPT_COUPON_SUCCESS = "ACCEPT_COUPON_SUCCESS";
export const ACCEPT_COUPON_FAILURE = "ACCEPT_COUPON_FAILURE";

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ADD_COUPON_REQUEST:
        draft.addCouponLoading = true;
        draft.addCouponError = null;
        draft.addCouponDone = false;
        break;
      case ADD_COUPON_SUCCESS:
        draft.addCouponLoading = false;
        draft.addCouponDone = true;
        break;
      case ADD_COUPON_FAILURE:
        draft.addCouponLoading = false;
        draft.addCouponError = action.error;
        break;
      case LOAD_COUPON_REQUEST:
        draft.loadCouponLoading = true;
        draft.loadCouponError = null;
        draft.loadCouponDone = false;
        break;
      case LOAD_COUPON_SUCCESS:
        draft.loadCouponLoading = false;
        draft.loadCouponDone = true;
        draft.coupons = draft.coupons.concat(action.data);
        break;
      case LOAD_COUPON_FAILURE:
        draft.loadCouponLoading = false;
        draft.loadCouponError = action.error;
        break;
      case DELETE_COUPON_REQUEST:
        draft.deleteCouponLoading = true;
        draft.deleteCouponError = null;
        draft.deleteCouponDone = false;
        break;
      case DELETE_COUPON_SUCCESS:
        draft.deleteCouponLoading = false;
        draft.deleteCouponDone = true;
        draft.coupons = draft.coupons.filter(
          (item) => item.id !== action.data.id
        );
        break;
      case DELETE_COUPON_FAILURE:
        draft.deleteCouponLoading = false;
        draft.deleteCouponError = action.error;
        break;
      case ACCEPT_COUPON_REQUEST:
        draft.acceptCouponLoading = true;
        draft.acceptCouponError = null;
        draft.acceptCouponDone = false;
        break;
      case ACCEPT_COUPON_SUCCESS:
        draft.acceptCouponLoading = false;
        draft.acceptCouponDone = true;
        break;
      case ACCEPT_COUPON_FAILURE:
        draft.acceptCouponLoading = false;
        draft.acceptCouponError = action.error;
        break;
      default:
        return state;
    }
  });
};

export default reducer;
