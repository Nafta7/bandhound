import React from 'react'
import PropTypes from 'prop-types'
import Search from 'react-feather/dist/icons/search'

const Input = props => {
  return (
    <input
      className={`artist-name input-control`}
      onChange={props.onUpdateArtist}
      placeholder="Type an artist you like"
      type="text"
      value={props.artist}
    />
  )
}

const Button = props => {
  return (
    <button type="button" className={props.buttonClass}>
      {props.children}
    </button>
  )
}

const GetArtistMain = props => (
  <form className="get-artist-main" onSubmit={props.onSubmitArtist}>
    <Input onUpdateArtist={props.onUpdateArtist} artist={props.artist} />
    <button type="submit" className="btn btn-main">
      <Search className="search-icon search-icon-main" /> Search
    </button>
  </form>
)

const GetArtistHeader = props => (
  <form className="search-bar-top" onSubmit={props.onSubmitArtist}>
    <input
      className={`artist-name input-control get-artist-header-input`}
      onChange={props.onUpdateArtist}
      placeholder="Type an artist you like"
      type="text"
      value={props.artist}
    />
    <label>
      <button type="button" />
      <span className="search-icon-container">
        <Search className="search-icon" />
      </span>
    </label>
  </form>
)

const GetArtist = props => {
  if (props.type === 'main') {
    return (
      <GetArtistMain
        artist={props.artist}
        onSubmitArtist={props.onSubmitArtist}
        onUpdateArtist={props.onUpdateArtist}
      />
    )
  } else if (props.type === 'header') {
    return (
      <GetArtistHeader
        artist={props.artist}
        onSubmitArtist={props.onSubmitArtist}
        onUpdateArtist={props.onUpdateArtist}
      />
    )
  }
}

GetArtist.propTypes = {
  artist: PropTypes.string.isRequired,
  onSubmitArtist: PropTypes.func.isRequired,
  onUpdateArtist: PropTypes.func.isRequired
}

GetArtistHeader.propTypes = {
  artist: PropTypes.string.isRequired,
  onSubmitArtist: PropTypes.func.isRequired,
  onUpdateArtist: PropTypes.func.isRequired
}

GetArtistMain.propTypes = {
  artist: PropTypes.string.isRequired,
  onSubmitArtist: PropTypes.func.isRequired,
  onUpdateArtist: PropTypes.func.isRequired
}

export default GetArtist
