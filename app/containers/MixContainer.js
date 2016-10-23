import React from 'react'
import Mix from '../components/Mix'
import { getMixtape } from '../helpers/api'
import YoutubePlayer from 'youtube-player'
import Player from '../components/Player'
import PlayerControls from '../components/PlayerControls'

const MixContainer = React.createClass({
  getInitialState: function(){
    return {
      isLoading: true,
      artistsData: [],
      isPlayerVisible: false,
      isPlaying: false,
      player: null,
      selectedItem: null
    }
  },

  componentDidMount: function(){
    this.setState({
      player: YoutubePlayer('player')
    })

    getMixtape(this.props.routeParams.artist)
      .then(data => {
        this.setState({
          isLoading: false,
          artistsData: data
        })
      })
  },

  handleItemLoad: function(videoId) {
    this.state.player.loadVideoById(videoId)
  },

  handleItemClick: function(videoId, index){
    this.state.player.loadVideoById(videoId)

    this.setState({
      isPlaying: true,
      selectedItem: index
    })
  },

  handlePlayClick: function(){
    console.log('handle play click!');
    this.setState({
      isPlaying: !this.state.isPlaying
    })

    if (this.state.isPlaying) {
      this.state.player.pauseVideo()
    } else {
      this.state.player.playVideo()
    }
  },

  handlePlayerToggle: function(){
    this.setState({
      isPlayerVisible: !this.state.isPlayerVisible
    })
  },

  handleNextClick: function(){
    this.setState({
      selectedItem: this.state.selectedItem + 1
    })

    // console.log(this.state.selectedItem);
  },

  playVideo: function(videoId){
    this.state.player.loadVideoById(videoId)
    this.setState({
      isPlaying: true
    })
  },

  render: function(){
    return (
      <div>
        <Mix selectedItem={this.state.selectedItem}
          artist={this.props.routeParams.artist}
          isLoading={this.state.isLoading}
          artistsData={this.state.artistsData}
          handleItemClick={this.handleItemClick} />
        <Player
          active={this.state.isPlayerVisible} />
        <PlayerControls
          isPlayerVisible={this.state.isPlayerVisible}
          handlePlayerToggle={this.handlePlayerToggle}
          isPlaying={this.state.isPlaying}
          handlePlayClick={this.handlePlayClick}
          handleNextClick={this.handleNextClick} />
      </div>
    )
  }
})

export default MixContainer
