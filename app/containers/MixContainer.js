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
      isPlayerVisible: false,
      isPlaying: false,
      selectedItem: null,
      artistsData: [],
      player: null
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

  handleItemClick: function(item, index){
    this.state.player.loadVideoById(item.videoId)

    this.setState({
      isPlaying: true,
      selectedItem: index
    })
  },

  handlePlayClick: function(){
    if (this.state.isPlaying) {
      this.state.player.pauseVideo()
    } else {
      this.state.player.playVideo()
    }

    this.setState({
      isPlaying: !this.state.isPlaying
    })
  },

  handlePlayerToggle: function(){
    this.setState({
      isPlayerVisible: !this.state.isPlayerVisible
    })
  },

  handleNextClick: function(){
    if (this.state.selectedItem + 1 < this.state.artistsData.length) {
      this.state.player.loadVideoById(this.state.artistsData[this.state.selectedItem+1])
      this.setState({
        selectedItem: this.state.selectedItem + 1
      })
    }
  },

  handlePreviousClick: function(){
    if (this.state.selectedItem > 0) {
      this.state.player.loadVideoById(this.state.artistsData[this.state.selectedItem-1])
      this.setState({
        selectedItem: this.state.selectedItem - 1
      })
    }
  },

  render: function(){
    return (
      <div>
        <Mix
          selectedItem={this.state.selectedItem}
          isLoading={this.state.isLoading}
          artist={this.props.routeParams.artist}
          artistsData={this.state.artistsData}
          handleItemClick={this.handleItemClick} />
        <Player
          isPlayerVisible={this.state.isPlayerVisible} />
        <PlayerControls
          isPlayerVisible={this.state.isPlayerVisible}
          isPlaying={this.state.isPlaying}
          handlePlayerToggle={this.handlePlayerToggle}
          handlePlayClick={this.handlePlayClick}
          handleNextClick={this.handleNextClick}
          handlePreviousClick={this.handlePreviousClick} />
      </div>
    )
  }
})

export default MixContainer
