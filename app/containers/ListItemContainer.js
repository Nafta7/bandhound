import React from 'react'
import ListItem from '../components/ListItem'

const ListItemContainer = React.createClass({
  getInitialState: function() {
    return {
      videoId: null,
      artist: '',
      track: '',
    }
  },

  componentDidMount: function(){
    this.setState({
      videoId: this.props.videoId,
      artist: this.props.artist,
      track: this.props.track
    })
  },

  handleTrackClick: function(){
    this.props.handleItemClick(this.state.videoId, this.props.index)
  },

  render: function(){
    return(
      <ListItem active={this.props.active}
        videoId={this.state.videoId}
        artist={this.state.artist}
        track={this.state.track}
        handleTrackClick={this.handleTrackClick.bind(null, this.state)} />
    )
  }
})

export default ListItemContainer
