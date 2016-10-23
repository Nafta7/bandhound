import React from 'react'

const Player = props =>
  <div id="player-fixed" className={props.active ? '' : "hidden" }>
    <div id="player-container">
      <div id="player">
      </div>
    </div>
  </div>

export default Player
