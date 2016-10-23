import React from 'react'
import Header from '../components/Header'
import Home from '../components/Home'

const Main = React.createClass({
  render: function(){
    return (
      <div>
        <Header />
        <div className="container">
          <div id="content-main">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
})

export default Main
