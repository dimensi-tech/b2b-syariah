import { takeEvery } from "redux-saga/effects";
import * as actionTypes from "../helpers/constant";

import {
    _getProducts,
    _login,
    _getProductDetails,
    _getAds,
    _register,
    _biodata,
    _booking,
    _getBookingDetails,
    _getBookingList
} from "./worker";

export function* getProducts() { yield takeEvery(actionTypes.GET_PRODUCTS_REQUEST, _getProducts); };
export function* login() { yield takeEvery(actionTypes.LOGIN_REQUEST, _login); };
export function* getProductDetails() { yield takeEvery(actionTypes.GET_PRODUCT_DETAILS_REQUEST, _getProductDetails); };
export function* getAds() { yield takeEvery(actionTypes.GET_ADS_REQUEST, _getAds); };
export function* register() { yield takeEvery(actionTypes.REGISTER_REQUEST, _register); };
export function* biodata() { yield takeEvery(actionTypes.CREATE_BIODATA_REQUEST, _biodata); };
export function* booking() { yield takeEvery(actionTypes.CREATE_BOOKING_REQUEST, _booking); };
export function* bookingDetails() { yield takeEvery(actionTypes.GET_BOOKING_DETAILS_REQUEST, _getBookingDetails); };
export function* bookingList() { yield takeEvery(actionTypes.GET_BOOKING_LIST_REQUEST, _getBookingList); };
