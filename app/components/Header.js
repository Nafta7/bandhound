import React from 'react'
import {Link} from 'react-router'

const Header = (props) =>
  <div className="header">
    <div className="container">
      <div id="logo">
        <Link to="/">bandhound</Link>
      </div>
      <form id="search">
        <input type="text" placeholder="Search artist" />
        <i className="fa fa-search search-icon" ></i>
      </form>
    </div>
  </div>

export default Header
