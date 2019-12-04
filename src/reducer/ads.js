import * as actionTypes from "../helpers/constant";

let initialState = {
  data: [],
  success: false,
  processing: false,
  error: false
};

export default function ads(state = initialState, action) {
  switch (action.type) {

    case actionTypes.GET_ADS_REQUEST:
    return Object.assign({}, state, {
      success: false,
      processing: true,
      error: false
    });

    case actionTypes.GET_ADS_SUCCESS:
    return Object.assign({}, state, {
      success: true,
      processing: false,
      error: false,
      data: action.data
    });

    case actionTypes.GET_ADS_ERROR:
    return Object.assign({}, state, {
      success: false,
      processing: false,
      error: true,
    });

    case actionTypes.GET_ADS_RESET:
    return Object.assign({}, state, {
      success: false,
      processing: false,
      error: false
    });

    default:
    return state;
  }
};
