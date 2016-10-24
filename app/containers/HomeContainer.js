import React from 'react'
import Home from '../components/Home'

const HomeContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  handleSubmit: function(e){
    e.preventDefault()
    this.context.router.push(`/mix/${this.state.artist}`)
  },

  handleInputChange: function(e){
    this.setState({
      artist: e.target.value
    })
  },

  render: function(){
    return(
      <Home handleSubmit={this.handleSubmit}
            handleInputChange={this.handleInputChange} />
    )
  }
})

export default HomeContainer
