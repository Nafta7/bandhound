import React from 'react'
import ReactDOM from 'react-dom'
import routes from './config/routes'
require('./styles/pages/index.sass')
require("font-awesome-sass-loader!../font-awesome-sass.config.js");


ReactDOM.render(
  routes,
  document.getElementById('app')
)
