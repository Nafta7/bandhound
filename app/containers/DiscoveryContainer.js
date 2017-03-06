import React from 'react'
import YoutubePlayer from 'youtube-player'

import Discovery from '../components/Discovery'
import Main from '../components/Main'
import Player from '../components/Player'
import PlayerControls from '../components/PlayerControls'
import TrackStatus from '../components/TrackStatus'

import AppMode from '../constants/AppMode'
import Constants from '../constants/Constants'
import PlayerState from '../constants/PlayerState'

let getMixtape
const config = require('../../appconfig')

if (config.mode === AppMode.DEVELOPMENT) {
  getMixtape = require('../../test/api-fixture').getMixtape
} else {
  getMixtape = require('../helpers/api').getMixtape
}

const DiscoveryContainer = React.createClass({
  getInitialState: function(){
    return {
      isLoading: true,
      isFailure: false,
      isLoadingMore: false,
      isPlayerVisible: false,
      isPlaying: false,
      page: null,
      reachEnd: null,
      selectedItem: null,
      artistsData: [],
      player: null,
      currentTrack: null,
      errorMessage: ''
    }
  },

  componentDidMount: function(){
    this.setState({
      player: YoutubePlayer('player')
    }, () => {
      this.state.player.on('stateChange', e => {
        if (e.target.getPlayerState() === PlayerState.ENDED) {
          this.handleNextClick()


        } else if (e.target.getPlayerState() == PlayerState.PLAYING) {
          this.setState({
            isPlaying: true
          })
        } else if (e.target.getPlayerState() === PlayerState.PAUSED) {
          this.setState({
            isPlaying: false
          })
        }
      })
    })

    this.makeRequest(this.props.routeParams.artist)
  },

  componentWillReceiveProps: function(nextProps){
    this.makeRequest(nextProps.routeParams.artist)
  },

  resetState: function(state, props) {
    return {
      isLoading: true,
      isFailure: false,
      isPlaying: false,
      isPlayerVisible: false,
      selectedItem: null,
      currentTrack: null,
      reachEnd: null,
      errorMessage: ''
    }
  },

  makeRequest: function(artist){
    if (this.state.isPlaying) {
      this.state.player.stopVideo()
    }

    this.setState(this.resetState, () => {
      getMixtape(artist, 1, Constants.LIMIT)
        .then(data => {
          this.setState({
            isLoading: false,
            artistsData: data,
            page: 1
          })
        })
        .catch(err => {
          this.setState({
            isFailure: true,
            isLoading: false,
            errorMessage: err.message
          })
        })
    })


  },

  handleItemClick: function(item, index){
    this.setState({
      isPlaying: true,
      selectedItem: index,
      currentTrack: this.state.artistsData[index]
    }, () => this.loadVideoById(item.videoId))
  },

  handleLoadMoreClick: function(){
    if (this.state.reachEnd) return

    const artistQuery = this.props.routeParams.artist
    const page = this.state.page + 1

    getMixtape(artistQuery, page, Constants.LIMIT)
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
      page: page + 1
    })
  },

  handlePreviousClick: function(){
    let previousItem = this.state.selectedItem - 1

    if (this.canChangeTrack('previous')) {
      this.loadVideoById(this.state.artistsData[previousItem])
      this.setState({
        selectedItem: previousItem,
        currentTrack: this.state.artistsData[previousItem]
      })
    }
  },

  handleNextClick: function(){
    let nextItem = this.state.selectedItem + 1

    if (this.canChangeTrack('next')) {
      this.loadVideoById(this.state.artistsData[nextItem])
      this.setState({
        selectedItem: nextItem,
        currentTrack: this.state.artistsData[nextItem]
      })
    }
  },

  handlePlayClick: function(){
    if (!this.state.currentTrack) return

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


  loadVideoById: function(videoId){
    this.state.player.loadVideoById(videoId)
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


  render: function(){
    return (
      <Main>
        <Discovery
          selectedItem={this.state.selectedItem}
          isLoading={this.state.isLoading}
          isFailure={this.state.isFailure}
          errorMessage={this.state.errorMessage}
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
      </Main>
    )
  }
})

export default DiscoveryContainer
