import React from 'react'
import PropTypes from 'prop-types'
import Play from 'react-feather/dist/icons/play'
import Pause from 'react-feather/dist/icons/pause'
import SkipBack from 'react-feather/dist/icons/skip-back'
import SkipForward from 'react-feather/dist/icons/skip-forward'
import ChevronUp from 'react-feather/dist/icons/chevron-up'
import ChevronDown from 'react-feather/dist/icons/chevron-down'

const PlayerControls = props => {
  const playComponent = props.isPlaying ? (
    <Pause className="player-icon" />
  ) : (
    <Play className="player-icon" />
  )
  const toggleState = props.isPlayerVisible ? 'toggle-icon-reverse' : ''

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
            <ChevronUp className={`player-icon toggle-icon ${toggleState}`} />
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
