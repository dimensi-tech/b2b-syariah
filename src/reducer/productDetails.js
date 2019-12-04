import * as actionTypes from "../helpers/constant";

let initialState = {
  success: false,
  processing: false,
  error: false,
  data: {}
};

export default function productDetails(state = initialState, action) {
  switch (action.type) {

    case actionTypes.GET_PRODUCT_DETAILS_REQUEST:
    return Object.assign({}, state, {
      success: false,
      processing: true,
      error: false
    });

    case actionTypes.GET_PRODUCT_DETAILS_SUCCESS:
    return Object.assign({}, state, {
      success: true,
      processing: false,
      error: false,
      data: action.data
    });

    case actionTypes.GET_PRODUCT_DETAILS_ERROR:
    return Object.assign({}, state, {
      success: false,
      processing: false,
      error: true,
    });

    case actionTypes.GET_PRODUCT_DETAILS_RESET:
    return Object.assign({}, state, {
      success: false,
      processing: false,
      error: false
    });

    default:
    return state;
  }
};
