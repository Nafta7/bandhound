import React from 'react'
import ReactDOM from 'react-dom'
import routes from './config/routes'
require('./styles/pages/index.sass')

ReactDOM.render(
  routes,
  document.getElementById('app')
)
