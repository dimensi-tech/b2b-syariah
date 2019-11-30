import { all } from "redux-saga/effects";
import {
    getProducts,
    login
} from "./watcher";

export default function* rootSaga() {
    yield all([
        getProducts(),
        login()
    ]);
};
