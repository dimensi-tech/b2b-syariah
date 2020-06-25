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
    const response = yield call(async () => {
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
    const response = yield call(async () => {
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
          message: "Email atau password salah!"
        });
      }else{
        yield put({
          type: actionTypes.LOGIN_ERROR,
          message: "Server sedang sibuk, coba beberapa saat lagi!"
        });
      }
    }else{
      yield put({
        type: actionTypes.LOGIN_ERROR,
        message: "Tidak dapat tersambung ke server!"
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
    const response = yield call(async () => {
      const res = await axios(config);
      return res;
    });
    if (response.data.email) {
      yield put({
        type: actionTypes.REGISTER_SUCCESS,
        message: "Registrasi berhasil, silahkan login untuk melanjutkan!"
      });
    }else{
      yield put({
        type: actionTypes.REGISTER_ERROR,
        message: "Email sudah digunakan!"
      });
    }
  }catch (error) {
    if (error.response) {
      yield put({
        type: actionTypes.REGISTER_ERROR,
        message: "Server sedang sibuk, coba beberapa saat lagi!"
      });
    }else{
      yield put({
        type: actionTypes.REGISTER_ERROR,
        message: "Tidak dapat tersambung ke server!"
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
    const response = yield call(async () => {
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
    const response = yield call(async () => {
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

export function* _biodata(payload) {
  let formData = new FormData();
  formData.append("biodata[name]", payload.data.name);
  formData.append("biodata[email]", payload.data.email);
  formData.append("biodata[phone]", payload.data.phone);
  formData.append("biodata[heir_name]", payload.data.heir_name);
  formData.append("biodata[heir_contact]", payload.data.heir_contact);
  formData.append("biodata[family_relation]", payload.data.family_relation);
  const config = {
    ...payload.config,
    url: BACKEND_URL + payload.path,
    data: formData
  };
  try {
    const response = yield call(async () => {
      const res = await axios(config);
      return res;
    });
    yield put({
      type: actionTypes.CREATE_BIODATA_SUCCESS,
      biodataId: response.data.id
    });
  }catch (error) {
    if (error.response) {
      if (error.response.status === 500) {
        yield put({
          type: actionTypes.CREATE_BIODATA_ERROR,
          message: "Sesi anda telah berakhir, silahkan login kembali."
        });
      }else{
        yield put({
          type: actionTypes.CREATE_BIODATA_ERROR,
          message: "Server sedang sibuk!"
        });
      }
    }else{
      yield put({
        type: actionTypes.CREATE_BIODATA_ERROR,
        message: "Tidak dapat terhubung ke server!"
      })
    }
  }
  yield put({
    type: actionTypes.CREATE_BIODATA_RESET
  });
}

export function* _booking(payload) {
  let formData = new FormData();
  formData.append("booking[package_id]", payload.data.package_id);
  formData.append("booking[person]", payload.data.person);
  formData.append("booking[departure_date]", payload.data.departure_date);
  formData.append("booking[voucher_id]", payload.data.voucher_id);
  formData.append("booking[price]", payload.data.price);
  formData.append("booking[booking_type]", payload.data.booking_type);
  formData.append("booking[saving_package_id]", payload.data.saving_package_id);
  formData.append("booking[adult]", payload.data.adult);
  formData.append("booking[child]", payload.data.child);
  const config = {
    ...payload.config,
    url: BACKEND_URL + payload.path,
    data: formData
  };
  try {
    const response = yield call(async () => {
      const res = await axios(config);
      return res;
    });
    yield put({
      type: actionTypes.CREATE_BOOKING_SUCCESS,
      bookingId: response.data.id
    });
  }catch (error) {
    if (error.response) {
      if (error.response.status === 500) {
        yield put({
          type: actionTypes.CREATE_BOOKING_ERROR,
          message: "Sesi anda telah berakhir, silahkan login kembali."
        });
      }else{
        yield put({
          type: actionTypes.CREATE_BOOKING_ERROR,
          message: "Server sedang sibuk!"
        });
      }
    }else{
      yield put({
        type: actionTypes.CREATE_BOOKING_ERROR,
        message: "Tidak dapat terhubung ke server!"
      })
    }
  }
  yield put({
    type: actionTypes.CREATE_BOOKING_RESET
  });
};

export function* _getBookingDetails(payload) {
  const config = {
    ...payload.config,
    url: BACKEND_URL + payload.path
  };
  try {
    const response = yield call(async () => {
      const res = await axios(config);
      return res;
    });
    yield put({
      type: actionTypes.GET_BOOKING_DETAILS_SUCCESS,
      data: response.data
    });
  }catch (error) {
    yield put({
      type: actionTypes.GET_BOOKING_DETAILS_ERROR
    });
  }
  yield put({
    type: actionTypes.GET_BOOKING_DETAILS_RESET
  });
};

export function* _getBookingList(payload) {
  const config = {
    ...payload.config,
    url: BACKEND_URL + payload.path
  };
  try {
    const response = yield call(async () => {
      const res = await axios(config);
      return res;
    });
    yield put({
      type: actionTypes.GET_BOOKING_LIST_SUCCESS,
      data: response.data
    });
  }catch (error) {
    yield put({
      type: actionTypes.GET_BOOKING_LIST_ERROR
    });
  }
  yield put({
    type: actionTypes.GET_BOOKING_LIST_RESET
  });
};
