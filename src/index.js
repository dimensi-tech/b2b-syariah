import React from "react";
import {render} from "react-dom";
import {Route, Switch, BrowserRouter as Router} from "react-router-dom";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import "./assets/css/main.scss";
import { store } from "./store";

import { ROUTE } from "./routeConfig";
import { PrivateRoute, PublicRoute} from "./helpers/Route";

import Header from "./components/shared/Header";

import NotFound from "./components/static/NotFound";

const setRoutes = () => {
  const route = ROUTE;
  return route.map((route, index) => {
    if (route.private) {
      return(
        <PrivateRoute
          private={route.private}
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.component}
          />
      )
    }else{
      return(
        <PublicRoute
          private={route.private}
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.component}
          />
      )
    }
  });
};

const routing = (
  <Provider store={store}>
    <Router basename="/">
      <Header />
      <Switch>
        {setRoutes()}
        <Route component={NotFound} />
        <PublicRoute exact={true} path="/" component={PublicRoute} />
      </Switch>
    </Router>
  </Provider>
)

render(routing, document.getElementById("root"))

serviceWorker.unregister()
