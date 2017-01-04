import React from 'react'
const PropTypes = React.PropTypes

const Loading = (props) => {
  let loader = props.size ? `${props.size}-loader` : 'loader'
  loader += props.main ? ' main-loader' : ''
  let container = props.main ? 'align-middle-abs' : ''

  return (
    <div className={container}>
      <div className={loader}>
      </div>
    </div>
  )
}

Loading.propTypes = {
  size: PropTypes.string
}

export default Loading
