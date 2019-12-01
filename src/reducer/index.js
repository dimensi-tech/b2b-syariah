import { combineReducers } from "redux";
import products from "./products";
import login from "./login";
import productDetails from "./productDetails";

const rootReducer = combineReducers({
    products,
    login,
    productDetails
});

export default rootReducer;
