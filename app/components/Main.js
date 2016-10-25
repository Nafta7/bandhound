import React from 'react'
import Header from './Header'

const Main = props =>
  <div>
    <Header />
    <div className="container">
      <div id="content-main">
        {props.children}
      </div>
    </div>
  </div>

export default Main
