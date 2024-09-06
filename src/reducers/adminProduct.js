import produce from "../util/produce";

export const initialState = {
  uploadProductLoading: false,
  uploadProductDone: false,
  uploadProductError: null,
  loadProductLoading: false,
  loadProductDone: false,
  loadProductError: null,
  deleteProductLoading: false,
  deleteProductDone: false,
  deleteProductError: null,
  products: [],
};

export const UPLOAD_PRODUCT_REQUEST = "UPLOAD_PRODUCT_REQUEST";
export const UPLOAD_PRODUCT_SUCCESS = "UPLOAD_PRODUCT_SUCCESS";
export const UPLOAD_PRODUCT_FAILURE = "UPLOAD_PRODUCT_FAILURE";

export const LOAD_PRODUCT_REQUEST = "LOAD_PRODUCT_REQUEST";
export const LOAD_PRODUCT_SUCCESS = "LOAD_PRODUCT_SUCCESS";
export const LOAD_PRODUCT_FAILURE = "LOAD_PRODUCT_FAILURE";

export const DELETE_PRODUCT_REQUEST = "DELETE_PRODUCT_REQUEST";
export const DELETE_PRODUCT_SUCCESS = "DELETE_PRODUCT_SUCCESS";
export const DELETE_PRODUCT_FAILURE = "DELETE_PRODUCT_FAILURE";

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case UPLOAD_PRODUCT_REQUEST:
        draft.uploadProductLoading = true;
        draft.uploadProductError = null;
        draft.uploadProductDone = false;
        break;
      case UPLOAD_PRODUCT_SUCCESS:
        draft.uploadProductLoading = false;
        draft.uploadProductDone = true;
        break;
      case UPLOAD_PRODUCT_FAILURE:
        draft.uploadProductLoading = false;
        draft.uploadProductError = action.error;
        break;
      case LOAD_PRODUCT_REQUEST:
        draft.loadProductLoading = true;
        draft.loadProductError = null;
        draft.loadProductDone = false;
        break;
      case LOAD_PRODUCT_SUCCESS:
        draft.loadProductLoading = false;
        draft.loadProductDone = true;
        draft.products = draft.products.concat(action.data);
        break;
      case LOAD_PRODUCT_FAILURE:
        draft.loadProductLoading = false;
        draft.loadProductError = action.error;
        break;
      case DELETE_PRODUCT_REQUEST:
        draft.deleteProductLoading = true;
        draft.deleteProductError = null;
        draft.deleteProductDone = false;
        break;
      case DELETE_PRODUCT_SUCCESS:
        draft.deleteProductLoading = false;
        draft.products = draft.products.filter(
          (item) => item.id !== action.data.id
        );
        draft.deleteProductDone = true;
        break;
      case DELETE_PRODUCT_FAILURE:
        draft.deleteProductLoading = false;
        draft.deleteProductError = action.error;
        break;
      default:
        return state;
    }
  });
};

export default reducer;
