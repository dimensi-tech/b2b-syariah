import React, {Fragment} from 'react'
import {render} from 'react-dom'
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom'
import * as serviceWorker from './serviceWorker'
import './assets/css/main.scss'

import Home from './components/pages/Home'
import Products from './components/pages/Products'

import Header from './components/shared/Header'

import NotFound from './components/static/NotFound'

const routing = (
  <Router>
    <Fragment>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/products" component={Products} />
        <Route component={NotFound} />
      </Switch>
    </Fragment>
  </Router>
)

render(routing, document.getElementById('root'))

serviceWorker.unregister()
