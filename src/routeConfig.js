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
    path: "/booking/:product_id/modify",
    exact: true,
    component: Loadable({
      loader: () => import("./components/pages/BookingModify"),
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
  },
  {
    private: false,
    path: "/booking/:product_id/:index",
    exact: true,
    component: Loadable({
      loader: () => import("./components/pages/BookingUpdateIdentity"),
      loading: () => <Preloader />
    })
  },
  {
    private: true,
    path: "/payment-success",
    exact: true,
    component: Loadable({
      loader: () => import("./components/static/PaymentSucces"),
      loading: () => <Preloader />
    })
  },
  {
    private: true,
    path: "/payment-unfinish",
    exact: true,
    component: Loadable({
      loader: () => import("./components/static/PaymentUnfinish"),
      loading: () => <Preloader />
    })
  },
  {
    private: true,
    path: "/payment-error",
    exact: true,
    component: Loadable({
      loader: () => import("./components/static/PaymentError"),
      loading: () => <Preloader />
    })
  }
];
