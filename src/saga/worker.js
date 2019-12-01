import { put, call } from "redux-saga/effects";
import * as actionTypes from "../helpers/constant";
import axios from "axios";
import Authorization from "../helpers/Authorization";

const BACKEND_URL = process.env.REACT_APP_API_V1_URL;

export function* _getProducts(payload) {
  const config = {
    ...payload.config,
    url: BACKEND_URL + payload.path
  };
  try {
    var response = yield call(async () => {
      const res = await axios(config);
      return res;
    })
    yield put({
      type: actionTypes.GET_PRODUCTS_SUCCESS,
      data: response.data
    })
  }catch (error) {
    yield put({
      type: actionTypes.GET_PRODUCTS_ERROR
    });
  }
  yield put({
    type: actionTypes.GET_PRODUCTS_RESET
  });
};

export function* _login(payload) {
  const config = {
    ...payload.config,
    url: BACKEND_URL + payload.path
  };
  try {
    var response = yield call(async () => {
      const res = await axios(config);
      return res;
    });
    yield put({
      type: actionTypes.LOGIN_SUCCESS
    });
    Authorization().login({token: response.data.jwt});
  }catch (error) {
    yield put({
      type: actionTypes.LOGIN_ERROR
    });
  }
  yield put({
    type: actionTypes.LOGIN_RESET
  });
};
