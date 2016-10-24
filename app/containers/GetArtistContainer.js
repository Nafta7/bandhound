import React from 'react'
import GetArtist from '../components/GetArtist'
const PropTypes = React.PropTypes

const GetArtistContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getDefaultProps: function(){
    return {
      type: 'header'
    }
  },

  propTypes: {
    type: PropTypes.string
  },

  getInitialState: function(){
    return {
      artist: ''
    }
  },

  handleSubmitArtist: function(e){
    e.preventDefault()
    this.context.router.push(`/mix/${this.state.artist}`)
  },

  handleUpdateArtist: function(e){
    this.setState({
      artist: e.target.value
    })
  },

  render: function(){
    return (
      <GetArtist type={this.props.type}
        onSubmitArtist={this.handleSubmitArtist}
        onUpdateArtist={this.handleUpdateArtist}
        artist={this.state.artist} />
    )
  }
})

export default GetArtistContainer
