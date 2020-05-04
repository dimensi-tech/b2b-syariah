import { combineReducers } from "redux";
import products from "./products";
import login from "./login";
import productDetails from "./productDetails";
import ads from "./ads";
import register from "./register";
import biodata from "./biodata";
import booking from "./booking";
import bookingDetails from "./bookingDetails";
import bookingList from "./bookingList";

const rootReducer = combineReducers({
    products,
    login,
    productDetails,
    ads,
    register,
    biodata,
    booking,
    bookingDetails,
    bookingList
});

export default rootReducer;
