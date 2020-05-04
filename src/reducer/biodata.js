import * as actionTypes from "../helpers/constant";

let initialState = {
  success: false,
  processing: false,
  error: false,
  message: "",
  biodataId: null
};

export default function biodata(state = initialState, action) {
  switch (action.type) {

    case actionTypes.CREATE_BIODATA_REQUEST:
    return Object.assign({}, state, {
      success: false,
      processing: true,
      error: false
    });

    case actionTypes.CREATE_BIODATA_SUCCESS:
    return Object.assign({}, state, {
      success: true,
      processing: false,
      error: false,
      biodataId: action.biodataId
    });

    case actionTypes.CREATE_BIODATA_ERROR:
    return Object.assign({}, state, {
      success: false,
      processing: false,
      error: true,
      message: action.message
    });

    case actionTypes.CREATE_BIODATA_RESET:
    return Object.assign({}, state, {
      success: false,
      processing: false,
      error: false,
      biodataId: null
    });

    default:
    return state;
  }
};
