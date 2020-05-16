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
import Footer from "./components/shared/Footer";
import NotFound from "./components/static/NotFound";

import { I18nextProvider} from 'react-i18next';
import i18next from 'i18next';

import common_id from "./translations/id/common.json";
import common_en from "./translations/en/common.json";

const language = localStorage.getItem('language');

i18next.init({
  interpolation: { escapeValue: false },
  lng: language ? language : 'id',
  resources: {
    en: {
        common: common_en
    },
    id: {
        common: common_id
    },
  },
});

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
    } else {
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
      <Footer />
    </Router>
  </Provider>
)

render(
  <I18nextProvider i18n={i18next}>
    {routing}
  </I18nextProvider>,
  document.getElementById("root")
)

serviceWorker.unregister()
