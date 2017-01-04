import React from 'react'
import Loading from './Loading'
import ListItem from './ListItem'
import MoreButton from './MoreButton'
import Header from './Header'

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

const Discovery = (props) => {
  if (props.isLoading) {
    return (
      <Loading main={true} />
    )
  } else {
    return (
      <div className="discovery">
        <Playlist
          artist={props.artist}
          selectedItem={props.selectedItem}
          artistsData={props.artistsData}
          handleItemClick={props.handleItemClick} />
        <MoreButton reachEnd={props.reachEnd}
          isLoading={props.isLoadingMore}
          handleLoadMoreClick={props.handleLoadMoreClick} />
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
  handleLoadMoreClick: PropTypes.func.isRequired
}

export default Discovery
