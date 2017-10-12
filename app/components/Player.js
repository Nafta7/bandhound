import React from 'react'
import PropTypes from 'prop-types'

const Player = props => (
  <div
    id="player-fixed"
    className={props.isPlayerVisible ? 'player-visible' : ''}
  >
    <div id="player-container">
      <div id="player" />
    </div>
  </div>
)

Player.propTypes = {
  isPlayerVisible: PropTypes.bool.isRequired
}

export default Player
