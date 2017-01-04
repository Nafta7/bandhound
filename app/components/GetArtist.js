import React from 'react'
const PropTypes = React.PropTypes

const Input = props => {
  return (
    <input className={`artist-name input-control`}
      onChange={props.onUpdateArtist}
      placeholder='Type an artist you like'
      type="text"
      value={props.artist}></input>
  )
}

const Button = props => {
  return (
    <button type="button" className={props.buttonClass} >
        {props.children}
    </button>
  )
}

const GetArtistMain = props =>
  <form className="get-artist-main" onSubmit={props.onSubmitArtist}>
    <Input
      onUpdateArtist={props.onUpdateArtist}
      artist={props.artist} />
      <button type="submit" className="btn btn-main btn-fit">
        <i className="fa fa-search icon-large"></i> Search
      </button>
  </form>

const GetArtistHeader = props =>
  <form className="search" onSubmit={props.onSubmitArtist}>
    <input className={`artist-name input-control get-artist-header-input`}
      onChange={props.onUpdateArtist}
      placeholder='Type an artist you like'
      type="text"
      value={props.artist}>
    </input>
    <label>
      <button type="button">
      </button>
      <span className="search-icon">
        <i className="fa fa-search"></i>
      </span>
    </label>
  </form>


const GetArtist = props => {
  if (props.type === 'main') {
    return (
      <GetArtistMain
        artist={props.artist}
        onSubmitArtist={props.onSubmitArtist}
        onUpdateArtist={props.onUpdateArtist} />
    )
  }
  else if (props.type === 'header') {
    return (
      <GetArtistHeader
        artist={props.artist}
        onSubmitArtist={props.onSubmitArtist}
        onUpdateArtist={props.onUpdateArtist} />
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
