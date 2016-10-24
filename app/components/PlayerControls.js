import React from 'react'
const PropTypes = React.PropTypes

const PlayerControls = props => {
  const iconToggle = props.isPlayerVisible ? 'down' : 'up'
  const iconPlay = props.isPlaying ? 'pause' : 'play'

  return (
    <div id="player-controls">
      <ul id="controls">
        <li>
          <button className="btn" onClick={props.handlePreviousClick}>
            <i className="fa fa-backward" aria-hidden="true"></i>
          </button>
        </li>
        <li>
          <button className="btn" onClick={props.handlePlayClick}>
            <i className={`fa fa-${iconPlay}`} aria-hidden="true"></i>

          </button>
        </li>
        <li>
          <button className="btn" onClick={props.handleNextClick}>
            <i className="fa fa-forward" aria-hidden="true"></i>
          </button>
        </li>
        <li>
          <button className="btn toggle-player" onClick={props.handlePlayerToggle}>
            <i className={`fa fa-chevron-${iconToggle}`} aria-hidden="true"></i>
          </button>
        </li>
        {props.children}

      </ul>
    </div>
  )
}

PlayerControls.propTypes = {
  isPlayerVisible: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  handlePlayerToggle: PropTypes.func.isRequired,
  handlePlayClick: PropTypes.func.isRequired,
  handleNextClick: PropTypes.func.isRequired,
  handlePreviousClick: PropTypes.func.isRequired
}

export default PlayerControls
