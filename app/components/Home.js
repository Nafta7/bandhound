import React from 'react'
import GetArtistContainer from '../containers/GetArtistContainer'
const PropTypes = React.PropTypes

const Home = (props) =>

  <div className="home">
    <h1 className="logo">bandhound</h1>
    <h1 className="subtitle">
      Meet your next favorite song.
    </h1>
    <GetArtistContainer type="main" />
  </div>

export default Home
