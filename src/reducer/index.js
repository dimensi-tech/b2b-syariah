import { combineReducers } from "redux";
import products from "./products";
import login from "./login";
import productDetails from "./productDetails";
import ads from "./ads";
import register from "./register";
import booking from "./booking";

const rootReducer = combineReducers({
    products,
    login,
    productDetails,
    ads,
    register,
    booking
});

export default rootReducer;
