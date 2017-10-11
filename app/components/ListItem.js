import React from 'react'
import PropTypes from 'prop-types'

const ListItem = props => {
  const track =
    props.track.length > 50 ? props.track.substring(0, 50) + '...' : props.track

  const artist =
    props.artist.length > 30
      ? props.artist.substring(0, 30) + '...'
      : props.artist

  return (
    <tr
      className={props.active ? 'current' : ''}
      onClick={props.handleItemClick}
    >
      <td>{track}</td>
      <td>{artist}</td>
    </tr>
  )
}

ListItem.propTypes = {
  active: PropTypes.bool.isRequired,
  artist: PropTypes.string.isRequired,
  track: PropTypes.string.isRequired,
  handleItemClick: PropTypes.func.isRequired
}

export default ListItem
