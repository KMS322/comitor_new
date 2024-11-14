import produce from "../util/produce";
export const initialState = {
  payLoading: false,
  payDone: false,
  payError: null,
  payResponse: null,
};

export const PAY_REQUEST = "PAY_REQUEST";
export const PAY_SUCCESS = "PAY_SUCCESS";
export const PAY_FAILURE = "PAY_FAILURE";

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case PAY_REQUEST:
        draft.payLoading = true;
        draft.payError = null;
        draft.payDone = false;
        break;
      case PAY_SUCCESS:
        draft.payLoading = false;
        draft.payDone = true;
        draft.payResponse = action.response;
        break;
      case PAY_FAILURE:
        draft.payLoading = false;
        draft.payError = action.error;
        break;
      default:
        return state;
    }
  });
};

export default reducer;
