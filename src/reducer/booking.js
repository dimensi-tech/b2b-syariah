import * as actionTypes from "../helpers/constant";

let initialState = {
  success: false,
  processing: false,
  error: false,
  message: "",
  bookingId: null
};

export default function booking(state = initialState, action) {
  switch (action.type) {

    case actionTypes.CREATE_BOOKING_REQUEST:
    return Object.assign({}, state, {
      success: false,
      processing: true,
      error: false
    });

    case actionTypes.CREATE_BOOKING_SUCCESS:
    return Object.assign({}, state, {
      success: true,
      processing: false,
      error: false,
      bookingId: action.bookingId
    });

    case actionTypes.CREATE_BOOKING_ERROR:
    return Object.assign({}, state, {
      success: false,
      processing: false,
      error: true,
      message: action.message
    });

    case actionTypes.CREATE_BOOKING_RESET:
    return Object.assign({}, state, {
      success: false,
      processing: false,
      error: false,
      bookingId: null
    });

    default:
    return state;
  }
};
