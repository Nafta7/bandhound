import React from 'react'

const ListItem = (props) =>
  <tr className={props.active ? 'current' : ''}
    onClick={props.handleTrackClick}>
    <td>{props.track}</td>
    <td>{props.artist}</td>
  </tr>

export default ListItem
