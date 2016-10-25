import React from 'react'
import Mix from '../components/Mix'
import { getMixtape } from '../helpers/api'
import YoutubePlayer from 'youtube-player'
import Player from '../components/Player'
import PlayerControls from '../components/PlayerControls'
import TrackStatus from '../components/TrackStatus'
import Constants from '../constants/Constants'

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
    }, () => {
      this.state.player.on('stateChange', (e) => {
        if (e.target.getPlayerState() === 0) {
          this.handleNextClick()
        }
      })
    })

    this.makeRequest(this.props.routeParams.artist)
  },

  componentWillReceiveProps: function(nextProps){
    this.makeRequest(nextProps.routeParams.artist)
  },

  makeRequest: function(artist){
    this.setState({
      isLoading: true,
      selectedItem: null,
      currentTrack: null,
      reachEnd: null
    })

    getMixtape(artist, 1, Constants.LIMIT)
      .then(data => {
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

      getMixtape(this.props.routeParams.artist, this.state.page + 1, Constants.LIMIT)
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

  hasTrackSelected: function(){
    if (this.state.selectedItem === null)
      return false
    return this.state.selectedItem >= 0
      && this.state.selectedItem < this.state.artistsData.length
      ? true
      : false
  },

  canChangeTrack: function(type){
    if (type === 'next') {
      if (this.hasTrackSelected()) {
        if (this.state.selectedItem + 1 < this.state.artistsData.length)
          return true
      }
    } else if (type === 'previous') {
      if (this.hasTrackSelected()) {
        if (this.state.selectedItem > 0)
        return true
      }
    }
    return false
  },

  handleNextClick: function(){
    if (this.canChangeTrack('next')) {
      this.state.player.loadVideoById(this.state.artistsData[this.state.selectedItem+1])
      this.setState({
        selectedItem: this.state.selectedItem + 1,
        currentTrack: this.state.artistsData[this.state.selectedItem + 1]
      })
    }
  },

  handlePreviousClick: function(){
    if (this.canChangeTrack('previous')) {
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
          handlePreviousClick={this.handlePreviousClick} >
          <TrackStatus currentTrack={this.state.currentTrack} />
        </PlayerControls>
      </div>
    )
  }
})

export default MixContainer
