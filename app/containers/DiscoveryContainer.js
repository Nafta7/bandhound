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

class DiscoveryContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoading: true,
      isFailure: false,
      isLoadingMore: false,
      isPlayerVisible: false,
      isPlaying: false,
      page: null,
      reachEnd: null,
      selectedItem: null,
      artistsData: [],
      artistQuery: '',
      player: null,
      currentTrack: null,
      errorMessage: ''
    }

    this.componentDidMount = this.componentDidMount.bind(this)
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)
    this.makeRequest = this.makeRequest.bind(this)
    this.handleItemClick = this.handleItemClick.bind(this)
    this.handleLoadMoreClick = this.handleLoadMoreClick.bind(this)
    this.handlePreviousClick = this.handlePreviousClick.bind(this)
    this.handleNextClick = this.handleNextClick.bind(this)
    this.handlePlayClick = this.handlePlayClick.bind(this)
    this.handlePlayerToggle = this.handlePlayerToggle.bind(this)
    this.loadVideoById = this.loadVideoById.bind(this)
    this.hasTrackSelected = this.hasTrackSelected.bind(this)
    this.canChangeTrack = this.canChangeTrack.bind(this)
  }

  componentDidMount() {
    this.setState(
      {
        player: YoutubePlayer('player')
      },
      () => {
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
      }
    )

    const artistQuery = this.props.match.params.artist
    this.makeRequest(artistQuery)
  }

  componentWillMount() {}

  componentWillReceiveProps(nextProps) {
    const artistQuery = this.props.match.params.artist
    this.makeRequest(artistQuery)
  }

  resetState(state, props) {
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
  }

  makeRequest(artist) {
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
  }

  handleItemClick(item, index) {
    this.setState(
      {
        isPlaying: true,
        selectedItem: index,
        currentTrack: this.state.artistsData[index]
      },
      () => this.loadVideoById(item.videoId)
    )
  }

  handleLoadMoreClick() {
    if (this.state.reachEnd) return

    const artistQuery = this.props.routeParams.artist
    const page = this.state.page + 1

    getMixtape(artistQuery, page, Constants.LIMIT).then(data => {
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
  }

  handlePreviousClick() {
    let previousItem = this.state.selectedItem - 1

    if (this.canChangeTrack('previous')) {
      this.loadVideoById(this.state.artistsData[previousItem])
      this.setState({
        selectedItem: previousItem,
        currentTrack: this.state.artistsData[previousItem]
      })
    }
  }

  handleNextClick() {
    let nextItem = this.state.selectedItem + 1

    if (this.canChangeTrack('next')) {
      this.loadVideoById(this.state.artistsData[nextItem])
      this.setState({
        selectedItem: nextItem,
        currentTrack: this.state.artistsData[nextItem]
      })
    }
  }

  handlePlayClick() {
    if (!this.state.currentTrack) return

    if (this.state.isPlaying) {
      this.state.player.pauseVideo()
    } else {
      this.state.player.playVideo()
    }

    this.setState({
      isPlaying: !this.state.isPlaying
    })
  }

  handlePlayerToggle() {
    this.setState({
      isPlayerVisible: !this.state.isPlayerVisible
    })
  }

  loadVideoById(videoId) {
    this.state.player.loadVideoById(videoId)
  }

  hasTrackSelected() {
    if (this.state.selectedItem === null) return false
    return this.state.selectedItem >= 0 &&
      this.state.selectedItem < this.state.artistsData.length
      ? true
      : false
  }

  canChangeTrack(type) {
    if (type === 'next') {
      if (this.hasTrackSelected()) {
        if (this.state.selectedItem + 1 < this.state.artistsData.length)
          return true
      }
    } else if (type === 'previous') {
      if (this.hasTrackSelected()) {
        if (this.state.selectedItem > 0) return true
      }
    }
    return false
  }

  render() {
    return (
      <Main>
        <Discovery
          selectedItem={this.state.selectedItem}
          isLoading={this.state.isLoading}
          isFailure={this.state.isFailure}
          errorMessage={this.state.errorMessage}
          isLoadingMore={this.state.isLoadingMore}
          reachEnd={this.state.reachEnd}
          artist={this.props.match.params.artist}
          artistsData={this.state.artistsData}
          handleItemClick={this.handleItemClick}
          handleLoadMoreClick={this.handleLoadMoreClick}
        />
        <Player isPlayerVisible={this.state.isPlayerVisible} />
        <PlayerControls
          isPlayerVisible={this.state.isPlayerVisible}
          isPlaying={this.state.isPlaying}
          handlePlayerToggle={this.handlePlayerToggle}
          handlePlayClick={this.handlePlayClick}
          handleNextClick={this.handleNextClick}
          handlePreviousClick={this.handlePreviousClick}
        >
          <TrackStatus currentTrack={this.state.currentTrack} />
        </PlayerControls>
      </Main>
    )
  }
}

export default DiscoveryContainer
