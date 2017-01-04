import React from 'react'
import Header from './Header'

const Main = props =>
  <div className="main">
    <Header />
    {props.children}
  </div>

export default Main
