import React from 'react'
import { Link } from 'react-router-dom'
import GetArtistContainer from '../containers/GetArtistContainer'

const Header = props => (
  <div className="header">
    <h1>
      <Link to="/" className="logo-small">
        b
      </Link>
    </h1>
    <GetArtistContainer type="header" />
  </div>
)

export default Header
