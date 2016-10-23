import React from 'react'

const PlayerControls = props => {
  const iconToggle = props.isPlayerVisible ? 'bottom' : 'top'
  const iconPlay = props.isPlaying ? 'pause' : 'play'

  return (
    <div id="player-controls">
      <ul id="controls">
        <li>
          <button className="btn">
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
        <li id="now-playing">
          <span id="track"></span><br />
          <span id="artist"></span>
        </li>
      </ul>
    </div>
  )
}

export default PlayerControls
