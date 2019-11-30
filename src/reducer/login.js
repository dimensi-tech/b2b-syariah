import * as actionTypes from "../helpers/constant";

let initialState = {
  success: false,
  processing: false,
  error: false
};

export default function login(state = initialState, action) {
  switch (action.type) {

    case actionTypes.LOGIN_REQUEST:
    return Object.assign({}, state, {
      success: false,
      processing: true,
      error: false
    });

    case actionTypes.LOGIN_SUCCESS:
    return Object.assign({}, state, {
      success: true,
      processing: false,
      error: false
    });

    case actionTypes.LOGIN_ERROR:
    return Object.assign({}, state, {
      success: false,
      processing: false,
      error: true,
    });

    case actionTypes.LOGIN_RESET:
    return Object.assign({}, state, {
      success: false,
      processing: false,
      error: false
    });

    default:
    return state;
  }
};
