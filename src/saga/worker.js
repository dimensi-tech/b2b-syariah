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
    if (error.response) {
      if (error.response.status === 404) {
        yield put({
          type: actionTypes.LOGIN_ERROR,
          message: "User not found or password incorrect!"
        });
      }else{
        yield put({
          type: actionTypes.LOGIN_ERROR,
          message: "Server busy!"
        });
      }
    }else{
      yield put({
        type: actionTypes.LOGIN_ERROR,
        message: "Unable connect to server!"
      })
    }
  }
  yield put({
    type: actionTypes.LOGIN_RESET
  });
};

export function* _register(payload) {
  const config = {
    ...payload.config,
    url: BACKEND_URL + payload.path
  };
  try {
    var response = yield call(async () => {
      const res = await axios(config);
      return res;
    });
    if (response.data.email) {
      yield put({
        type: actionTypes.REGISTER_SUCCESS,
        message: "Register success, please login to continue!"
      });
    }else{
      yield put({
        type: actionTypes.REGISTER_ERROR,
        message: "Email already registered!"
      });
    }
  }catch (error) {
    if (error.response) {
      yield put({
        type: actionTypes.REGISTER_ERROR,
        message: "Server busy!"
      });
    }else{
      yield put({
        type: actionTypes.REGISTER_ERROR,
        message: "Unable connect to server!"
      });
    }
  }
  yield put({
    type: actionTypes.REGISTER_RESET
  });
};

export function* _getProductDetails(payload) {
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
      type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS,
      data: response.data
    });
  }catch (error) {
    yield put({
      type: actionTypes.GET_PRODUCT_DETAILS_ERROR
    });
  }
  yield put({
    type: actionTypes.GET_PRODUCT_DETAILS_RESET
  });
};

export function* _getAds(payload) {
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
      type: actionTypes.GET_ADS_SUCCESS,
      data: response.data
    });
  }catch (error) {
    yield put({
      type: actionTypes.GET_ADS_ERROR
    });
  }
  yield put({
    type: actionTypes.GET_ADS_RESET
  });
};
