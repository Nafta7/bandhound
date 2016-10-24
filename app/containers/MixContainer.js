import React from 'react'
import Mix from '../components/Mix'
import { getMixtape } from '../helpers/api'
import YoutubePlayer from 'youtube-player'
import Player from '../components/Player'
import PlayerControls from '../components/PlayerControls'
import TrackStatus from '../components/TrackStatus'

const limit = 2

const MixContainer = React.createClass({
  getInitialState: function(){
    return {
      isLoading: true,
      isLoadingMore: false,
      isPlayerVisible: false,
      isPlaying: false,
      page: null,
      reachEnd: null,
      selectedItem: null,
      artistsData: [],
      player: null,
      currentTrack: null
    }
  },

  componentDidMount: function(){
    this.setState({
      player: YoutubePlayer('player')
    })

    this.makeRequest(this.props.routeParams.artist)
  },

  componentWillReceiveProps: function(nextProps){
    this.setState({
      isLoading: true
    })
    this.makeRequest(nextProps.routeParams.artist)
  },

  makeRequest: function(artist){
    getMixtape(this.props.routeParams.artist, 1 , limit)
      .then(data => {
        this.state.player.on('stateChange', (e) => {
          if (e.target.getPlayerState() === 0) {
            this.handleNextClick()
          }
        })
        this.setState({
          isLoading: false,
          artistsData: data,
          page: 1
        })
      })
  },

  handleItemClick: function(item, index){
    this.state.player.loadVideoById(item.videoId)

    this.setState({
      isPlaying: true,
      selectedItem: index,
      currentTrack: this.state.artistsData[index]
    })
  },

  handleLoadMoreClick: function(){
    if (!this.state.reachEnd) {

      getMixtape(this.props.routeParams.artist, this.state.page + 1, limit)
        .then(data => {
          if (data.length > 0) {
            this.setState({
              isLoadingMore: false,
              artistsData: this.state.artistsData.concat(data)
            })
          } else {
            this.setState({
              reachEnd: true,
              isLoadingMore: false
            })
          }
        })

      this.setState({
        isLoadingMore: true,
        page: this.state.page + 1
      })
    }
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
        selectedItem: this.state.selectedItem + 1,
        currentTrack: this.state.artistsData[this.state.selectedItem + 1]
      })
    }
  },

  handlePreviousClick: function(){
    if (this.state.selectedItem > 0) {
      this.state.player.loadVideoById(this.state.artistsData[this.state.selectedItem-1])
      this.setState({
        selectedItem: this.state.selectedItem - 1,
        currentTrack: this.state.artistsData[this.state.selectedItem - 1]
      })
    }
  },

  render: function(){
    return (
      <div>
        <Mix
          selectedItem={this.state.selectedItem}
          isLoading={this.state.isLoading}
          isLoadingMore={this.state.isLoadingMore}
          reachEnd={this.state.reachEnd}
          artist={this.props.routeParams.artist}
          artistsData={this.state.artistsData}
          handleItemClick={this.handleItemClick}
          handleLoadMoreClick={this.handleLoadMoreClick} />
        <Player
          isPlayerVisible={this.state.isPlayerVisible} />
        <PlayerControls
          isPlayerVisible={this.state.isPlayerVisible}
          isPlaying={this.state.isPlaying}
          handlePlayerToggle={this.handlePlayerToggle}
          handlePlayClick={this.handlePlayClick}
          handleNextClick={this.handleNextClick}
          handlePreviousClick={this.handlePreviousClick}
          currentTrack={this.state.currentTrack}>
          <TrackStatus currentTrack={this.state.currentTrack} />
        </PlayerControls>
      </div>
    )
  }
})

export default MixContainer
