import React from 'react'
const PropTypes = React.PropTypes

const PlayerControls = props => {
  const iconToggle = props.isPlayerVisible ? 'bottom' : 'top'
  const iconPlay = props.isPlaying ? 'pause' : 'play'

  return (
    <div id="player-controls">
      <ul id="controls">
        <li>
          <button className="btn" onClick={props.handlePreviousClick}>
            <span className="oi" data-glyph="media-step-backward"></span>
          </button>
        </li>
        <li>
          <button className="btn" onClick={props.handlePlayClick}>
            <span className="oi" data-glyph={`media-${iconPlay}`}></span>
          </button>
        </li>
        <li>
          <button className="btn" onClick={props.handleNextClick}>
            <span className="oi" data-glyph="media-step-forward"></span>
          </button>
        </li>
        <li>
          <button className="btn toggle-player" onClick={props.handlePlayerToggle}>
            <span className="oi" data-glyph={`chevron-${iconToggle}`}></span>
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
