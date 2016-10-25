import React from 'react'
import GetArtistContainer from '../containers/GetArtistContainer'
const PropTypes = React.PropTypes

const Home = (props) =>
  <div id="main">
    <p id="message" className="message hidden">
    </p>
    <div id="discover">
      <h1 className="main-heading">
        Meet your next favorite song.
      </h1>
      <GetArtistContainer type="main" />
    </div>
  </div>

export default Home
