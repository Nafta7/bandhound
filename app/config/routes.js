import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, IndexRoute, hashHistory} from 'react-router'
import Main from '../components/Main'
import Home from '../components/Home'
import DiscoveryContainer from '../containers/DiscoveryContainer'

const routes = (
  <Router history={hashHistory}>
    <Route path='/' component={Home} />
    <Route path="discovery/:artist" component={DiscoveryContainer} />
  </Router>
)

export default routes
