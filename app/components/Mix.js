import React from 'react'
import Loading from './Loading'
import Player from './Player'
import PlayerControls from './PlayerControls'
import PlayerContainer from '../containers/PlayerContainer'
import ListItemContainer from '../containers/ListItemContainer'

const Playlist = (props) =>
  <div id="mix">
    <h2>
      Mixtape of {props.artist}
    </h2>
    <div id="playlist">
      <table className="table-playlist">
        <thead>
          <tr>
            <th id="track-head">Track</th>
            <th id="artist-head">Artist</th>
          </tr>
        </thead>
        <tbody>
          {props.artistsData.map((item, i) => {
            const isSelected = props.selectedItem === i
            return (
              <ListItemContainer key={i}
                videoId={item.videoId}
                artist={item.artist}
                track={item.track}
                handleItemClick={props.handleItemClick}
                index={i}
                active={isSelected} />
            )
          })}
        </tbody>
      </table>
    </div>
  </div>

const Mix = (props) => {
  if (props.isLoading) {
    return (
      <Loading />
    )
  } else {
    return (
      <div>
        <Playlist artist={props.artist} selectedItem={props.selectedItem}
          artistsData={props.artistsData}
          handleTrackClick={props.handleTrackClick}
          handleItemClick={props.handleItemClick} />
      </div>
    )
  }
}

export default Mix
