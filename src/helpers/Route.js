import React from "react";
import {Redirect, Route} from "react-router-dom";
import Authorization from "./Authorization";

const isLoggedIn = Authorization().isLoggedIn();
const auth = Authorization().getAuthUser()

export const PrivateRoute = ({ component: Component, path, ...rest }) => {
  return(
    <Route
      {...rest}
      render={props => {
        if (isLoggedIn) {
          return (
            <Route
              {...props}
              isLoggedIn={isLoggedIn}
              auth={Authorization}
              component={Component}
              path={path}
            />
          );
        } else {
          return <Redirect to={{ pathname: "/" }} />;
        }
      }}
    />
  )
};

export const PublicRoute = ({ component: Component, path: path, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return (
          <Route
            {...props}
            isLoggedIn={isLoggedIn}
            auth={Authorization}
            component={Component}
            path={path}
          />
        );
      }}
    />
  );
};
