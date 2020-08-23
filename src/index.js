import React from 'react'
import { render } from 'react-dom'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import NotFound from 'components/NotFound'
import { PrivateRoute, PublicRoute } from 'helpers/Routes'
import { ROUTES } from './setupRoutes'
import * as serviceWorker from './serviceWorker'

render(
  <Router basename="/">
    <Switch>
      {ROUTES.map((route, index) => {
        if (route.private) {
          return (
            <PrivateRoute
              key={index}
              private={route.private}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          )
        } else {
          return (
            <PublicRoute
              key={index}
              private={route.private}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          )
        }
      })}
      <Route component={NotFound} />
    </Switch>
  </Router>,
  document.getElementById('root')
)

serviceWorker.unregister()
