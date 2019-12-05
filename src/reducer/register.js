import * as actionTypes from "../helpers/constant";

let initialState = {
  success: false,
  processing: false,
  error: false,
  message: ""
};

export default function register(state = initialState, action) {
  switch (action.type) {

    case actionTypes.REGISTER_REQUEST:
    return Object.assign({}, state, {
      success: false,
      processing: true,
      error: false
    });

    case actionTypes.REGISTER_SUCCESS:
    return Object.assign({}, state, {
      success: true,
      processing: false,
      error: false,
      message: action.message
    });

    case actionTypes.REGISTER_ERROR:
    return Object.assign({}, state, {
      success: false,
      processing: false,
      error: true,
      message: action.message
    });

    case actionTypes.REGISTER_RESET:
    return Object.assign({}, state, {
      success: false,
      processing: false,
      error: false
    });

    default:
    return state;
  }
};
