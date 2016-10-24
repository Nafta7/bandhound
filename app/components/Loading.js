import React from 'react'
const PropTypes = React.PropTypes

const Loading = (props) =>
  <div id="main-loader"
       className={props.size ? `${props.size}-loader` : 'loader'}>
  </div>

Loading.propTypes = {
  size: PropTypes.string
}

export default Loading
