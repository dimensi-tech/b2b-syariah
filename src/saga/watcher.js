import { takeEvery } from "redux-saga/effects";
import * as actionTypes from "../helpers/constant";

import {
    _getProducts,
    _login,
    _getProductDetails
} from "./worker";

export function* getProducts() { yield takeEvery(actionTypes.GET_PRODUCTS_REQUEST, _getProducts); };
export function* login() { yield takeEvery(actionTypes.LOGIN_REQUEST, _login); };
export function* getProductDetails() { yield takeEvery(actionTypes.GET_PRODUCT_DETAILS_REQUEST, _getProductDetails); };
