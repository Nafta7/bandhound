import React from 'react'
import Loading from './Loading'
import ListItem from './ListItem'
import MoreButton from './MoreButton'
import Header from './Header'
import Failure from './Failure'

const PropTypes = React.PropTypes

const Playlist = (props) =>
  <div className="playlist">
    <h2 className="artist-query">
      Mixtape of {props.artist}
    </h2>
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
            <ListItem
              key={i}
              active={isSelected}
              artist={item.artist}
              track={item.track}
              handleItemClick={props.handleItemClick.bind(null, item, i)} />
          )
        })}
      </tbody>
    </table>
  </div>

Playlist.propTypes = {
  selectedItem: PropTypes.number,
  artist: PropTypes.string.isRequired,
  artistsData: PropTypes.array.isRequired,
  handleItemClick: PropTypes.func.isRequired
}

const Discovery = ({ isFailure, isLoading, isLoadingMore, reachEnd, errorMessage,
  handleItemClick, handleLoadMoreClick, artist, artistsData, selectedItem
}) => {
  if (isFailure) {
    return (
      <Failure message={errorMessage} />
    )
  }

  if (isLoading) {
    return (
      <Loading main={true} />
    )
  } else {
    return (
      <div className="discovery">
        <Playlist
          artist={artist}
          selectedItem={selectedItem}
          artistsData={artistsData}
          handleItemClick={handleItemClick} />
        <MoreButton reachEnd={reachEnd}
          isLoading={isLoadingMore}
          handleLoadMoreClick={handleLoadMoreClick} />
      </div>
    )
  }
}

Discovery.propTypes = {
  artist: PropTypes.string.isRequired,
  selectedItem: PropTypes.number,
  isLoading: PropTypes.bool.isRequired,
  artistsData: PropTypes.array.isRequired,
  handleItemClick: PropTypes.func.isRequired,
  handleLoadMoreClick: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
}

export default Discovery
