import { all } from "redux-saga/effects";
import {
    getProducts,
    login,
    getProductDetails,
    getAds,
    register,
    booking,
    bookingDetails,
    bookingList,
    biodata
} from "./watcher";

export default function* rootSaga() {
    yield all([
        getProducts(),
        login(),
        getProductDetails(),
        getAds(),
        register(),
        booking(),
        bookingDetails(),
        bookingList(),
        biodata()
    ]);
};
