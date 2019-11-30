import { combineReducers } from "redux";
import products from "./products";
import login from "./login";

const rootReducer = combineReducers({
    products,
    login
});

export default rootReducer;
