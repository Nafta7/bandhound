import React from 'react'

const ListItem = (props) => {
  const track = props.track.length > 50
    ? props.track.substring(0, 50) + '...'
    : props.track

  const artist = props.artist.length > 30
    ? props.artist.substring(0, 30) + '...'
    : props.artist
    
  return (
    <tr className={props.active ? 'current' : ''}
      onClick={props.handleTrackClick}>
      <td>{track}</td>
      <td>{artist}</td>
    </tr>
  )
}

export default ListItem
