import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from '../components/Home'
import ProductList from '../components/ProductList'
import ProductDetail from '../components/ProductDetail'
import Pricing from '../components/Pricing'

export default (
  <Router>
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/product-list' exact component={ProductList} />
      <Route path='/product/:id' exact component={ProductDetail} />
      <Route path='/pricing' exact component={Pricing} />
    </Switch>
  </Router>
)
