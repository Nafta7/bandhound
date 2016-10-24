import React from 'react'
import {Link} from 'react-router'
import GetArtistContainer from '../containers/GetArtistContainer'

const Header = (props) =>
  <div className="header">
    <div className="container">
      <div id="logo">
        <Link to="/">bandhound</Link>
      </div>
      <GetArtistContainer type="header" />
    </div>
  </div>

export default Header
