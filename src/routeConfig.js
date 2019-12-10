import React from "react";
import Loadable from "react-loadable";
import Preloader from "./components/static/Preloader";

export const ROUTE = [
  {
    private: false,
    path: "/",
    exact: true,
    component: Loadable({
      loader: () => import("./components/pages/Home"),
      loading: () => <Preloader />
    })
  },
  {
    private: false,
    path: "/products",
    exact: true,
    component: Loadable({
      loader: () => import("./components/pages/Products"),
      loading: () => <Preloader />
    })
  },
  {
    private: false,
    path: "/product/:product_id",
    exact: true,
    component: Loadable({
      loader: () => import("./components/pages/ProductDetails"),
      loading: () => <Preloader />
    })
  },
  {
    private: true,
    path: "/booking/:product_id",
    exact: true,
    component: Loadable({
      loader: () => import("./components/pages/BookingDetails"),
      loading: () => <Preloader />
    })
  },
  {
    private: true,
    path: "/booking-list",
    exact: true,
    component: Loadable({
      loader: () => import("./components/pages/BookingList"),
      loading: () => <Preloader />
    })
  }
];
