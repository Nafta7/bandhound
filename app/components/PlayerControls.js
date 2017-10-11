import React from 'react'
import PropTypes from 'prop-types'
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  ChevronUp,
  ChevronDown
} from 'react-feather'

const PlayerControls = props => {
  const playComponent = props.isPlaying ? (
    <Pause className="player-icon" />
  ) : (
    <Play className="player-icon" />
  )
  const chevronComponent = props.isPlayerVisible ? (
    <ChevronDown className="player-icon" />
  ) : (
    <ChevronUp className="player-icon" />
  )

  return (
    <div className="player-controls">
      <ul className="controls">
        <li>
          <button className="control" onClick={props.handlePreviousClick}>
            <SkipBack className="player-icon" />
          </button>
        </li>
        <li>
          <button className="control" onClick={props.handlePlayClick}>
            {playComponent}
          </button>
        </li>
        <li>
          <button className="control" onClick={props.handleNextClick}>
            <SkipForward className="player-icon" />
          </button>
        </li>
      </ul>
      <ul className="controls-aside">
        {props.children}
        <li>
          <button
            className="control toggle-player"
            onClick={props.handlePlayerToggle}
          >
            {chevronComponent}
          </button>
        </li>
      </ul>
    </div>
  )
}

export default PlayerControls

PlayerControls.propTypes = {
  isPlayerVisible: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  handlePlayerToggle: PropTypes.func.isRequired,
  handlePlayClick: PropTypes.func.isRequired,
  handleNextClick: PropTypes.func.isRequired,
  handlePreviousClick: PropTypes.func.isRequired
}
