import React from 'react'

const TrackStatus = props => {
  let track = props.currentTrack ? props.currentTrack.track : ''
  track = track.length > 30 ? track.substring(0, 30) + '...' : track
  let artist = props.currentTrack ? props.currentTrack.artist : ''
  artist = artist.length > 30 ? artist.substring(0, 30) + '...' : artist
  return (
    <li className="now-playing">
      <span className="playing-track">{track}</span>
      <br />
      <span className="playing-artist">{artist}</span>
    </li>
  )
}

export default TrackStatus
