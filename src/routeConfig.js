import React from "react";
import Loadable from "react-loadable";

export const ROUTE = [
  {
    private: false,
    path: "/",
    exact: true,
    component: Loadable({
      loader: () => import("./components/pages/Home"),
      loading: () => <div>Loading..</div>
    })
  },
  {
    private: false,
    path: "/products",
    exact: true,
    component: Loadable({
      loader: () => import("./components/pages/Products"),
      loading: () => <div>Loading..</div>
    })
  }
];
