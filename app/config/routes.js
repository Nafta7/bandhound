import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, IndexRoute, hashHistory} from 'react-router'
import Main from '../containers/Main'
import Home from '../components/Home'
import MixContainer from '../containers/MixContainer'

const routes = (
  <Router history={hashHistory}>
    <Route path='/' component={Main}>
      <IndexRoute component={Home} />
      <Route path="mix/:artist" component={MixContainer} />
    </Route>
  </Router>
)

export default routes
