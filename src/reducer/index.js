import { combineReducers } from "redux";
import products from "./products";
import login from "./login";
import productDetails from "./productDetails";
import ads from "./ads";
import register from "./register";

const rootReducer = combineReducers({
    products,
    login,
    productDetails,
    ads,
    register
});

export default rootReducer;
