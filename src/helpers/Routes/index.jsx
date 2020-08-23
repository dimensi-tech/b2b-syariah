import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { isLoggedIn } from 'helpers/Authorization'

export const PrivateRoute = ({ component: Component, path, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (isLoggedIn) {
          return (
            <Route
              {...props}
              isLoggedIn={isLoggedIn}
              component={Component}
              path={path}
            />
          )
        } else {
          return <Redirect to="/" />
        }
      }}
    />
  )
}

export const PublicRoute = ({ component: Component, path, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return (
          <Route
            {...props}
            isLoggedIn={isLoggedIn}
            component={Component}
            path={path}
          />
        )
      }}
    />
  )
}