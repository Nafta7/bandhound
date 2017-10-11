import React from 'react'
import PropTypes from 'prop-types'

const Loading = props => {
  let loader = props.size ? `${props.size}-loader` : 'loader'
  loader += props.main ? ' main-loader' : ''
  let container = props.main ? 'align-middle-abs' : ''

  return (
    <div className={container}>
      <div className={loader} />
    </div>
  )
}

Loading.propTypes = {
  size: PropTypes.string
}

export default Loading
