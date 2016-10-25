import React from 'react'
const PropTypes = React.PropTypes

const Input = props => {
  return (
    <input className={props.inputClass}
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
  <form onSubmit={props.onSubmitArtist}>
    <Input inputClass='main-search-input'
      onUpdateArtist={props.onUpdateArtist}
      artist={props.artist} />
    <label>
      <Button buttonClass='main-search-submit' />
      <span className="main-search-icon">
        <i className="fa fa-search"></i>
      </span>
    </label>
  </form>

const GetArtistHeader = props =>
  <form id="search" onSubmit={props.onSubmitArtist}>
    <Input
      onUpdateArtist={props.onUpdateArtist}
      artist={props.artist} />
    <label>
      <Button />
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
