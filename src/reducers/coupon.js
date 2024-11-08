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
  giveCouponLoading: false,
  giveCouponDone: false,
  giveCouponError: null,
  loadCouponListsLoading: false,
  loadCouponListsDone: false,
  loadCouponListsError: null,
  loadAllListsLoading: false,
  loadAllListsDone: false,
  loadAllListsError: null,
  coupons: [], // 등록된 모든 쿠폰
  couponLists: [], // user가 가지고 있는 쿠폰정보 불러오기
  allLists: [], // 발급된 쿠폰과 유저 매칭 모든 정보
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

export const GIVE_COUPON_REQUEST = "GIVE_COUPON_REQUEST";
export const GIVE_COUPON_SUCCESS = "GIVE_COUPON_SUCCESS";
export const GIVE_COUPON_FAILURE = "GIVE_COUPON_FAILURE";

export const LOAD_COUPON_LISTS_REQUEST = "LOAD_COUPON_LISTS_REQUEST";
export const LOAD_COUPON_LISTS_SUCCESS = "LOAD_COUPON_LISTS_SUCCESS";
export const LOAD_COUPON_LISTS_FAILURE = "LOAD_COUPON_LISTS_FAILURE";

export const LOAD_ALL_LISTS_REQUEST = "LOAD_ALL_LISTS_REQUEST";
export const LOAD_ALL_LISTS_SUCCESS = "LOAD_ALL_LISTS_SUCCESS";
export const LOAD_ALL_LISTS_FAILURE = "LOAD_ALL_LISTS_FAILURE";

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
      case GIVE_COUPON_REQUEST:
        draft.giveCouponLoading = true;
        draft.giveCouponError = null;
        draft.giveCouponDone = false;
        break;
      case GIVE_COUPON_SUCCESS:
        draft.giveCouponLoading = false;
        draft.giveCouponDone = true;
        break;
      case GIVE_COUPON_FAILURE:
        draft.giveCouponLoading = false;
        draft.giveCouponError = action.error;
        break;
      case LOAD_COUPON_LISTS_REQUEST:
        draft.loadCouponListsLoading = true;
        draft.loadCouponListsError = null;
        draft.loadCouponListsDone = false;
        break;
      case LOAD_COUPON_LISTS_SUCCESS:
        draft.loadCouponListsLoading = false;
        draft.couponLists = draft.couponLists.concat(action.data);
        draft.loadCouponListsDone = true;
        break;
      case LOAD_COUPON_LISTS_FAILURE:
        draft.loadCouponListsLoading = false;
        draft.loadCouponListsError = action.error;
        break;
      case LOAD_ALL_LISTS_REQUEST:
        draft.loadAllListsLoading = true;
        draft.loadAllListsError = null;
        draft.loadAllListsDone = false;
        break;
      case LOAD_ALL_LISTS_SUCCESS:
        draft.loadAllListsLoading = false;
        draft.loadAllListsDone = true;
        draft.allLists = draft.allLists.concat(action.data);
        break;
      case LOAD_ALL_LISTS_FAILURE:
        draft.loadAllListsLoading = false;
        draft.loadAllListsError = action.error;
        break;
      default:
        return state;
    }
  });
};

export default reducer;
