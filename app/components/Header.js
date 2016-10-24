import React from 'react'

const Header = (props) =>
  <div className="header">
    <div className="container">
      <div id="logo">
        <a href="/">bandhound</a>
      </div>
      <form id="search">
        <input type="text" placeholder="Search artist" />
        <span
          id="search_submit"
          className="oi search-icon"
          data-glyph="magnifying-glass">
        </span>
      </form>
    </div>
  </div>

export default Header
