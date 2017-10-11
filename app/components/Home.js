import React from 'react'
import PropTypes from 'prop-types'
import GetArtistContainer from '../containers/GetArtistContainer'

const Home = props => (
  <div className="container">
    <div className="align-middle">
      <div className="home">
        <h1 className="logo">bandhound</h1>
        <h1 className="subtitle">Meet your next favorite song.</h1>
        <GetArtistContainer type="main" />
      </div>
    </div>
  </div>
)

export default Home
