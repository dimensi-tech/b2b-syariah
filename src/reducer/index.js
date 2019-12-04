import { combineReducers } from "redux";
import products from "./products";
import login from "./login";
import productDetails from "./productDetails";
import ads from "./ads";

const rootReducer = combineReducers({
    products,
    login,
    productDetails,
    ads
});

export default rootReducer;
