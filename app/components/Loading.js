import React from 'react'
const PropTypes = React.PropTypes

const Loading = (props) => {
  let classy = props.size ? `${props.size}-loader` : 'loader'
  classy += props.main ? ' main-loader' : ''

  return (
    <div className={classy}>
    </div>
  )
}

Loading.propTypes = {
  size: PropTypes.string
}

export default Loading
