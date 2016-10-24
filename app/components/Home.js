import React from 'react'
const PropTypes = React.PropTypes

const Home = (props) =>
  <div id="main">
    <p id="message" className="message hidden">
    </p>
    <div id="discover">
      <h1 className="main-heading">
        Meet your next favorite song.
      </h1>
      <form className="main-search" onSubmit={props.handleSubmit}>
        <input type="text" className="main-search-input"
          placeholder="Type an artist you like"
          onChange={props.handleInputChange} />
        <label>
          <button type="submit" className="main-search-submit"  />
          <span id="search_submit" className="oi main-search-icon"
            data-glyph="magnifying-glass"></span>
        </label>
      </form>
    </div>
  </div>

Home.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired
}

export default Home
