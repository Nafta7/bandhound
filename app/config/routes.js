import React from 'react'
import ReactDOM from 'react-dom'
import { Route, HashRouter } from 'react-router-dom'
import Main from '../components/Main'
import Home from '../components/Home'
import DiscoveryContainer from '../containers/DiscoveryContainer'

const routes = (
  <HashRouter>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/discovery/:artist" component={DiscoveryContainer} />
    </div>
  </HashRouter>
)

export default routes
