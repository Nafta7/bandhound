import React from 'react'
const PropTypes = React.PropTypes

const Player = props =>
  <div id="player-fixed" className={props.isPlayerVisible? '' : "hidden" }>
    <div id="player-container">
      <div id="player">
      </div>
    </div>
  </div>

Player.propTypes = {
  isPlayerVisible: PropTypes.bool.isRequired
}

export default Player
