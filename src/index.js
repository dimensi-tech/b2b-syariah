import React from 'react'
import { render } from 'react-dom'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import { I18nextProvider} from 'react-i18next'
import i18next from 'i18next'
import { ROUTES } from './setupRoutes'
import * as serviceWorker from './serviceWorker'
import NotFound from 'components/NotFound'
import { PrivateRoute, PublicRoute } from 'helpers/Routes'
import { id, en } from 'services/Translations'
import 'assets/css/main.scss'

const language = localStorage.getItem('language')

i18next.init({
  interpolation: { escapeValue: false },
  lng: language || 'id',
  resources: {
    en: { common: en },
    id: { common: id },
  }
})

render(
  <I18nextProvider i18n={i18next}>
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
    </Router>
  </I18nextProvider>,
  document.getElementById('root')
)

serviceWorker.unregister()
